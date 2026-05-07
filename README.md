# 🌿 Verde Vivo Paisagismo

Sistema web de solicitação e acompanhamento de serviços de paisagismo.  
**Projeto Integrador — Centro Universitário SENAC · 2026**

---

## 🌐 Acesso ao Sistema

| Página | Link |
|---|---|
| Formulário de Solicitação | [candidodm.github.io/verde-vivo-paisagismo](https://candidodm.github.io/verde-vivo-paisagismo) |
| Acompanhar Solicitação | [candidodm.github.io/verde-vivo-paisagismo/acompanhar.html](https://candidodm.github.io/verde-vivo-paisagismo/acompanhar.html) |
| Painel Administrativo | [candidodm.github.io/verde-vivo-paisagismo/admin.html](https://candidodm.github.io/verde-vivo-paisagismo/admin.html) |

> Nenhuma instalação necessária — acesse diretamente pelo navegador em qualquer dispositivo.

---

## 🎬 Vídeo de Demonstração

> ⏳ Em breve.

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
| Hospedagem | GitHub Pages |
| Fontes | Google Fonts (Playfair Display + DM Sans) |

---

## 📁 Estrutura de Arquivos

```
verde-vivo-paisagismo/
├── index.html          # Página do cliente: formulário de solicitação
├── acompanhar.html     # Página do cliente: acompanhar status
├── admin.html          # Painel da equipe: gerenciar solicitações
└── README.md           # Este arquivo
```

---

## ⚙️ Como Rodar o Projeto

### ▶️ Opção 1 — Acesso direto (recomendado)

Acesse o link abaixo em qualquer navegador, sem instalar nada:

**[https://candidodm.github.io/verde-vivo-paisagismo](https://candidodm.github.io/verde-vivo-paisagismo)**

Funciona em computador, celular e tablet.

---

### 🛠️ Opção 2 — Rodar localmente (para desenvolvedores)

Caso queira rodar o projeto a partir do código-fonte:

**Pré-requisitos**
- Navegador moderno (Chrome, Firefox, Edge)
- Conta Google (para configurar o Firebase)

**Passo 1 — Clone o repositório**
```bash
git clone https://github.com/candidodm/verde-vivo-paisagismo.git
cd verde-vivo-paisagismo
```
Ou baixe o ZIP pelo botão **Code → Download ZIP** na página do repositório.

**Passo 2 — Abra no navegador**

Abra o arquivo `index.html` diretamente no navegador (duplo clique ou arraste para o Chrome).

---

## 🔐 Acesso ao Painel Admin

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `verdevivo2026` |

> ⚠️ Login simplificado para fins acadêmicos. Em produção, usar Firebase Authentication.

---

## 👥 Integrantes do Grupo

| Nome | GitHub |
|---|---|
| Delfino Maurício Cândido | [@candidodm](https://github.com/candidodm) |
| Gabriel de Castro Silva | (inserir username) |
| Gabriela Rodrigues Guimarães | (inserir username) |
| João Pedro Barcellos Correa | [@legonnexon](https://github.com/legonnexon) |
| José Marcio Canto Oliveira | (inserir username) |
| Larissa Soares Conceição | [@larissasoares06](https://github.com/larissasoares06) |
| Pedro Henrique Beltrão de Souza | (inserir username) |
| Roger Alves da Silva | (inserir username) |

**Professor:** Me. Anderson Lopes  
**Instituição:** Centro Universitário SENAC  
**Disciplina:** Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web  
**Ano:** 2026
