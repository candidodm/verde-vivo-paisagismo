# 🌿 Verde Vivo Paisagismo

Sistema web de solicitação e acompanhamento de serviços de paisagismo.  
**Projeto Integrador — Centro Universitário SENAC · 2025**

---

## 📋 Sobre o Projeto

O **Verde Vivo** é uma aplicação web que permite que clientes solicitem e acompanhem serviços de paisagismo de forma organizada, sem precisar usar WhatsApp ou ligações. A equipe da empresa gerencia todas as solicitações por um painel administrativo.

**Problema resolvido:** Empresas de paisagismo de pequeno porte gerenciam atendimentos por mensagens e planilhas avulsas, o que dificulta o controle e impede o cliente de acompanhar o andamento.

---

## 🚀 Funcionalidades

- **Formulário de solicitação** — cliente preenche nome, telefone, endereço, tipo de serviço, descrição e envia foto do local
- **Protocolo automático** — gerado ao enviar a solicitação (ex: `VVABC123`)
- **Acompanhamento de status** — cliente busca pelo protocolo ou telefone e vê o progresso
- **Stepper visual** — Solicitado → Em Execução → Concluído
- **Painel administrativo** — equipe filtra, visualiza e atualiza o status de cada solicitação

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Banco de dados | Firebase Firestore (NoSQL em nuvem) |
| Hospedagem | Firebase Hosting (ou abrir os arquivos localmente) |
| Fontes | Google Fonts (Playfair Display + DM Sans) |

---

## 📁 Estrutura de Arquivos

```
verde-vivo/
├── index.html          # Página do cliente: formulário de solicitação
├── acompanhar.html     # Página do cliente: acompanhar status
├── admin.html          # Painel da equipe: gerenciar solicitações
└── README.md           # Este arquivo
```

---

## ⚙️ Como Configurar e Rodar

### Pré-requisitos

- Conta Google (para usar o Firebase)
- Navegador moderno (Chrome, Firefox, Edge)
- Nenhuma instalação necessária — tudo roda no browser

### Passo 1 — Criar o projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** e dê um nome (ex: `verde-vivo`)
3. Desative o Google Analytics (não é necessário) e clique em **"Criar projeto"**

### Passo 2 — Criar o banco de dados Firestore

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Iniciar no modo de teste"** (válido por 30 dias — suficiente para o projeto)
4. Selecione a região `southamerica-east1` (São Paulo) e clique em **"Ativar"**

### Passo 3 — Obter as credenciais do Firebase

1. No Firebase Console, clique na engrenagem ⚙️ → **"Configurações do projeto"**
2. Role até **"Seus aplicativos"** → clique em **"Web"** (`</>`)
3. Dê um apelido (ex: `verde-vivo-web`) e clique em **"Registrar aplicativo"**
4. Copie o objeto `firebaseConfig` exibido na tela

### Passo 4 — Colar as credenciais nos arquivos

Abra cada um dos três arquivos (`index.html`, `acompanhar.html`, `admin.html`) e **substitua** o bloco `firebaseConfig` com os dados copiados. Procure por:

```javascript
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY",
  ...
};
```

E substitua pelos valores reais do seu projeto.

### Passo 5 — Abrir no navegador

Abra o arquivo `index.html` diretamente no navegador.  
Não é necessário servidor local — o Firebase funciona direto do arquivo.

---

## 🔐 Acesso ao Painel Admin

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `verdevivo2025` |

> ⚠️ Login simplificado para fins acadêmicos. Em produção, usar Firebase Authentication.

---

## 👥 Integrantes do Grupo

| Nome |
|---|
| Delfino Maurício Cândido |
| Gabriel de Castro Silva |
| Gabriela Rodrigues Guimarães |
| João Pedro Barcellos Correa |
| José Marcio Canto Oliveira |
| Larissa Soares Conceição |
| Pedro Henrique Beltrão de Souza |
| Roger Alves da Silva |

**Professor:** Me. Anderson Lopes  
**Instituição:** Centro Universitário SENAC  
**Curso:** Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web  
**Ano:** 2025
