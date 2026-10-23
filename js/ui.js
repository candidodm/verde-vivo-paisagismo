// ─────────────────────────────────────────────────────────────────────────────
// Verde Vivo — funções de interface compartilhadas
// ─────────────────────────────────────────────────────────────────────────────
import { esc } from "./sessao.js";

export const ETAPAS = ["Solicitado", "Em Execução", "Concluído"];

export const PERIODOS = Object.freeze({
  manha: "Manhã (8h às 12h)",
  tarde: "Tarde (13h às 17h)"
});

export function badgeCSS(status) {
  return { "Solicitado": "solicitado", "Em Execução": "em-execucao", "Concluído": "concluido", "Cancelado": "cancelado" }[status] || "solicitado";
}

export function badgeHTML(status) {
  return `<span class="badge-status ${badgeCSS(status)}"><span class="dot"></span>${esc(status)}</span>`;
}

// Converte Timestamp do Firestore (ou Date) em Date.
export function paraData(ts) {
  if (!ts) return null;
  if (ts.toDate) return ts.toDate();
  return ts instanceof Date ? ts : new Date(ts);
}

export function formatarDataHora(ts) {
  const d = paraData(ts);
  if (!d) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Data do agendamento é guardada como texto "AAAA-MM-DD" (sem fuso horário).
export function formatarDataAgendada(iso, { longo = false } = {}) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "—";
  const [a, m, d] = iso.split("-").map(Number);
  const data = new Date(a, m - 1, d);
  return data.toLocaleDateString("pt-BR", longo
    ? { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
    : { weekday: "short", day: "2-digit", month: "short" });
}

export function descreverAgendamento(ag, opcoes) {
  if (!ag || !ag.data) return "Data a combinar";
  return `${formatarDataAgendada(ag.data, opcoes)} · ${PERIODOS[ag.periodo] || ag.periodo || ""}`;
}

// "AAAA-MM-DD" de uma data local, deslocada em N dias a partir de hoje.
export function isoDaqui(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function ehDomingo(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).getDay() === 0;
}

export function stepperHTML(status) {
  if (status === "Cancelado") return "";
  const idx = ETAPAS.indexOf(status);
  const partes = [];
  ETAPAS.forEach((etapa, i) => {
    const cls = i < idx ? "completo" : i === idx ? "ativo" : "";
    partes.push(`<div class="step ${cls}"><div class="step-circle">${i < idx ? "✓" : i + 1}</div><div class="step-label">${etapa}</div></div>`);
    if (i < ETAPAS.length - 1) partes.push(`<div class="step-line ${i < idx ? "completo" : ""}"></div>`);
  });
  return `<div class="stepper">${partes.join("")}</div>`;
}

export function mostrarToast(msg, erro = false) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
  t.textContent = (erro ? "✗ " : "✓ ") + msg;
  t.className = erro ? "erro" : "";
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 3200);
}

export const LOADING = `<div class="loading-dots"><span></span><span></span><span></span></div>`;

// Menu das páginas da equipe. Admin vê todas as áreas; equipe vê só a agenda.
export function navEquipeHTML(perfil, ativo) {
  const links = perfil === "admin"
    ? [["admin.html", "Solicitações"], ["agenda.html", "Agenda"], ["indicadores.html", "Indicadores"], ["usuarios.html", "Equipe"]]
    : [["agenda.html", "Minha agenda"]];
  return links.map(([href, rotulo]) =>
    `<li><a href="${href}"${href === ativo ? ' class="ativo"' : ""}>${rotulo}</a></li>`).join("");
}

export const ROTULO_PERFIL = Object.freeze({ admin: "Administrador", equipe: "Equipe de campo", cliente: "Cliente" });

// Links úteis para a equipe em campo
export function linkMapa(endereco) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco || "")}`;
}
export function linkWhatsApp(telefone) {
  const n = String(telefone || "").replace(/\D/g, "");
  return n ? `https://wa.me/55${n}` : "";
}
