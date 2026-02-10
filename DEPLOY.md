# 🚀 Guia de Deploy - Academia Black Fitness

Este guia fornece instruções passo a passo para fazer o deploy do projeto no Vercel.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Neon](https://neon.tech) (banco de dados PostgreSQL)
- Node.js instalado
- Git instalado

## 🗄️ Configuração do Banco de Dados Neon

1. **Acessar o Neon Dashboard**
   - Entre em https://neon.tech
   - Crie um novo projeto ou use um existente

2. **Obter Credenciais**
   - Copie a **Connection String** (com pooling)
   - Copie a **Direct Connection String** (para migrações)

3. **Aplicar Schema ao Banco**
   ```bash
   # Na raiz do projeto
   npm run prisma:push
   ```

## 🌐 Deploy no Vercel

### Método 1: Via Vercel Dashboard (Recomendado)

1. **Fazer Login no Vercel**
   - Acesse https://vercel.com
   - Faça login com GitHub, GitLab ou email

2. **Importar Projeto**
   - Clique em "Add New Project"
   - Selecione "Import Git Repository"
   - Autorize o Vercel a acessar seus repositórios
   - Selecione o repositório `web-academia`

3. **Configurar Build**
   - Framework Preset: **Vite**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`

4. **Adicionar Variáveis de Ambiente**
   No painel "Environment Variables", adicione:
   
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_DxVvIWly52ue@ep-fancy-morning-ai0b3u40-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
   
   DIRECT_URL = postgresql://neondb_owner:npg_DxVvIWly52ue@ep-fancy-morning-ai0b3u40.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
   
   JWT_SECRET = your-secret-key-here-change-this
   ```
   
   > ⚠️ **IMPORTANTE**: Mude o `JWT_SECRET` para uma chave segura em produção

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build e deploy (1-3 minutos)

### Método 2: Via Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Preview deploy
   vercel
   
   # Production deploy
   vercel --prod
   ```

4. **Configurar Variáveis via CLI**
   ```bash
   vercel env add DATABASE_URL
   vercel env add DIRECT_URL
   vercel env add JWT_SECRET
   ```

## 🔧 Configuração Pós-Deploy

1. **Verificar Logs**
   - Acesse o dashboard do Vercel
   - Na aba "Deployments", clique no deployment
   - Verifique os logs de build e runtime

2. **Testar API**
   - Acesse `https://seu-projeto.vercel.app/api/health`
   - Deve retornar: `{"status": "OK", "message": "Academia Black Fitness API is running"}`

3. **Configurar Domínio Customizado** (Opcional)
   - No dashboard do Vercel, vá em "Settings" > "Domains"
   - Adicione seu domínio customizado

## 🐛 Troubleshooting

### Erro de Conexão com Banco de Dados

**Problema**: `P1001: Can't reach database server`

**Solução**:
- Verifique se as variáveis `DATABASE_URL` e `DIRECT_URL` estão corretas
- Certifique-se de que o banco Neon está ativo
- Verifique se está usando a URL com pooling (`-pooler`)

### Erro de Build

**Problema**: Build falha durante Prisma generate

**Solução**:
```bash
# Localmente
cd server
npx prisma generate
npm run build
```

### API Routes não funcionam

**Problema**: 404 em `/api/*`

**Solução**:
- Verifique o `vercel.json`
- Certifique-se de que os rewrites estão corretos
- Verifique se o servidor Express está exportando corretamente

## 📚 Comandos Úteis

```bash
# Visualizar banco de dados
npm run prisma:studio

# Sincronizar schema com banco
npm run prisma:push

# Gerar cliente Prisma
npm run prisma:generate

# Rodar servidor localmente
npm run server

# Build de produção
npm run build
```

## 🔐 Segurança

⚠️ **NUNCA commite o arquivo `.env` no Git!**

- O arquivo `.env` contém credenciais sensíveis
- Use `.env.example` como template
- Configure variáveis de ambiente no dashboard do Vercel

## 📞 Suporte

- Documentação Vercel: https://vercel.com/docs
- Documentação Neon: https://neon.tech/docs
- Documentação Prisma: https://www.prisma.io/docs

---

**✅ Deploy Concluído!** Seu projeto está online e acessível via Vercel.
