/**
 * Lógica de Interface do Usuário (Frontend).
 * Focado em Acessibilidade (WCAG AAA) com feedback via ARIA Live.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Obtém a URL gerada e assinada pelo Backend de forma segura
  const configElement = document.getElementById('app-config');
  const baseSeloUrl = configElement.getAttribute('data-selo-url');
  
  const styleSwitch = document.getElementById('style-switch');
  const themeSwitch = document.getElementById('theme-switch');
  const iframe = document.getElementById('selo-iframe');
  const announcer = document.getElementById('a11y-announcer');
  const contrastToggle = document.getElementById('contrast-toggle');
  const contrastBtnText = document.getElementById('contrast-btn-text');

  /**
   * Gerencia a ativação/desativação do modo de Alto Contraste na página inteira
   */
  function toggleContrast() {
    const isHighContrast = document.body.classList.toggle('high-contrast');
    
    // Atualiza estado ARIA
    contrastToggle.setAttribute('aria-pressed', isHighContrast);
    
    // Feedback sonoro para screen readers
    const statusMsg = isHighContrast 
      ? "Modo de alto contraste ativado." 
      : "Modo de exibição claro padrão ativado.";
    announcer.textContent = statusMsg;
    
    // Salva preferência do usuário no navegador
    localStorage.setItem('highContrastMode', isHighContrast);
  }

  // Restaura a preferência do usuário ao carregar a página
  if (localStorage.getItem('highContrastMode') === 'true') {
    document.body.classList.add('high-contrast');
    contrastToggle.setAttribute('aria-pressed', 'true');
  }

  // Registra evento de clique no botão de acessibilidade
  contrastToggle.addEventListener('click', toggleContrast);

  /**
   * Atualiza a renderização e as dimensões sem comprometer a assinatura HMAC
   */
  function updateSelo() {
    const style = styleSwitch.value;
    const theme = themeSwitch.value;

    try {
      // Decode seguro para prevenir problemas de escape HTML
      const decodedUrl = baseSeloUrl.replace(/&amp;/g, '&');
      const urlObj = new URL(decodedUrl);
      
      // Ajuste dinâmico sem impacto no "token" (que assina só CNPJ+Timestamp)
      urlObj.searchParams.set('style', style);
      urlObj.searchParams.set('theme', theme);
      
      // Redimensionamento recomendado pela LOTEP
      if (style === 'badge') {
        iframe.width = "450";
        iframe.height = "180";
      } else {
        iframe.width = "100%";
        iframe.height = "550";
      }

      iframe.src = urlObj.toString();

      // Feedback invisível para Leitores de Tela (Acessibilidade)
      announcer.textContent = `Selo atualizado visualmente para o estilo ${style} com tema ${theme}.`;
    } catch (error) {
      console.error("[ERRO] Falha ao processar URL do Iframe:", error);
      announcer.textContent = "Houve um erro ao atualizar a visualização do selo.";
    }
  }

  // Preenche os selects baseando-se na URL inicial do Backend
  try {
    const decodedUrl = baseSeloUrl.replace(/&amp;/g, '&');
    const urlObj = new URL(decodedUrl);
    
    if (urlObj.searchParams.has('style')) {
      styleSwitch.value = urlObj.searchParams.get('style');
    }
    if (urlObj.searchParams.has('theme')) {
      themeSwitch.value = urlObj.searchParams.get('theme');
    }
  } catch (e) {
    // Falha silenciosa no parsing inicial
  }

  // Bind de acessibilidade via teclado nativo no elemento <select>
  styleSwitch.addEventListener('change', updateSelo);
  themeSwitch.addEventListener('change', updateSelo);

  // Inicia a primeira renderização
  updateSelo();
});
