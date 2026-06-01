# Stiphens Barbershop

Site profissional com painel administrativo completo.

---

## Instalacao

```bash
npm install
```

---

## Configuracao do .env

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Preencha com os dados do seu projeto Firebase:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## Rodar localmente

```bash
npm run dev
```

- Site: http://localhost:5173
- Painel admin: http://localhost:5173/admin/login

---

## Build para producao

```bash
npm run build
```

---

## Deploy no Firebase

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Fazer login
```bash
firebase login
```

### 3. Conectar ao projeto
```bash
firebase use --add
```
Selecione seu projeto na lista.

### 4. Publicar
```bash
firebase deploy
```

Pronto! O site estara disponivel em:
`https://SEU-PROJETO.web.app`

---

## Como adicionar imagens

1. Faca upload no Google Drive
2. Clique com botao direito -> Compartilhar -> "Qualquer pessoa com o link"
3. Copie o link e cole no painel /admin/imagens ou /admin/hero

---

## Como configurar o mapa

1. Abra o Google Maps e busque o endereco
2. Clique em Compartilhar -> Incorporar um mapa
3. Copie o codigo iframe completo
4. Cole no painel /admin/endereco

---

## Stack do projeto:

React 18 — interface e componentes
Vite - bundler e ambiente de desenvolvimento
React Router DOM - navegação entre páginas
Tailwind CSS - estilização utilitária
Framer Motion - animações e transições
React Hook Form - formulários do painel admin
React Toastify - notificações de feedback
Firebase Authentication - login seguro do administrador
Firebase Firestore - banco de dados em tempo real
Firebase Hosting - hospedagem do site
JavaScript ES6+ - linguagem base

## Ferramentas:

Google Drive - hospedagem gratuita de imagens
Google Maps Embed - mapa interativo
ESLint + Prettier - qualidade de código