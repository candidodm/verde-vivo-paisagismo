# 🌿 Verde Vivo Paisagismo

Sistema web de solicitação e acompanhamento de serviços de paisagismo.  
**Projeto Integrador — Centro Universitário SENAC · 2026**

---

## 🌐 Acesso ao Sistema

| Página | Link |
|---|---|
| Formulário de Solicitação | [candidodm.github.io/verde-vivo-paisagismo](https://candidodm.github.io/verde-vivo-paisagismo) |
| Acompanhar Solicitação | [candidodm.github.io/verde-vivo-paisagismo/acompanhar.html](https://candidodm.github.io/verde-vivo-paisagismo/acompanhar.html) |
| Minhas solicitações (cliente) | [candidodm.github.io/verde-vivo-paisagismo/minhas-solicitacoes.html](https://candidodm.github.io/verde-vivo-paisagismo/minhas-solicitacoes.html) |
| Indicadores (administrador) | [candidodm.github.io/verde-vivo-paisagismo/indicadores.html](https://candidodm.github.io/verde-vivo-paisagismo/indicadores.html) |
| Usuários e equipe (administrador) | [candidodm.github.io/verde-vivo-paisagismo/usuarios.html](https://candidodm.github.io/verde-vivo-paisagismo/usuarios.html) |
| Entrar / Criar conta | [candidodm.github.io/verde-vivo-paisagismo/login.html](https://candidodm.github.io/verde-vivo-paisagismo/login.html) |
| Agenda (equipe e administrador) | [candidodm.github.io/verde-vivo-paisagismo/agenda.html](https://candidodm.github.io/verde-vivo-paisagismo/agenda.html) |
| Painel de solicitações (administrador) | [candidodm.github.io/verde-vivo-paisagismo/admin.html](https://candidodm.github.io/verde-vivo-paisagismo/admin.html) |

> Nenhuma instalação necessária — acesse diretamente pelo navegador em qualquer dispositivo.

---

## 🎬 Vídeo de Demonstração

Link do vídeo demonstrando o funcionamento da aplicação:
https://www.youtube.com/shorts/gwSLjm6oW7w

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

### Versão 2 — Projeto Integrador do 5º semestre (em desenvolvimento)

- [x] **Autenticação com perfis** (Firebase Authentication): cliente, equipe de campo e administrador, com login, cadastro e recuperação de senha — substitui o login fixo no código
- [x] **Regras de segurança do Firestore** por perfil e consulta pública por protocolo sem expor dados pessoais
- [x] Agendamento de data e período da visita técnica (segunda a sábado, até 60 dias)
- [x] Área do cliente com histórico e linha do tempo da solicitação
- [x] Agenda da equipe, agenda geral, confirmação da visita e atribuição de responsável
- [x] Notificação automática por e-mail a cada mudança de status e na confirmação da visita (EmailJS)
- [x] Painel de indicadores: volume, tempo médio de atendimento, serviços mais pedidos, satisfação e pendências
- [x] Avaliação do serviço pelo cliente (1 a 5 estrelas e comentário)
- [x] Cadastro da equipe pelo painel, com troca de perfil e bloqueio de acesso

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Autenticação | Firebase Authentication (e-mail e senha) |
| Banco de dados | Firebase Firestore (NoSQL em nuvem) + regras de segurança |
| Hospedagem | GitHub Pages |
| Fontes | Google Fonts (Playfair Display + DM Sans) |

---

## 📁 Estrutura de Arquivos

```
verde-vivo-paisagismo/
├── index.html              # Cliente: formulário de solicitação (exige login)
├── acompanhar.html         # Público: consulta de status por protocolo
├── login.html              # Entrar, criar conta e recuperar senha
├── minhas-solicitacoes.html # Cliente: lista dos próprios pedidos
├── solicitacao.html        # Detalhe do pedido: visita, linha do tempo e dados
├── agenda.html             # Equipe: minha agenda · Admin: agenda geral
├── atendimento.html        # Atendimento: iniciar/concluir, confirmar visita, responsável
├── indicadores.html        # Admin: painel de indicadores de gestão
├── usuarios.html           # Admin: cadastro da equipe, perfis e bloqueio
├── admin.html              # Painel da equipe e do administrador
├── js/
│   ├── firebase.js         # Inicialização única do Firebase (app, auth, db)
│   ├── sessao.js           # Sessão, perfis e proteção das páginas
│   ├── acoes.js            # Mudar status, confirmar visita, atribuir responsável
│   ├── indicadores.js      # Cálculo dos indicadores (funções puras)
│   ├── notificacoes.js     # Envio de e-mails pelo EmailJS (chaves ficam aqui)
│   └── ui.js               # Funções de interface (status, datas, etapas)
├── css/
│   └── base.css            # Estilos compartilhados das páginas novas
├── firestore.rules         # Regras de segurança do Firestore
├── CONFIGURAR-FIREBASE.md  # Passo a passo de configuração no console
└── README.md               # Este arquivo
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

**Passo 2 — Suba um servidor local**

As páginas usam módulos JavaScript (`import`), que não funcionam abrindo o arquivo com duplo clique. Na pasta do projeto, rode:

```bash
python -m http.server 8000
```

e acesse `http://localhost:8000`. (Outra opção é a extensão **Live Server** do VS Code.)

---

## 🔐 Acesso ao Painel

O login fixo da primeira versão foi substituído pelo **Firebase Authentication**. Cada pessoa entra com o próprio e-mail e senha, e o sistema direciona conforme o perfil:

| Perfil | Como é criado | Para onde vai após o login |
|---|---|---|
| Cliente | Cadastro pelo próprio site | Minhas solicitações |
| Equipe de campo | Cadastrada pelo administrador em "Equipe" (recebe e-mail para criar a senha) | Minha agenda (só as visitas atribuídas a ela) |
| Administrador | O primeiro, no console do Firebase; os demais, pela tela "Equipe" | Painel de solicitações |

Veja o passo a passo em [CONFIGURAR-FIREBASE.md](CONFIGURAR-FIREBASE.md).

---

## 👥 Integrantes do Grupo

| Nome | GitHub |
|---|---|
| Delfino Maurício Cândido | [@candidodm](https://github.com/candidodm) |
| Gabriel de Castro Silva | [@gabriellztech](https://github.com/gabriellztech) 
| Gabriela Rodrigues Guimarães | [@gabriela221291](https://github.com/gabriela221291) |
| João Pedro Barcellos Correa | [@legonnexon](https://github.com/legonnexon) |
| Larissa Soares Conceição | [@larissasoares06](https://github.com/larissasoares06) |
| Pedro Henrique Beltrão de Souza | [@pedrohenrique-cyber](https://github.com/pedrohenrique-cyber) |
| Roger Alves da Silva | [@rogeralves1704](https://github.com/rogeralves1704) |

**Professor:** Me. Anderson Lopes  
**Instituição:** Centro Universitário SENAC  
**Disciplina:** Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web  
**Ano:** 2026
