/**
 * Interactive Three.js procedural iPhone 16–style 3D mockup scene.
 * Dynamically imports Three.js on the client so static prerendering stays SSR-safe
 * and Three.js is cleanly code-split into its own chunk.
 */

/**
 * @typedef {{
 *   container: HTMLElement,
 *   src?: string,
 *   reducedMotion?: boolean,
 *   onInteract?: () => void,
 *   onReady?: () => void,
 * }} PhoneSceneOptions
 */

/**
 * @param {PhoneSceneOptions} options
 * @returns {Promise<{ resetView: () => void, nudge: (dAzimuth: number, dPolar: number) => void, dispose: () => void }>}
 */
export async function createPhoneScene({
  container,
  src,
  reducedMotion = false,
  onInteract,
  onReady,
}) {
  const [THREE, { OrbitControls }, { RoomEnvironment }] = await Promise.all([
    import('three'),
    import('three/examples/jsm/controls/OrbitControls.js'),
    import('three/examples/jsm/environments/RoomEnvironment.js'),
  ]);

  /**
   * Creates a centered rounded-rectangle THREE.Shape.
   * @param {number} w
   * @param {number} h
   * @param {number} r
   */
  function createRoundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    const rad = Math.min(r, w / 2, h / 2);

    shape.moveTo(x + rad, y);
    shape.lineTo(x + w - rad, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + rad);
    shape.lineTo(x + w, y + h - rad);
    shape.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    shape.lineTo(x + rad, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - rad);
    shape.lineTo(x, y + rad);
    shape.quadraticCurveTo(x, y, x + rad, y);
    return shape;
  }

  /**
   * Creates a rounded-rectangle ShapeGeometry with normalized [0..1] UVs.
   * @param {number} w
   * @param {number} h
   * @param {number} r
   */
  function createRoundedPlaneGeometry(w, h, r) {
    const geom = new THREE.ShapeGeometry(createRoundedRectShape(w, h, r), 24);
    const pos = geom.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uvs[i * 2] = (pos.getX(i) + w / 2) / w;
      uvs[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
    }
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    return geom;
  }

  /**
   * Creates a soft radial ground contact shadow texture.
   */
  function createShadowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 120);
      grad.addColorStop(0, 'rgba(9, 10, 14, 0.36)');
      grad.addColorStop(0.45, 'rgba(9, 10, 14, 0.16)');
      grad.addColorStop(1, 'rgba(9, 10, 14, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  /**
   * Loads the app UI image/SVG into a high-DPI CanvasTexture for razor-sharp rendering.
   * @param {string | undefined} imageSrc
   * @param {number} maxAnisotropy
   */
  function createScreenTexture(imageSrc, maxAnisotropy) {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 1664;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#090b10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, maxAnisotropy || 4);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    if (imageSrc && ctx) {
      const img = new Image();
      img.decoding = 'async';
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.fillStyle = '#090b10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        texture.needsUpdate = true;
        renderNow();
      };
      img.src = imageSrc;
    }

    return texture;
  }

  // ---- Renderer, Scene & Studio Reflections ----
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.className = 'phone-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const initialWidth = Math.max(1, container.clientWidth || 320);
  const initialHeight = Math.max(1, container.clientHeight || 400);
  renderer.setSize(initialWidth, initialHeight, false);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new RoomEnvironment();
  const envTarget = pmrem.fromScene(envScene, 0.04);
  scene.environment = envTarget.texture;
  envScene.dispose();

  const camera = new THREE.PerspectiveCamera(34, initialWidth / initialHeight, 0.1, 40);
  const defaultCameraPos = new THREE.Vector3(-1.32, 0.34, 6.45);
  const originTarget = new THREE.Vector3(0, 0, 0);
  camera.position.copy(defaultCameraPos);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.rotateSpeed = 0.85;
  controls.minPolarAngle = 0.22;
  controls.maxPolarAngle = Math.PI - 0.22;
  controls.target.set(0, 0, 0);
  controls.update();

  // ---- Studio Lighting + Subtle Blueprint Cobalt Rim Light ----
  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
  keyLight.position.set(3.6, 4.8, 5.4);
  const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.65);
  fillLight.position.set(-4.2, 1.4, 3.2);
  const rimLight = new THREE.DirectionalLight(0x5b86ff, 1.0);
  rimLight.position.set(1.2, -2.4, -4.6);
  scene.add(ambient, keyLight, fillLight, rimLight);

  // ---- Procedural iPhone 16 Pro / 16 3D Model ----
  const phoneRoot = new THREE.Group();
  scene.add(phoneRoot);

  /** @type {Array<{ dispose: () => void }>} */
  const disposables = [];
  /**
   * @template {{ dispose: () => void }} T
   * @param {T} item
   * @returns {T}
   */
  const track = (item) => {
    disposables.push(item);
    return item;
  };

  // Proportions matching 19.5:9 screen + slim bezels
  const W = 1.54;
  const H = 3.22;
  const D = 0.145;
  const R = 0.235;
  const BEVEL = 0.02;
  const HALF_Z = D / 2 + BEVEL;

  const SW = 1.42;
  const SH = 3.077;
  const SR = 0.175;

  // Shared materials
  const titaniumMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x2b2f38,
      metalness: 0.9,
      roughness: 0.26,
      clearcoat: 0.35,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1.35,
    })
  );

  const buttonMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x3a3f4a,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.4,
      envMapIntensity: 1.4,
    })
  );

  const bezelGlassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x050609,
      metalness: 0.08,
      roughness: 0.07,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.1,
    })
  );

  const backGlassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x171a22,
      metalness: 0.28,
      roughness: 0.42,
      clearcoat: 0.28,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.9,
    })
  );

  const islandGlassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x202530,
      metalness: 0.45,
      roughness: 0.14,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.2,
    })
  );

  const darkRecessMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x040507,
      metalness: 0.2,
      roughness: 0.7,
    })
  );

  const lensRingMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x232730,
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.5,
      envMapIntensity: 1.5,
    })
  );

  const lensOpticMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x0b1630,
      metalness: 0.25,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.8,
    })
  );

  // 1. Extruded Dark Titanium Body
  const bodyGeom = track(
    new THREE.ExtrudeGeometry(createRoundedRectShape(W, H, R), {
      depth: D,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: 0.018,
      bevelSegments: 6,
      curveSegments: 24,
    })
  );
  bodyGeom.translate(0, 0, -D / 2);
  phoneRoot.add(new THREE.Mesh(bodyGeom, titaniumMat));

  // Subtle antenna band seams on left & right titanium rails
  const antennaGeom = track(new THREE.BoxGeometry(W + 0.038, 0.022, D * 0.72));
  const antennaMat = track(
    new THREE.MeshStandardMaterial({ color: 0x16181e, metalness: 0.4, roughness: 0.65 })
  );
  for (const ay of [H * 0.39, -H * 0.39]) {
    const band = new THREE.Mesh(antennaGeom, antennaMat);
    band.position.set(0, ay, 0);
    phoneRoot.add(band);
  }

  // 2. Front Matte-Black Glass Bezel
  const bezelGeom = track(createRoundedPlaneGeometry(W - 0.015, H - 0.015, R - 0.01));
  const bezelMesh = new THREE.Mesh(bezelGeom, bezelGlassMat);
  bezelMesh.position.z = HALF_Z + 0.0008;
  phoneRoot.add(bezelMesh);

  // 3. Front 19.5:9 OLED Screen with Pomo App Texture
  const screenTexture = track(createScreenTexture(src, renderer.capabilities.getMaxAnisotropy()));
  const screenMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: screenTexture,
      emissive: 0xffffff,
      emissiveMap: screenTexture,
      emissiveIntensity: 0.8,
      roughness: 0.14,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.07,
      envMapIntensity: 0.85,
    })
  );
  const screenGeom = track(createRoundedPlaneGeometry(SW, SH, SR));
  const screenMesh = new THREE.Mesh(screenGeom, screenMat);
  screenMesh.position.z = HALF_Z + 0.0024;
  phoneRoot.add(screenMesh);

  // 4. Front Dynamic Island Pill + Camera Lens + Earpiece + Home Indicator
  const dynamicIslandGeom = track(createRoundedPlaneGeometry(0.44, 0.112, 0.056));
  const dynamicIsland = new THREE.Mesh(dynamicIslandGeom, darkRecessMat);
  dynamicIsland.position.set(0, SH / 2 - 0.104, HALF_Z + 0.0038);
  phoneRoot.add(dynamicIsland);

  const frontCamGeom = track(new THREE.CircleGeometry(0.024, 24));
  const frontCam = new THREE.Mesh(frontCamGeom, lensOpticMat);
  frontCam.position.set(0.145, SH / 2 - 0.104, HALF_Z + 0.0044);
  phoneRoot.add(frontCam);

  const frontCamGlintGeom = track(new THREE.CircleGeometry(0.008, 16));
  const frontCamGlintMat = track(
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.65 })
  );
  const frontCamGlint = new THREE.Mesh(frontCamGlintGeom, frontCamGlintMat);
  frontCamGlint.position.set(0.14, SH / 2 - 0.099, HALF_Z + 0.0048);
  phoneRoot.add(frontCamGlint);

  const earpieceGeom = track(createRoundedPlaneGeometry(0.22, 0.012, 0.006));
  const earpiece = new THREE.Mesh(earpieceGeom, antennaMat);
  earpiece.position.set(0, H / 2 - 0.025, HALF_Z + 0.0022);
  phoneRoot.add(earpiece);

  const homeBarGeom = track(createRoundedPlaneGeometry(0.5, 0.018, 0.009));
  const homeBarMat = track(
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.72 })
  );
  const homeBar = new THREE.Mesh(homeBarGeom, homeBarMat);
  homeBar.position.set(0, -SH / 2 + 0.054, HALF_Z + 0.0036);
  phoneRoot.add(homeBar);

  // 5. Side Hardware Buttons (Action, Volume Up/Down, Power, Camera Control)
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} height
   * @param {number} depth
   */
  function addSideButton(x, y, height, depth = 0.044) {
    const btnGeom = track(new THREE.CapsuleGeometry(0.014, Math.max(0.02, height - 0.028), 6, 12));
    btnGeom.scale(1.15, 1, depth / 0.028);
    const btn = new THREE.Mesh(btnGeom, buttonMat);
    btn.position.set(x, y, 0);
    phoneRoot.add(btn);
  }

  const leftEdgeX = -(W / 2 + 0.022);
  const rightEdgeX = W / 2 + 0.022;
  addSideButton(leftEdgeX, 0.92, 0.14); // Action button
  addSideButton(leftEdgeX, 0.62, 0.25); // Volume Up
  addSideButton(leftEdgeX, 0.3, 0.25); // Volume Down
  addSideButton(rightEdgeX, 0.56, 0.36); // Power / Side button
  addSideButton(rightEdgeX - 0.005, -0.58, 0.22, 0.036); // Camera Control

  // Bottom USB-C Port & Speaker Grilles
  const usbGeom = track(createRoundedPlaneGeometry(0.24, 0.052, 0.026));
  const usbMesh = new THREE.Mesh(usbGeom, darkRecessMat);
  usbMesh.rotation.x = Math.PI / 2;
  usbMesh.position.set(0, -(H / 2 + 0.019), 0);
  phoneRoot.add(usbMesh);

  const speakerHoleGeom = track(new THREE.CircleGeometry(0.013, 12));
  for (const sx of [-0.34, -0.28, -0.22, 0.22, 0.28, 0.34]) {
    const hole = new THREE.Mesh(speakerHoleGeom, darkRecessMat);
    hole.rotation.x = Math.PI / 2;
    hole.position.set(sx, -(H / 2 + 0.019), 0);
    phoneRoot.add(hole);
  }

  // 6. Back Frosted Glass Panel + iPhone 16 Vertical Dual Camera System
  const backPlateGeom = track(createRoundedPlaneGeometry(W - 0.022, H - 0.022, R - 0.012));
  const backPlate = new THREE.Mesh(backPlateGeom, backGlassMat);
  backPlate.rotation.y = Math.PI;
  backPlate.position.z = -(HALF_Z + 0.0008);
  phoneRoot.add(backPlate);

  // Subtle centered architectural titanium ring emblem on back
  const emblemRingGeom = track(new THREE.RingGeometry(0.145, 0.175, 48));
  const emblemMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x353a46,
      metalness: 0.78,
      roughness: 0.3,
      clearcoat: 0.4,
    })
  );
  const emblem = new THREE.Mesh(emblemRingGeom, emblemMat);
  emblem.rotation.y = Math.PI;
  emblem.position.set(0, 0.06, -(HALF_Z + 0.0022));
  phoneRoot.add(emblem);

  // Vertical pill camera plateau (top-left of back when viewing back = +x in phoneRoot coords)
  const camX = 0.41;
  const camY = 1.02;
  const plateauGeom = track(
    new THREE.ExtrudeGeometry(createRoundedRectShape(0.39, 0.82, 0.195), {
      depth: 0.032,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 5,
      curveSegments: 24,
    })
  );
  const plateau = new THREE.Mesh(plateauGeom, islandGlassMat);
  plateau.rotation.y = Math.PI;
  plateau.position.set(camX, camY, -(HALF_Z + 0.002));
  phoneRoot.add(plateau);

  // Dual vertical lenses
  const outerRingGeom = track(new THREE.CylinderGeometry(0.142, 0.148, 0.045, 36));
  const innerBarrelGeom = track(new THREE.CylinderGeometry(0.114, 0.114, 0.048, 32));
  const sapphireGeom = track(new THREE.CircleGeometry(0.104, 32));
  const pupilGeom = track(new THREE.CircleGeometry(0.044, 24));
  const glintGeom = track(new THREE.CircleGeometry(0.016, 16));

  for (const ly of [camY + 0.195, camY - 0.195]) {
    const lensGroup = new THREE.Group();
    lensGroup.position.set(camX, ly, -(HALF_Z + 0.048));

    const ring = new THREE.Mesh(outerRingGeom, lensRingMat);
    ring.rotation.x = Math.PI / 2;
    lensGroup.add(ring);

    const barrel = new THREE.Mesh(innerBarrelGeom, darkRecessMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.002;
    lensGroup.add(barrel);

    const glass = new THREE.Mesh(sapphireGeom, lensOpticMat);
    glass.rotation.y = Math.PI;
    glass.position.z = -0.027;
    lensGroup.add(glass);

    const pupil = new THREE.Mesh(pupilGeom, darkRecessMat);
    pupil.rotation.y = Math.PI;
    pupil.position.z = -0.0285;
    lensGroup.add(pupil);

    const glint = new THREE.Mesh(glintGeom, frontCamGlintMat);
    glint.rotation.y = Math.PI;
    glint.position.set(-0.028, 0.028, -0.0295);
    lensGroup.add(glint);

    phoneRoot.add(lensGroup);
  }

  // True Tone LED flash + mic dot beside the vertical camera pill
  const flashGeom = track(new THREE.CircleGeometry(0.042, 24));
  const flashMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xf4ecd8,
      roughness: 0.18,
      metalness: 0.1,
      clearcoat: 0.9,
    })
  );
  const flash = new THREE.Mesh(flashGeom, flashMat);
  flash.rotation.y = Math.PI;
  flash.position.set(camX - 0.31, camY + 0.075, -(HALF_Z + 0.0026));
  phoneRoot.add(flash);

  const micGeom = track(new THREE.CircleGeometry(0.016, 16));
  const mic = new THREE.Mesh(micGeom, darkRecessMat);
  mic.rotation.y = Math.PI;
  mic.position.set(camX - 0.31, camY - 0.07, -(HALF_Z + 0.0026));
  phoneRoot.add(mic);

  // 7. Ground Contact Shadow Plane
  const shadowTex = track(createShadowTexture());
  const shadowPlaneGeom = track(new THREE.PlaneGeometry(2.5, 2.5));
  const shadowPlaneMat = track(
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    })
  );
  const shadowPlane = new THREE.Mesh(shadowPlaneGeom, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.9;
  scene.add(shadowPlane);

  // ---- Interaction, Idle Float & Lifecycle Loop ----
  let disposed = false;
  let isVisible = true;
  let isDragging = false;
  let hasInteracted = false;
  let resetting = false;
  let rafId = 0;
  const startTime = performance.now();

  const onControlStart = () => {
    isDragging = true;
    resetting = false;
    if (!hasInteracted) {
      hasInteracted = true;
      onInteract?.();
    }
  };

  const onControlEnd = () => {
    isDragging = false;
  };

  controls.addEventListener('start', onControlStart);
  controls.addEventListener('end', onControlEnd);

  function renderNow() {
    if (disposed) return;
    renderer.render(scene, camera);
  }

  /** @param {number} now */
  function animate(now) {
    if (disposed) return;
    if (!isVisible) {
      rafId = 0;
      return;
    }

    const elapsed = (now - startTime) * 0.001;

    if (resetting) {
      camera.position.lerp(defaultCameraPos, 0.12);
      controls.target.lerp(originTarget, 0.12);
      if (camera.position.distanceTo(defaultCameraPos) < 0.01) {
        camera.position.copy(defaultCameraPos);
        controls.target.copy(originTarget);
        resetting = false;
      }
    }

    if (!reducedMotion) {
      const floatY = Math.sin(elapsed * 1.45) * 0.042;
      phoneRoot.position.y = floatY;
      shadowPlane.scale.setScalar(1 - floatY * 0.55);

      if (!isDragging && !hasInteracted) {
        phoneRoot.rotation.y = Math.sin(elapsed * 0.62) * 0.16;
      } else {
        phoneRoot.rotation.y *= 0.92;
      }
    }

    controls.update();
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(animate);
  }

  function startLoop() {
    if (!rafId && !disposed) {
      rafId = window.requestAnimationFrame(animate);
    }
  }

  // Pause rendering when off-screen to save battery & GPU
  const visibilityObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            isVisible = entries[0]?.isIntersecting ?? true;
            if (isVisible) startLoop();
          },
          { rootMargin: '120px 0px' }
        )
      : null;
  visibilityObserver?.observe(container);

  // Responsive resizing without stretching
  const resizeObserver =
    'ResizeObserver' in window
      ? new ResizeObserver(() => {
          if (disposed) return;
          const w = Math.max(1, container.clientWidth);
          const h = Math.max(1, container.clientHeight);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          renderNow();
        })
      : null;
  resizeObserver?.observe(container);

  startLoop();
  onReady?.();

  return {
    resetView() {
      hasInteracted = false;
      resetting = true;
      startLoop();
    },
    /**
     * Rotates the camera slightly around the phone for keyboard controls.
     * @param {number} dAzimuth
     * @param {number} dPolar
     */
    nudge(dAzimuth, dPolar) {
      resetting = false;
      if (!hasInteracted) {
        hasInteracted = true;
        onInteract?.();
      }
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta += dAzimuth;
      spherical.phi = Math.max(
        controls.minPolarAngle,
        Math.min(controls.maxPolarAngle, spherical.phi + dPolar)
      );
      offset.setFromSpherical(spherical);
      camera.position.copy(controls.target).add(offset);
      controls.update();
      renderNow();
    },
    dispose() {
      disposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      controls.dispose();
      envTarget.dispose();
      pmrem.dispose();
      for (const item of disposables) {
        item.dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
