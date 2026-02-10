# 🚀 Setup Rápido - Academia Black Fitness

## ⚠️ IMPORTANTE: Criar Banco de Dados PRIMEIRO!

Antes de fazer cadastro, você PRECISA criar o banco de dados MySQL.

### Opção 1: MySQL Command Line

```bash
# 1. Abrir MySQL
mysql -u root -p
# Digite a senha: 1234

# 2. Executar o script
source C:/Users/aliss/Projetos_python/web-academia/web-academia-master/database.sql

# 3. Verificar
USE Academy;
SHOW TABLES;

# Deve mostrar: users, member_profiles, attendance
```

### Opção 2: MySQL Workbench (MAIS FÁCIL)

1. **Abrir MySQL Workbench**
2. **Conectar ao servidor** (localhost, usuário: root, senha: 1234)
3. **File → Open SQL Script**
4. Selecionar: `database.sql`
5. **Executar** (⚡ ícone ou Ctrl+Shift+Enter)
6. Verificar se apareceu o banco `Academy` na lateral esquerda

### Opção 3: Linha de Comando (Mais Rápido)

```powershell
# Na pasta raiz do projeto
mysql -u root -p1234 < database.sql
```

## ✅ Verificar se Funcionou

No MySQL Workbench ou command line:

```sql
USE Academy;
SHOW TABLES;
```

Deve mostrar:
- users
- member_profiles  
- attendance

## 🎯 Depois de Criar o Banco

1. **Reiniciar o backend:**
   ```bash
   cd server
   npm start
   ```

2. **Abrir o frontend:**
   ```bash
   # Na pasta raiz
   npm run dev
   ```

3. **Testar cadastro** em `http://localhost:3000`

---

## 🐛 Se der erro "ER_BAD_DB_ERROR"

Significa que o banco `Academy` não existe. Volte aos passos acima.

## 🔑 Credenciais MySQL

- **Usuário:** root
- **Senha:** 1234  
- **Banco:** Academy
- **Porta:** 3306
