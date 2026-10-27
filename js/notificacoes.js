// ─────────────────────────────────────────────────────────────────────────────
// Verde Vivo — notificações por e-mail (EmailJS)
//
// O EmailJS envia e-mails direto do navegador, sem servidor próprio — por isso
// funciona no plano gratuito do Firebase (que não permite Cloud Functions).
// As três chaves abaixo são públicas por natureza (o EmailJS foi feito para isso).
//
// Enquanto as chaves não forem preenchidas, o sistema funciona normalmente e
// apenas não envia e-mails (registra um aviso no console).
// ─────────────────────────────────────────────────────────────────────────────
export const EMAILJS = {
  serviceId: "service_kjulgyj",
  templateId: "template_7ak77hj",
  publicKey: "6gbXKJzPIOA78fMhR"
};

export function notificacoesAtivas() {
  return Object.values(EMAILJS).every(v => v && !v.startsWith("COLE_AQUI"));
}

// Endereço público da página de detalhe (funciona no GitHub Pages e localmente).
export function linkSolicitacao(id) {
  const base = location.href.replace(/[^/]*([?#].*)?$/, "");
  return `${base}solicitacao.html?id=${encodeURIComponent(id)}`;
}

// Textos de cada evento — usados no assunto e no corpo do e-mail.
export function textoNotificacao(evento, dados = {}) {
  const textos = {
    "Solicitado": {
      assunto: `Recebemos sua solicitação ${dados.protocolo || ""}`.trim(),
      mensagem: `Recebemos seu pedido de ${dados.tipoServico || "serviço"}. Visita solicitada para ${dados.visita || "data a combinar"}. A equipe vai confirmar o horário e avisaremos você a cada etapa.`
    },
    "Em Execução": {
      assunto: "Seu atendimento começou",
      mensagem: `A equipe iniciou o atendimento da sua solicitação de ${dados.tipoServico || "serviço"}.`
    },
    "Concluído": {
      assunto: "Seu serviço foi concluído",
      mensagem: `O serviço de ${dados.tipoServico || "paisagismo"} foi concluído. Obrigado por escolher a Verde Vivo! Pelo link abaixo você pode avaliar o atendimento.`
    },
    "Cancelado": {
      assunto: "Sua solicitação foi cancelada",
      mensagem: "Sua solicitação foi cancelada. Se tiver alguma dúvida, responda este e-mail ou fale com a empresa."
    },
    "visita-confirmada": {
      assunto: "Visita técnica confirmada",
      mensagem: `Sua visita técnica foi confirmada para ${dados.visita || "a data combinada"}.`
    }
  };
  return textos[evento] || { assunto: "Atualização da sua solicitação", mensagem: `O status da sua solicitação mudou para ${evento}.` };
}

// Envia o e-mail. Retorna true se enviou, false se não (sem lançar erro:
// uma falha no e-mail nunca deve impedir a atualização da solicitação).
export async function enviarNotificacao({ email, nome, evento, protocolo, status, id, dados }) {
  if (!email) return false;
  if (!notificacoesAtivas()) {
    console.info("[notificações] EmailJS ainda não configurado — e-mail não enviado:", evento, email);
    return false;
  }
  const { assunto, mensagem } = textoNotificacao(evento, dados);
  try {
    const resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId,
        template_id: EMAILJS.templateId,
        user_id: EMAILJS.publicKey,
        template_params: {
          to_email: email,
          to_name: nome || "cliente",
          assunto,
          mensagem,
          protocolo: protocolo || "",
          status: status || "",
          link: id ? linkSolicitacao(id) + (evento === "Concluído" ? "#avaliacao" : "") : ""
        }
      })
    });
    if (!resp.ok) console.warn("[notificações] EmailJS respondeu", resp.status, await resp.text());
    return resp.ok;
  } catch (err) {
    console.warn("[notificações] Falha ao enviar e-mail", err);
    return false;
  }
}
