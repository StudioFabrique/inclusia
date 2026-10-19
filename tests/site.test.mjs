import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const html = locale => readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');

test('French and Spanish are prerendered with localized content and real locale links', async () => {
  const [fr, es] = await Promise.all([html('fr'), html('es')]);
  assert.match(fr, /<html lang="fr"/);
  assert.match(es, /<html lang="es"/);
  assert.match(fr, /Le numérique ouvre les possibles/);
  assert.match(es, /Lo digital abre posibilidades/);
  for (const page of [fr, es]) {
    assert.match(page, /href="\/fr\/"/);
    assert.match(page, /href="\/es\/"/);
    assert.match(page, /hreflang="es"/);
    assert.doesNotMatch(page, /data-i18n|content\/fr\.json|\?lang=/);
  }
});

test('Approved facts, application link, and video controls survive migration', async () => {
  const page = await html('fr');
  for (const content of ['50', 'Participants visés par le pilote', '1,72 M€', 'Budget prévisionnel', 'Cofinancement européen FEDER']) assert.ok(page.includes(content));
  assert.match(page, /href="https:\/\/fnp\.lxp\.andria\.ovh\/"/);
  for (const id of ['toggle-hero-video', 'watch-video', 'dialog-player']) assert.ok(page.includes(`id="${id}"`));
  assert.ok(page.indexOf('id="hero-video"') < page.indexOf('id="hero-title"'));
  assert.doesNotMatch(page, /class="program-note[^\"]*border-t/);
});

test('Every translated section is present without executing client JavaScript', async () => {
  for (const locale of ['fr', 'es']) {
    const page = await html(locale);
    for (const id of ['home', 'facts', 'objectives', 'project', 'program', 'partners', 'contact']) assert.ok(page.includes(`id="${id}"`));
    assert.match(page, /TASUBINSA/);
    assert.match(page, /French Tech Pau Béarn/);
    assert.match(page, /mailto:poctefa_empleo@outlook.es/);
  }
});

test('Local video, font, and fallback poster are shipped in the static build', async () => {
  for (const name of ['INCLUS-IA.mp4', 'InterVariable.woff2', 'pyrenees.webp']) await access(new URL(`../dist/assets/${name}`, import.meta.url));
});


test('The unprefixed entry renders the French landing page without a redirect', async () => {
  const page = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.match(page, /<html lang="fr"/);
  assert.match(page, /Le numérique ouvre les possibles/);
  assert.match(page, /id="hero-video"/);
  assert.match(page, /href="\/es\/"/);
  assert.doesNotMatch(page, /http-equiv="refresh"|Redirecting from/);
});
