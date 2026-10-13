// ─────────────────────────────────────────────────────────────────────────────
// Verde Vivo — inicialização única do Firebase
// Todas as páginas importam app, auth e db daqui, em vez de repetir a config.
// ─────────────────────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// A configuração web do Firebase é pública por natureza: quem protege os dados
// são as regras do Firestore (arquivo firestore.rules), não o sigilo destas chaves.
export const firebaseConfig = {
  apiKey: "AIzaSyDpK1BJ1aB_o9Fl0peN0qalmrvqfZaz0zc",
  authDomain: "verde-vivo-e6afd.firebaseapp.com",
  projectId: "verde-vivo-e6afd",
  storageBucket: "verde-vivo-e6afd.firebasestorage.app",
  messagingSenderId: "1045427152542",
  appId: "1:1045427152542:web:153a3d5f38d25cecd73d8f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
