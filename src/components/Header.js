export function Header() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav>
      <div class="container nav-wrapper">
        <a href="#" class="brand-logo">
          <img src="/img/icone-academia.png" alt="Academia Black Fitness Logo">
        </a>
        <button class="btn hide-on-desktop" id="mobile-menu-btn" aria-label="Menu">
          <i class="material-icons">menu</i>
        </button>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="index1.html">Sobre nós</a></li>
          <li><a href="codigosite.html">Códigos</a></li>
          <li><a href="calcIMC.html">Cálculo IMC</a></li>
          <li><a href="login.html" class="btn">Login</a></li>
        </ul>
      </div>
    </nav>
  `;
  return header;
}
