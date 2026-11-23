// Apply the saved theme before the stylesheet loads to avoid a flash.
(() => {
  let theme;
  try { theme = localStorage.getItem('horizon-theme'); } catch (_) { /* Storage may be disabled. */ }
  if (theme !== 'light' && theme !== 'dark') theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
})();
