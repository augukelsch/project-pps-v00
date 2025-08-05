# Project PPS

Projeto com **NestJS + NodeJS** no backend e **React + Tailwind** no frontend.

## **Arquitetura**
A arquitetura é dividida em dois principais módulos:

- **Backend**: Desenvolvido com NestJS, responsável por fornecer APIs REST.
- **Frontend**: Desenvolvido em ReactJS, estilizado com Tailwind.

Além disso:
- **Mocha**: Utilizado para testes de unidade no backend.
- **GitHub Actions**: Configurado para rodar testes e verificar o build automaticamente.

### **Estrutura de Pastas**

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
4. Todo código é testado com **Mocha** antes de subir para produção.
5. O pipeline (**GitHub Actions**) garante a qualidade e o build do projeto.

---

## **Como rodar localmente**

### **Pré-requisitos**
- NodeJS 18+
- npm ou yarn
- (Opcional) Docker

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
