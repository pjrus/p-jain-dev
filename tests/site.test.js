// @ts-nocheck
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildContactMailto, validateContact } from '../src/lib/contact.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const BUILD_DIR = path.join(ROOT, 'build');
const POSTS_DIR = path.join(ROOT, 'src', 'posts');

test('validateContact rejects missing or invalid fields', () => {
  const empty = validateContact({ name: '   ', email: 'not-an-email', message: '' });
  assert.equal(empty.valid, false);
  assert.ok(empty.nameError);
  assert.ok(empty.emailError);
  assert.ok(empty.messageError);
});

test('validateContact trims valid fields and buildContactMailto encodes URI components', () => {
  const res = validateContact({
    name: '  Ada Lovelace ',
    email: ' ada@example.com ',
    message: 'Hello & welcome!',
  });
  assert.equal(res.valid, true);
  assert.deepEqual(res.trimmed, {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'Hello & welcome!',
  });

  const href = buildContactMailto(res.trimmed);
  assert.ok(href.startsWith('mailto:paarangatj@gmail.com?subject='));
  assert.ok(href.includes('Portfolio%20enquiry%20from%20Ada%20Lovelace'));
  assert.ok(href.includes('Hello%20%26%20welcome!'));
  assert.ok(href.includes('Email%3A%20ada%40example.com'));
});

test('built static site excludes drafts, includes routes, and has no scrollcraft leftovers', () => {
  assert.ok(fs.existsSync(BUILD_DIR), 'Expected build/ directory — run `npm run build` first');

  const indexHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');
  const aboutHtml = fs.readFileSync(path.join(BUILD_DIR, 'about.html'), 'utf8');
  const blogHtml = fs.readFileSync(path.join(BUILD_DIR, 'blog.html'), 'utf8');
  const sitemapXml = fs.readFileSync(path.join(BUILD_DIR, 'sitemap.xml'), 'utf8');
  const robotsTxt = fs.readFileSync(path.join(BUILD_DIR, 'robots.txt'), 'utf8');

  for (const [name, html] of [
    ['index.html', indexHtml],
    ['about.html', aboutHtml],
    ['blog.html', blogHtml],
  ]) {
    assert.ok(!html.includes('scrollcraft'), `${name} should not reference scrollcraft`);
  }

  assert.ok(robotsTxt.includes('Sitemap: https://pjrus.github.io/sitemap.xml'));
  assert.ok(sitemapXml.includes('<loc>https://pjrus.github.io</loc>'));
  assert.ok(sitemapXml.includes('<loc>https://pjrus.github.io/about</loc>'));
  assert.ok(sitemapXml.includes('<loc>https://pjrus.github.io/blog</loc>'));

  const postFiles = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));
  for (const file of postFiles) {
    const slug = file.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const isDraft = /^draft:\s*true\b/m.test(md);
    const builtPostPath = path.join(BUILD_DIR, 'blog', `${slug}.html`);

    if (isDraft) {
      assert.equal(fs.existsSync(builtPostPath), false, `Draft ${slug} must not be prerendered`);
      assert.equal(sitemapXml.includes(`/blog/${slug}`), false, `Draft ${slug} must not be in sitemap`);
    } else {
      assert.equal(fs.existsSync(builtPostPath), true, `Post ${slug} must be prerendered`);
      assert.ok(blogHtml.includes(`/blog/${slug}`), `Post ${slug} must appear on /blog`);
      assert.ok(sitemapXml.includes(`/blog/${slug}`), `Post ${slug} must appear in sitemap`);
    }
  }
});
