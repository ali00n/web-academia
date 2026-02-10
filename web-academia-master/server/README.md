# Backend Setup - Academia Black Fitness

## 📋 Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando
- MySQL Workbench (opcional, para visualização)

## 🔧 Configuração do Banco de Dados

### 1. Criar o Banco de Dados

Abra o MySQL e execute o arquivo `database.sql`:

```bash
mysql -u root -p < database.sql
```

**OU** usando MySQL Workbench:
1. Abra o MySQL Workbench
2. Conecte ao servidor MySQL
3. Abra o arquivo `database.sql`
4. Execute o script (⚡ lightning icon ou Ctrl+Shift+Enter)

### 2. Configurar Variáveis de Ambiente

1. Dentro da pasta `server/`, copie o arquivo `.env.example`:
   ```bash
   cd server
   copy .env.example .env
   ```

2. Edite o arquivo `.env` com suas credenciais do MySQL:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=SUA_SENHA_MYSQL_AQUI
   DB_NAME=Academy
   DB_PORT=3306
   
   JWT_SECRET=mude_isso_para_algo_secreto_e_seguro
   PORT=3001
   ```

## 📦 Instalar Dependências

```bash
cd server
npm install
```

## 🚀 Iniciar o Servidor

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3001`

Para verificar se está funcionando, acesse: `http://localhost:3001/api/health`

## 🔍 Testar as APIs

### Registrar Usuário
```bash
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```

### Fazer Login
```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "test123"
}
```

Você receberá um `token` na resposta. Use esse token nas requisições autenticadas.

### Completar Perfil (necessita token)
```bash
POST http://localhost:3001/api/member/profile
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
  "fullName": "Nome Completo",
  "age": 25,
  "weight": 70.5,
  "height": 175,
  "trainingGoal": "health",
  "selectedPlan": "plus",
  "paymentMethod": "pix"
}
```

## 📊 Verificar Dados no MySQL

```sql
USE Academy;

-- Ver usuários
SELECT * FROM users;

-- Ver perfis de membros
SELECT * FROM member_profiles;

-- Ver presença
SELECT * FROM attendance;
```

## ⚠️ Problemas Comuns

**Erro de conexão com MySQL:**
- Verifique se o MySQL está rodando
- Confirme usuário e senha no arquivo `.env`
- Verifique se o banco `Academy` foi criado

**Erro "JWT_SECRET not defined":**
- Certifique-se de que o arquivo `.env` existe e contém `JWT_SECRET`

**Porta 3001 já em uso:**
- Mude a porta no arquivo `.env` para outra (ex: 3002)
