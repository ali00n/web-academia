import './styles/main.css';
import './styles/whatsapp.css';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
// import './updateStats.js'; // Dynamic member counter (commented - backend not running)

document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');

    // Inject Header before Main
    const header = Header();
    app.insertBefore(header, app.firstChild);

    // Inject Footer after Main
    app.appendChild(Footer());

    // Initialize UI Logic
    initMobileMenu();
});

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (btn && navLinks) {
        btn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Toggle icon or animation
        });
    }
}

console.log('App started');
