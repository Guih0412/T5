# 🐾 Sistema de Gerenciamento de Produtos e Clientes

Projeto fullstack para cadastro, listagem, atualização, exclusão e **registro de consumo de produtos por clientes**, com geração de relatórios específicos.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React + TypeScript + React-Bootstrap  
- **Backend**: Node.js + Express + Prisma  
- **Banco de dados**: MySQL  

---

## ⚙️ Configuração Inicial

1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd atvv-pl-typescript
```

2. Crie o banco de dados no MySQL
```bash
 CREATE DATABASE atvvpl_db;
```

3. Configure o .env
- Dentro da pasta backend/, crie o arquivo .env com:
```bash
DATABASE_URL="mysql://root:senha@localhost:3306/atvvpl_db"
```



## Como rodar Backend?

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Como rodar Frontend?
```bash
cd frontend
npm install
npm start
```