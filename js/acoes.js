// ─────────────────────────────────────────────────────────────────────────────
// Verde Vivo — ações da equipe sobre uma solicitação
// Cada ação grava, num único lote: a solicitação, a entrada na linha do tempo
// e (quando muda o status) o espelho público usado na consulta por protocolo.
// Depois envia a notificação ao cliente e marca a entrada como "notificado".
// ─────────────────────────────────────────────────────────────────────────────
import { db } from "./firebase.js";
import { collection, doc, writeBatch, updateDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { enviarNotificacao } from "./notificacoes.js";
import { descreverAgendamento } from "./ui.js";

function novaEntrada(id) {
  return doc(collection(db, "solicitacoes", id, "historico"));
}

async function notificarEMarcar(refEntrada, s, evento, status, dados) {
  const ok = await enviarNotificacao({
    email: s.email, nome: s.nome, evento, protocolo: s.protocolo, status, id: s.id, dados
  });
  if (ok) {
    try { await updateDoc(refEntrada, { notificado: true }); }
    catch (e) { console.warn("Não foi possível marcar como notificado", e); }
  }
  return ok;
}

// Muda o status (Solicitado → Em Execução → Concluído, ou Cancelado).
export async function mudarStatus(sessao, s, novoStatus, observacao = "") {
  if (s.status === novoStatus) return { alterado: false };
  const mudancas = { status: novoStatus, atualizadoEm: serverTimestamp() };
  if (novoStatus === "Em Execução" && !s.iniciadoEm) mudancas.iniciadoEm = serverTimestamp();
  if (novoStatus === "Concluído") mudancas.concluidoEm = serverTimestamp();

  const refEntrada = novaEntrada(s.id);
  const lote = writeBatch(db);
  lote.update(doc(db, "solicitacoes", s.id), mudancas);
  lote.set(refEntrada, {
    tipo: "status",
    statusAnterior: s.status || null,
    statusNovo: novoStatus,
    alteradoPor: sessao.user.uid,
    alteradoPorNome: sessao.perfil.nome || sessao.perfil.email,
    dataHora: serverTimestamp(),
    observacao: observacao.trim(),
    notificado: false
  });
  if (s.protocolo) {
    lote.set(doc(db, "acompanhamento", s.protocolo), {
      protocolo: s.protocolo,
      status: novoStatus,
      tipoServico: s.tipoServico || "",
      criadoEm: s.criadoEm || serverTimestamp(),
      atualizadoEm: serverTimestamp()
    }, { merge: true });
  }
  await lote.commit();
  const notificado = await notificarEMarcar(refEntrada, s, novoStatus, novoStatus, { tipoServico: s.tipoServico });
  return { alterado: true, notificado };
}

// Confirma (e opcionalmente remarca) a data e o período da visita.
export async function confirmarVisita(sessao, s, data, periodo) {
  const agendamento = { data, periodo, confirmado: true };
  const visita = descreverAgendamento(agendamento, { longo: true });
  const remarcada = s.agendamento && (s.agendamento.data !== data || s.agendamento.periodo !== periodo);

  const refEntrada = novaEntrada(s.id);
  const lote = writeBatch(db);
  lote.update(doc(db, "solicitacoes", s.id), { agendamento, atualizadoEm: serverTimestamp() });
  lote.set(refEntrada, {
    tipo: "agenda",
    titulo: remarcada ? "Visita remarcada e confirmada" : "Visita confirmada",
    statusAnterior: s.status || null,
    statusNovo: s.status || "Solicitado",
    alteradoPor: sessao.user.uid,
    alteradoPorNome: sessao.perfil.nome || sessao.perfil.email,
    dataHora: serverTimestamp(),
    observacao: visita,
    notificado: false
  });
  await lote.commit();
  const notificado = await notificarEMarcar(refEntrada, s, "visita-confirmada", s.status, { visita });
  return { agendamento, notificado };
}

// Define o membro da equipe responsável pelo atendimento (somente admin).
export async function atribuirResponsavel(sessao, s, membro) {
  const lote = writeBatch(db);
  lote.update(doc(db, "solicitacoes", s.id), {
    responsavelId: membro ? membro.uid : null,
    responsavelNome: membro ? (membro.nome || membro.email) : null,
    atualizadoEm: serverTimestamp()
  });
  lote.set(novaEntrada(s.id), {
    tipo: "atribuicao",
    titulo: membro ? `Atendimento atribuído a ${membro.nome || membro.email}` : "Responsável removido",
    statusAnterior: s.status || null,
    statusNovo: s.status || "Solicitado",
    alteradoPor: sessao.user.uid,
    alteradoPorNome: sessao.perfil.nome || sessao.perfil.email,
    dataHora: serverTimestamp(),
    observacao: "",
    notificado: false
  });
  await lote.commit();
}
