# Configuração do Firebase

> **Sempre que o arquivo `firestore.rules` mudar**, repita o passo 2 (colar e publicar as regras). A etapa 2 acrescentou as regras da linha do tempo (`historico`).

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

Para criar um usuário da **equipe de campo**, faça o mesmo processo trocando para `equipe`. (Na etapa 4 o administrador poderá fazer isso pelo próprio painel, na tela "Usuários da equipe".)

Para **bloquear** o acesso de alguém, mude o campo `ativo` para `false`.

## Estrutura de dados criada nesta etapa

| Coleção | Conteúdo | Quem acessa |
|---|---|---|
| `usuarios/{uid}` | nome, e-mail, telefone, perfil (`cliente`, `equipe` ou `admin`), ativo, criadoEm | o próprio usuário; equipe e admin leem todos |
| `solicitacoes/{id}` | dados completos do pedido + `clienteId`, `email`, `agendamento` (data, período, confirmado), `atualizadoEm`, `concluidoEm` | o cliente dono do pedido; equipe e admin |
| `solicitacoes/{id}/historico/{entrada}` | statusAnterior, statusNovo, alteradoPor, dataHora, observacao — uma entrada por mudança de status; ninguém edita nem apaga | o cliente dono do pedido; equipe e admin |
| `acompanhamento/{protocolo}` | protocolo, status, tipo de serviço e datas — **sem dados pessoais** | qualquer pessoa que saiba o protocolo (só leitura de um item; listar é proibido) |

### Sobre as solicitações antigas (de teste)

Pedidos criados antes desta versão não têm `clienteId` nem registro em `acompanhamento`. Eles continuam aparecendo no painel da equipe; o registro de acompanhamento é criado automaticamente na primeira vez que a equipe atualizar o status deles.
