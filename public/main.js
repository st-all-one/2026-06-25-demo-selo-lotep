/**
 * public/main.js
 * Script Genérico: Contém lógicas de acessibilidade e comportamentos globais (ex: Alto Contraste).
 * Isolado para não se misturar com regras de negócio ou de componentes específicos.
 */
document.addEventListener('DOMContentLoaded', () => {
  const announcer = document.getElementById('a11y-announcer');
  const contrastToggle = document.getElementById('contrast-toggle');

  if (!contrastToggle) return;

  function toggleContrast() {
    const isHighContrast = document.body.classList.toggle('high-contrast');

    contrastToggle.setAttribute('aria-pressed', isHighContrast);

    if (announcer) {
      announcer.textContent = isHighContrast
        ? "Modo de alto contraste ativado."
        : "Modo de exibição claro padrão ativado.";
    }

    localStorage.setItem('highContrastMode', isHighContrast);
  }

  if (localStorage.getItem('highContrastMode') === 'true') {
    document.body.classList.add('high-contrast');
    contrastToggle.setAttribute('aria-pressed', 'true');
  }

  contrastToggle.addEventListener('click', toggleContrast);
});
