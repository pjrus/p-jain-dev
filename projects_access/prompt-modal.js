/**
 * prompt-modal.js
 * Custom modal replacement for window.prompt() which is blocked by modern browsers.
 * Provides a themed, async customPrompt() function that returns a Promise.
 * Usage: const value = await customPrompt("Enter something:", "default");
 *        Returns null if cancelled, otherwise the input string.
 */
(function () {
  // Inject modal HTML
  const overlay = document.createElement('div');
  overlay.id = 'promptModalOverlay';
  overlay.innerHTML = `
    <div id="promptModalBox">
      <p id="promptModalMsg"></p>
      <input type="text" id="promptModalInput" autocomplete="off" />
      <div id="promptModalBtns">
        <button id="promptModalOk">OK</button>
        <button id="promptModalCancel">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Inject modal CSS
  const style = document.createElement('style');
  style.textContent = `
    #promptModalOverlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      z-index: 100000;
      justify-content: center;
      align-items: center;
    }
    #promptModalOverlay.visible {
      display: flex;
    }
    #promptModalBox {
      background: var(--color-bg-card, #1e293b);
      border: 1px solid var(--color-border, rgba(148,163,184,0.15));
      border-radius: 12px;
      padding: 24px 28px;
      min-width: 340px;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      animation: promptFadeIn 0.15s ease-out;
    }
    @keyframes promptFadeIn {
      from { opacity: 0; transform: scale(0.95) translateY(-8px); }
      to   { opacity: 1; transform: scale(1)    translateY(0); }
    }
    #promptModalMsg {
      margin: 0 0 14px;
      font-size: 15px;
      font-weight: 500;
      color: var(--color-text-main, #f1f5f9);
      line-height: 1.5;
    }
    #promptModalInput {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      font-size: 15px;
      border-radius: 8px;
      border: 1px solid var(--color-border, rgba(148,163,184,0.15));
      background: var(--color-input-bg, rgba(15,23,42,0.6));
      color: var(--color-text-main, #f1f5f9);
      outline: none;
      transition: border-color 0.2s;
    }
    #promptModalInput:focus {
      border-color: var(--color-primary, #38bdf8);
    }
    #promptModalBtns {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 18px;
    }
    #promptModalOk, #promptModalCancel {
      padding: 8px 20px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid var(--color-border, rgba(148,163,184,0.15));
      transition: background 0.15s, transform 0.1s;
    }
    #promptModalOk {
      background: var(--color-primary, #38bdf8);
      color: #0f172a;
      border-color: transparent;
    }
    #promptModalOk:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }
    #promptModalCancel {
      background: var(--color-btn-bg, #334155);
      color: var(--color-btn-text, #f8fafc);
    }
    #promptModalCancel:hover {
      background: var(--color-btn-hover, #475569);
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);

  // customPrompt function — returns a Promise<string|null>
  window.customPrompt = function (message, defaultValue) {
    return new Promise((resolve) => {
      const overlayEl = document.getElementById('promptModalOverlay');
      const msgEl = document.getElementById('promptModalMsg');
      const inputEl = document.getElementById('promptModalInput');
      const okBtn = document.getElementById('promptModalOk');
      const cancelBtn = document.getElementById('promptModalCancel');

      msgEl.textContent = message || '';
      inputEl.value = defaultValue || '';
      overlayEl.classList.add('visible');
      inputEl.focus();
      inputEl.select();

      function cleanup() {
        overlayEl.classList.remove('visible');
        okBtn.removeEventListener('click', onOk);
        cancelBtn.removeEventListener('click', onCancel);
        inputEl.removeEventListener('keydown', onKey);
        overlayEl.removeEventListener('click', onOverlayClick);
      }

      function onOk() {
        cleanup();
        resolve(inputEl.value);
      }
      function onCancel() {
        cleanup();
        resolve(null);
      }
      function onKey(e) {
        if (e.key === 'Enter') { e.preventDefault(); onOk(); }
        if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
      }
      function onOverlayClick(e) {
        if (e.target === overlayEl) onCancel();
      }

      okBtn.addEventListener('click', onOk);
      cancelBtn.addEventListener('click', onCancel);
      inputEl.addEventListener('keydown', onKey);
      overlayEl.addEventListener('click', onOverlayClick);
    });
  };
})();
