/**
 * public/iframe-control.js
 * Script Específico: Lida APENAS com a manipulação do Iframe do Selo Dinâmico,
 * resgate de parâmetros do backend e ajustes recomendados pela LOTEP.
 */
document.addEventListener('DOMContentLoaded', () => {
  const configElement = document.getElementById('app-config');
  if (!configElement) return;

  const baseSeloUrl = configElement.getAttribute('data-selo-url');

  const styleSwitch = document.getElementById('style-switch');
  const themeSwitch = document.getElementById('theme-switch');
  const iframe = document.getElementById('selo-iframe');
  const announcer = document.getElementById('a11y-announcer');

  function updateSelo() {
    if (!styleSwitch || !themeSwitch || !iframe) return;

    const style = styleSwitch.value;
    const theme = themeSwitch.value;

    try {
      const decodedUrl = baseSeloUrl.replace(/&amp;/g, '&');
      const urlObj = new URL(decodedUrl);

      urlObj.searchParams.set('style', style);
      urlObj.searchParams.set('theme', theme);

      // Ajustes dimensionais recomendados no manual
      if (style === 'badge') {
        iframe.width = "450";
        iframe.height = "180";
      } else {
        iframe.width = "100%";
        iframe.height = "550";
      }

      iframe.src = urlObj.toString();

      if (announcer) {
        announcer.textContent = `Visualização atualizada: Formato ${style}, Tema ${theme}.`;
      }
    } catch (error) {
      console.error("[ERRO] Falha ao injetar parâmetros na URL do Iframe:", error);
    }
  }

  // Sincroniza selects com a URL vinda do servidor
  try {
    const decodedUrl = baseSeloUrl.replace(/&amp;/g, '&');
    const urlObj = new URL(decodedUrl);

    if (urlObj.searchParams.has('style') && styleSwitch) {
      styleSwitch.value = urlObj.searchParams.get('style');
    }
    if (urlObj.searchParams.has('theme') && themeSwitch) {
      themeSwitch.value = urlObj.searchParams.get('theme');
    }
  } catch (e) {
    // Falha silenciosa
  }

  if (styleSwitch) styleSwitch.addEventListener('change', updateSelo);
  if (themeSwitch) themeSwitch.addEventListener('change', updateSelo);

  updateSelo();
});
