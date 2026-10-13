// ─────────────────────────────────────────────────────────────────────────────
// Verde Vivo — sessão do usuário e controle de acesso por perfil
//
// Perfis:  cliente  → solicita e acompanha serviços
//          equipe   → atende as visitas e atualiza status
//          admin    → gestão completa (indicadores, agenda, usuários)
//
// O perfil fica no documento usuarios/{uid} do Firestore. As regras do
// Firestore (firestore.rules) garantem que ninguém altere o próprio perfil.
// ─────────────────────────────────────────────────────────────────────────────
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const PERFIS = Object.freeze({ CLIENTE: "cliente", EQUIPE: "equipe", ADMIN: "admin" });
export const PERFIS_EQUIPE = [PERFIS.EQUIPE, PERFIS.ADMIN];

// Página para onde cada perfil vai depois do login.
// (Na etapa 3, a equipe passa a ir para agenda.html)
export function paginaInicial(perfil) {
  if (perfil === PERFIS.ADMIN || perfil === PERFIS.EQUIPE) return "admin.html";
  return "minhas-solicitacoes.html";
}

// Aguarda o Firebase informar o estado de login (só a primeira vez).
function aguardarUsuarioAuth() {
  return new Promise(resolve => {
    const parar = onAuthStateChanged(auth, user => { parar(); resolve(user); });
  });
}

// Lê o perfil em usuarios/{uid}. Se o documento não existir (ex.: falha de rede
// no cadastro), cria um perfil básico de cliente — as regras só permitem isso.
async function carregarPerfil(user) {
  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return { uid: user.uid, ...snap.data() };

  const basico = {
    nome: user.displayName || "",
    email: user.email,
    telefone: "",
    perfil: PERFIS.CLIENTE,
    ativo: true,
    criadoEm: serverTimestamp()
  };
  await setDoc(ref, basico);
  return { uid: user.uid, ...basico };
}

// Retorna { user, perfil } do usuário logado, ou null se ninguém estiver logado.
export async function obterSessao() {
  const user = await aguardarUsuarioAuth();
  if (!user) return null;
  const perfil = await carregarPerfil(user);
  return { user, perfil };
}

// Nome do arquivo da página atual (ex.: "admin.html").
function paginaAtual() {
  const nome = location.pathname.split("/").pop();
  return nome || "index.html";
}

// Protege uma página: exige login e, se informado, um dos perfis permitidos.
// Redireciona quando o acesso não é permitido (e nunca resolve nesse caso).
export async function exigirLogin(perfisPermitidos = []) {
  const sessao = await obterSessao();
  const nunca = new Promise(() => {});

  if (!sessao) {
    location.replace(`login.html?next=${encodeURIComponent(paginaAtual())}`);
    return nunca;
  }
  if (sessao.perfil.ativo === false) {
    await signOut(auth);
    location.replace("login.html?erro=inativo");
    return nunca;
  }
  if (perfisPermitidos.length && !perfisPermitidos.includes(sessao.perfil.perfil)) {
    location.replace(paginaInicial(sessao.perfil.perfil));
    return nunca;
  }
  return sessao;
}

export async function sair() {
  await signOut(auth);
  location.href = "login.html";
}

// Primeiro nome para saudações ("Olá, Mariana").
export function primeiroNome(perfil) {
  const n = (perfil?.nome || perfil?.email || "").trim();
  return n.split(/[\s@]/)[0] || "usuário";
}

// Escapa texto vindo do banco antes de inserir com innerHTML (evita XSS).
export function esc(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
