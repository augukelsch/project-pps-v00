# Project PPS

Projeto para Planejamento, Gerenciamento de Produtos e Controle de Estoque.
A arquitetura do Projeto contém  **NestJS + NodeJS** no backend com banco NoSQL **MongoDB** e **React + Tailwind** no frontend.
<p style="display:flex;gap:30px;justify-content:center">
<img src="https://www.svgrepo.com/show/373872/nestjs.svg" width="80" alt="Nest Logo"/>
<img src="https://www.svgrepo.com/show/331488/mongodb.svg" width="80" alt="Mongo Logo"/>
<img src="https://www.svgrepo.com/show/354259/react.svg" width="80" alt="React Logo"/>
<img src="https://www.svgrepo.com/show/374118/tailwind.svg" width="80" alt="Tailwind Logo"/>
</p>

## **Arquitetura**
A arquitetura é dividida em dois principais módulos:

### <img style="margin-right:8px" src="https://www.svgrepo.com/show/138937/server.svg" width="30px"> **Backend**: Desenvolvido com NestJS, responsável por fornecer APIs REST.
- **Swagger Open API**: Disponível via endpoint http://localhost:3000/reference , implementado com biblioteca nativa  *Nest* <img src="https://www.svgrepo.com/show/373872/nestjs.svg" width="20" alt="Nest Logo"/> e *Scalar* <img src="https://scalar.com/logo-light.svg" width="20" alt="Tailwind Logo"/>.

### <img style="margin-right:8px" src="https://www.svgrepo.com/show/426200/screen-computer.svg" width="30px"> **Frontend**: Desenvolvido em ReactJS, estilizado com Tailwind.

Além disso:
- **Jest**: Utilizado para testes de unidade no backend.
- **GitHub Actions**: Configurado para rodar testes e verificar o build automaticamente.

### <img style="margin-right:8px" src="https://www.svgrepo.com/show/474852/folder.svg" width="30px"> **Estrutura de Pastas**

```bash
project-pps/
│
├── backend/ # Backend (NestJS)
│ ├── modules/ # Funcionalidades (divididas por domínio)
│ ├── common/ # Helpers e middlewares
│ └── storage/ # Acesso direto ao banco
│
├── frontend/ # Frontend (React + Tailwind)
│ ├── components/ # Componentes reutilizáveis
│ └── pages/ # Páginas
│
└── .github/ # Pipeline CI/CD (GitHub Actions)
```

### **Fluxo Geral**
1. O usuário acessa a interface web (**React**).
2. A interface consome dados via APIs expostas no **NestJS**.
3. O backend acessa o banco através do módulo **Storage** (repositories).
4. Todo código é testado com **Jest** antes de subir para produção.
5. O pipeline (**GitHub Actions**) garante a qualidade e o build do projeto.
<br/>
<br/>

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Interface Web (React)
    participant API as Backend API (NestJS)
    participant ST as Módulo Storage (Repositories)
    participant DB as Banco de Dados (Mongo DB)
    participant CI as Pipeline CI/CD (GitHub Actions)
    participant T as Testes Automatizados (Jest)

    U->>UI: Acessa aplicação
    UI->>API: Requisições HTTP
    API->>ST: Consultar/Salvar dados
    ST->>DB: Executar queries
    DB-->>ST: Retorna dados
    ST-->>API: Resposta processada
    API-->>UI: Resposta com dados
    UI-->>U: Renderiza interface

    Note over CI,T: Antes de ir para produção
    CI->>T: Executa testes automatizados
    T-->>CI: Status de aprovação
    CI->>UI: Build e Deploy
```
<br/>
<br/>
<br/>

## **Como rodar localmente**

### **Pré-requisitos**
- <img src="https://www.svgrepo.com/show/303266/nodejs-icon-logo.svg" width="25" alt="Nest Logo"> NodeJS 18+ 
- <img src="https://www.svgrepo.com/show/355146/npm.svg" width="25" alt="Nest Logo"> npm ou yarn 
- <img src="https://www.svgrepo.com/show/452192/docker.svg" width="25" alt="Nest Logo"> (Opcional) Docker 

### **Passos**
```bash
# Clonar o repositório
git clone https://github.com/augukelsch/project-pps-v00.git
cd project-pps

# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd ../frontend
npm install
npm run dev

# Tests
cd backend
npm run test

```

### **Estrutura Final Proposta**

```bash
my-project/
│
├── .github/
│   └── workflows/
│       └── ci.yml                # Pipeline CI/CD
│
├── backend/                      # Aplicação Backend (NestJS)
│   ├── src/
│   │   ├── main.ts               # Ponto de entrada
│   │   ├── app.module.ts         # Módulo raiz
│   │   ├── modules/              # Features por domínio
│   │   │   ├── controllers/  # Controllers
│   │   │   └── services/     # Services
│   │   ├── common/               # Helpers, pipes, filtros
│   │   └── storage/              # Repositórios e conexão
│   │       ├── repositories/     # Queries personalizadas
│   │       └── mongoose.config.ts
│   ├── test/                     # Testes Jest
│   │   └── user/
│   │       └── user.service.spec.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # Aplicação Frontend (React + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/           
│   │   ├── pages/                         
│   │   └── services/                        
│   ├── package.json
│   └── tailwind.config.js
│
├── docker-compose.yml            # (Opcional) Subir com containers
├── README.md
└── .env.example                  # Variáveis de ambiente

