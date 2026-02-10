import { authAPI } from '../utils/api.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                // Call backend API
                const response = await authAPI.login({
                    username: username,
                    password: password
                });

                // Store token and user info
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userId', response.user.id);
                localStorage.setItem('username', response.user.username);
                localStorage.setItem('email', response.user.email);

                alert("Logado com sucesso!");
                window.location.href = "dashboard.html";
            } catch (error) {
                alert(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
            }
        });
    }
});
