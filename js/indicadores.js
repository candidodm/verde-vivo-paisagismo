// ─────────────────────────────────────────────────────────────────────────────
// Verde Vivo — cálculo dos indicadores de gestão
// Funções puras (sem acesso ao banco): recebem as listas já carregadas.
// ─────────────────────────────────────────────────────────────────────────────
const DIA_MS = 24 * 60 * 60 * 1000;
const STATUS = ["Solicitado", "Em Execução", "Concluído", "Cancelado"];
const ABERTOS = ["Solicitado", "Em Execução"];

function data(ts) {
  if (!ts) return null;
  if (ts.toDate) return ts.toDate();
  if (ts instanceof Date) return ts;
  const d = new Date(ts);
  return isNaN(d) ? null : d;
}

function inicioDaSemana(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diaSemana = (x.getDay() + 6) % 7; // segunda = 0
  x.setDate(x.getDate() - diaSemana);
  return x;
}

export function calcularIndicadores(solicitacoes, avaliacoes, dias = 30, agora = new Date()) {
  const desde = dias ? new Date(agora.getTime() - dias * DIA_MS) : null;
  const noPeriodo = (ts) => {
    if (!desde) return true;
    const d = data(ts);
    return d ? d >= desde : false;
  };

  const doPeriodo = solicitacoes.filter(s => noPeriodo(s.criadoEm));
  const abertas = solicitacoes.filter(s => ABERTOS.includes(s.status));

  // Tempo médio: do pedido à conclusão, para as concluídas no período
  const concluidas = solicitacoes.filter(s => s.status === "Concluído" && data(s.concluidoEm) && noPeriodo(s.concluidoEm));
  const duracoes = concluidas
    .map(s => (data(s.concluidoEm) - data(s.criadoEm)) / DIA_MS)
    .filter(n => Number.isFinite(n) && n >= 0);
  const tempoMedioDias = duracoes.length ? duracoes.reduce((a, b) => a + b, 0) / duracoes.length : null;

  // Por status (ordem fixa) e por tipo (mais pedidos primeiro; excedentes viram "Outros")
  const porStatus = STATUS.map(st => [st, doPeriodo.filter(s => s.status === st).length]);
  const contagemTipo = {};
  doPeriodo.forEach(s => { const t = s.tipoServico || "Não informado"; contagemTipo[t] = (contagemTipo[t] || 0) + 1; });
  let porTipo = Object.entries(contagemTipo).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (porTipo.length > 6) {
    const outros = porTipo.slice(5).reduce((soma, [, v]) => soma + v, 0);
    porTipo = [...porTipo.slice(0, 5), ["Outros", outros]];
  }

  // Últimas 8 semanas (segunda a domingo), independente do filtro de período
  const semanaAtual = inicioDaSemana(agora);
  const porSemana = [];
  for (let i = 7; i >= 0; i--) {
    const ini = new Date(semanaAtual); ini.setDate(ini.getDate() - i * 7);
    const fim = new Date(ini); fim.setDate(fim.getDate() + 7);
    const total = solicitacoes.filter(s => { const d = data(s.criadoEm); return d && d >= ini && d < fim; }).length;
    porSemana.push({ rotulo: `${String(ini.getDate()).padStart(2, "0")}/${String(ini.getMonth() + 1).padStart(2, "0")}`, total });
  }

  // Avaliações do período
  const avs = avaliacoes.filter(a => noPeriodo(a.criadoEm) && Number.isInteger(a.nota));
  const notaMedia = avs.length ? avs.reduce((s, a) => s + a.nota, 0) / avs.length : null;
  const ultimasAvaliacoes = [...avs].sort((a, b) => (data(b.criadoEm)?.getTime() || 0) - (data(a.criadoEm)?.getTime() || 0)).slice(0, 5);

  return {
    desde,
    total: doPeriodo.length,
    emAberto: abertas.length,
    concluidas: concluidas.length,
    tempoMedioDias,
    porStatus,
    porTipo,
    porSemana,
    aConfirmar: abertas.filter(s => s.agendamento && !s.agendamento.confirmado).length,
    semResponsavel: abertas.filter(s => !s.responsavelId).length,
    notaMedia,
    qtdAvaliacoes: avs.length,
    ultimasAvaliacoes
  };
}
