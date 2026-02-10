# 🚀 Migração para Prisma - Instruções de Instalação

## ⚠️ IMPORTANTE: Execute estes comandos

O PowerShell está bloqueando a execução de scripts.  
Execute os comandos abaixo **manualmente** no terminal:

### 1. Instalar Dependências do Prisma

```powershell
cd server
npm install @prisma/client
npm install -D prisma
```

### 2. Gerar Prisma Client

```powershell
npx prisma generate
```

### 3. (Opcional) Sincronizar Schema com Banco

Se você quiser que o Prisma gerencie o banco automaticamente:

```powershell
npx prisma db push
```

> **Nota:** Como o banco já existe e foi criado manualmente, `db push` não é necessário. O Prisma vai funcionar com o banco existente!

### 4. Reiniciar o Servidor

```powershell
npm start
```

## ✅ O que foi migrado?

✅ Criado `prisma/schema.prisma` com os modelos  
✅ Criado `prisma.js` com Prisma Client  
✅ `routes/auth.js` - agora usa Prisma  
✅ `routes/member.js` - agora usa Prisma  
✅ Removida dependência do `db.js` (mysql2)

## 🎯 Vantagens do Prisma

- ✨ **Type-safe**: Auto-complete completo no VSCode
- 🚀 **Queries mais limpas**: Sem SQL manual
- 🛡️ **Proteção contra SQL Injection**: Automática
- 📊 **Melhor logging**: Veja todas as queries executadas

## 📝 Exemplos de Código

### Antes (mysql2):
```javascript
const [users] = await db.query(
    'SELECT id, username, email FROM users WHERE username = ?',
    [username]
);
const user = users[0];
```

### Depois (Prisma):
```javascript
const user = await prisma.user.findUnique({
    where: { username }
});
```

## 🐛 Troubleshooting

**Erro "Cannot find module '@prisma/client'":**
- Execute: `npm install @prisma/client`
- Depois: `npx prisma generate`

**Erro de conexão do Prisma:**
- Verifique se `DATABASE_URL` está correto no `.env`
- Formato: `mysql://user:password@host:port/database`

## 🔄 Próximos Passos

Após instalar e gerar o Prisma Client:
1. Reinicie o backend (`npm start`)
2. Teste cadastro e login
3. Tudo deve funcionar igual, mas com código mais limpo!
