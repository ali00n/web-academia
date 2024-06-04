function cadastroCliente(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmaSenha').value;

    if (username && email && password && confirmarSenha && password === confirmarSenha) {
        // Armazena os dados do usuário no localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        alert('Cadastro realizado com sucesso!');
    } else {
        alert('Por favor, preencha todos os dados corretamente e as senhas devem coincidir.');
    }
}

document.getElementById('registro').addEventListener('submit', cadastroCliente);
