# 🚀 Express + MySQL API Boilerplate

Este é um projeto base (boilerplate) robusto para construção de APIs RESTful utilizando Node.js, Express e MySQL.

O objetivo deste projeto é servir de referência arquitetural, separando claramente as responsabilidades entre Rotas, Controllers, Regras de Negócio (Entities) e Acesso a Dados (Repositories).

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **Express**
- **MySQL2** (com Connection Pool e Promises)
- **Bcrypt** (para hash de senhas)
- **Dotenv** (variáveis de ambiente)
- **CORS** & **Express.json**

## 📂 Estrutura do Projeto

A arquitetura foi desenhada seguindo princípios de **Separação de Responsabilidades (SoC)**:

```bash
├── src/
│   ├── config/          # Conexão com o Banco de Dados (Pool)
│   ├── controllers/     # Gerencia requisições HTTP (Request/Response)
│   ├── entities/        # Regras de Negócio e Validações (ex: User Class)
│   ├── repositories/    # Camada de Persistência (SQL queries)
│   ├── routes/          # Definição das rotas da API
│   └── app.js           # (Opcional) Configurações do app
└── server.js            # Ponto de entrada (Entry point)
```

## ⚙️ Como Executar
1. Pré-requisitos
Certifique-se de ter instalado:

- **Node.js**
- **MYSQL**

2. Clonar e Instalar

git clone [https://github.com/SEU-USUARIO/express-mysql-boilerplate.git](https://github.com/SEU-USUARIO/express-mysql-boilerplate.git)
cd express-mysql-boilerplate
npm install

3. Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto (baseado no .env.example) e preencha com suas credenciais:

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=express_boilerplate_db


4. Configurar o Banco de Dados

Execute o script abaixo no seu cliente MySQL (DBeaver, Workbench) para criar a tabela:

CREATE DATABASE IF NOT EXISTS express_boilerplate_db;
USE express_boilerplate_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL
);

5. Rodar o Servidor

# Modo de produção
node server.js

# Ou se tiver o script dev configurado
npm run dev


# 📡 Endpoints da API

### 📡 Endpoints da API

A API possui o prefixo `/api`.

| Método | Rota | Descrição | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Lista todos os usuários | N/A |
| `GET` | `/api/users/:id` | Busca usuário por ID | N/A |
| `POST` | `/api/users` | Cria um novo usuário | `{ "name": "...", "email": "...", "password": "..." }` |
| `PUT` | `/api/users/:id` | Atualiza um usuário | `{ "name": "...", "email": "...", "password": "..." }` |
| `DELETE` | `/api/users/:id` | Remove um usuário | N/A |




# 🛡️ Segurança e Validações
Senha: As senhas são automaticamente criptografadas usando bcrypt antes de serem salvas no banco.

Entidade User: A classe User (em src/entities) blinda a aplicação, impedindo que dados inválidos (senhas curtas, e-mails sem @) cheguem ao banco de dados.