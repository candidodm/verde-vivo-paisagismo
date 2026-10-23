# Configuração do Firebase

> **Sempre que o arquivo `firestore.rules` mudar**, repita o passo 2 (colar e publicar as regras). A etapa 2 acrescentou as regras da linha do tempo (`historico`); a etapa 3 restringiu a equipe às visitas atribuídas a ela; a etapa 4 acrescentou as avaliações (`avaliacoes`).

Estes passos são feitos **uma única vez** no [Console do Firebase](https://console.firebase.google.com/), no projeto `verde-vivo-e6afd`, por quem tem acesso de proprietário ou editor.

## 1. Ativar o login por e-mail e senha

1. Menu **Authentication** → aba **Sign-in method** (Método de login).
2. Clique em **E-mail/senha** → ative a primeira chave → **Salvar**.
3. (Opcional, recomendado) Aba **Templates** → ícone de idioma → **Português (Brasil)**, para que o e-mail de redefinição de senha chegue em português.
4. Aba **Settings** → **Authorized domains**: confirme que `candidodm.github.io` está na lista (adicione se não estiver).

## 2. Publicar as regras de segurança do Firestore

1. Menu **Firestore Database** → aba **Regras**.
2. Apague o conteúdo atual e cole todo o conteúdo do arquivo [`firestore.rules`](firestore.rules) deste repositório.
3. Clique em **Publicar**.

> As regras antigas provavelmente estavam em "modo de teste" (qualquer pessoa lê e escreve). Com as novas regras, cada perfil só acessa o que deve.

## 3. Criar o primeiro administrador

O cadastro pelo site sempre cria contas com perfil **cliente** (as regras impedem alguém de se cadastrar como admin). Para criar o primeiro administrador:

1. Acesse `https://candidodm.github.io/verde-vivo-paisagismo/login.html`, aba **Criar conta**, e cadastre o e-mail do administrador.
2. No console: **Firestore Database** → coleção **usuarios** → abra o documento com o e-mail cadastrado.
3. Edite o campo `perfil`, troque `cliente` por `admin` e salve.
4. Saia e entre de novo no site: você será levado ao painel.

Depois disso, **membros da equipe e outros administradores são cadastrados pelo próprio site**, na tela **Equipe** (`usuarios.html`): a pessoa recebe um e-mail para criar a senha. Na mesma tela o admin muda perfis e bloqueia acessos.

## 4. Notificações por e-mail (EmailJS)

1. Crie uma conta gratuita em [emailjs.com](https://www.emailjs.com/) (200 e-mails/mês).
2. **Email Services → Add New Service → Gmail**: conecte o Gmail remetente e anote o **Service ID**.
3. **Email Templates → Create New Template**: Subject `{{assunto}}`, To Email `{{to_email}}`, From Name `Verde Vivo Paisagismo` e o corpo:
   ```
   Olá, {{to_name}}!

   {{mensagem}}

   Protocolo: {{protocolo}}
   Status atual: {{status}}

   Acompanhe sua solicitação: {{link}}

   Verde Vivo Paisagismo
   ```
   Salve e anote o **Template ID**.
4. **Account → General**: anote a **Public Key**.
5. No arquivo [`js/notificacoes.js`](js/notificacoes.js), substitua os três textos `COLE_AQUI_...` pelos códigos anotados e envie o arquivo para o GitHub.

Enquanto as chaves não forem preenchidas, o sistema funciona normalmente — só não envia e-mails.

## Estrutura de dados

| Coleção | Conteúdo | Quem acessa |
|---|---|---|
| `usuarios/{uid}` | nome, e-mail, telefone, perfil (`cliente`, `equipe` ou `admin`), ativo, criadoEm | o próprio usuário; equipe e admin leem todos |
| `solicitacoes/{id}` | dados completos do pedido + `clienteId`, `email`, `agendamento` (data, período, confirmado), `responsavelId`, `responsavelNome`, `atualizadoEm`, `iniciadoEm`, `concluidoEm` | o cliente dono do pedido; o membro da equipe responsável; o admin |
| `solicitacoes/{id}/historico/{entrada}` | tipo (status, agenda, atribuição), titulo, statusAnterior, statusNovo, alteradoPor, alteradoPorNome, dataHora, observacao, notificado | o cliente dono do pedido; o responsável; o admin. Só o campo `notificado` pode ser alterado depois |
| `avaliacoes/{solicitacaoId}` | solicitacaoId, clienteId, nota (1 a 5), comentario, tipoServico, responsavelId, responsavelNome, criadoEm | o cliente que avaliou; o responsável; o admin. Só o cliente dono cria, só após "Concluído", e não pode editar depois |
| `acompanhamento/{protocolo}` | protocolo, status, tipo de serviço e datas — **sem dados pessoais** | qualquer pessoa que saiba o protocolo (só leitura de um item; listar é proibido) |

### Sobre as solicitações antigas (de teste)

Pedidos criados antes desta versão não têm `clienteId` nem registro em `acompanhamento`. Eles continuam aparecendo no painel da equipe; o registro de acompanhamento é criado automaticamente na primeira vez que a equipe atualizar o status deles.
