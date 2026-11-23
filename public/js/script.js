'use strict';
document.documentElement.classList.add('js');
const themeButton = document.querySelector('.theme-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
  themeButton.firstElementChild.textContent = dark ? '☀' : '☾';
}
themeButton.hidden = false;
updateThemeButton();
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('horizon-theme', theme); } catch (_) { /* The toggle still works without storage. */ }
  updateThemeButton();
});
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menuButton.hidden = false;
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);
const filterBar = document.querySelector('.filter-bar');
if (filterBar) {
  filterBar.hidden = false;
  const cards = [...document.querySelectorAll('.destination')];
  filterBar.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filterBar.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    document.querySelector('#filter-status').textContent = `Показано направлений: ${cards.filter(card => !card.hidden).length} из ${cards.length}`;
  });
}
const topButton = document.querySelector('.back-top');
function updateTopButton() { topButton.hidden = window.scrollY < 450; }
window.addEventListener('scroll', updateTopButton, { passive: true });
updateTopButton();
topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('.logo').focus({ preventScroll: true });
});
