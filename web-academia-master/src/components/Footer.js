export function Footer() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h5>Academia Black Fitness</h5>
          <p>O melhor da academia para você.</p>
        </div>
        <div class="footer-section">
          <h5>Links Rápidos</h5>
          <ul>
            <li><a href="#contact">Contato</a></li>
            <li><a href="index1.html">Sobre Nós</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>Desenvolvedor</h5>
          <p>Alisson Ribeiro</p>
          <div class="social-links">
            <a href="https://github.com/ali00n" target="_blank" rel="noopener noreferrer">GitHub</a> |
            <a href="https://www.linkedin.com/in/alisson-ribeiro-b3366b1a7/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <p>&copy; ${new Date().getFullYear()} Academia Black Fitness. Todos os direitos reservados.</p>
      </div>
    </div>
  `;
    return footer;
}
