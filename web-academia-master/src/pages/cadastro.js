import { authAPI } from '../utils/api.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem.');
                    return;
                }

                try {
                    // Call backend API
                    await authAPI.register({
                        username: name,
                        email: email,
                        password: password
                    });

                    alert('Cadastro realizado com sucesso!');
                    window.location.href = "login.html";
                } catch (error) {
                    alert(error.message || 'Erro ao registrar. Tente novamente.');
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});
