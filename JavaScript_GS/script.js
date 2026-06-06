// ============================================================
// FIREWATCH — script.js
// Web Development — Global Solution 2026 — FIAP
// ============================================================

// essa função troca a cor de fundo da página
// primeiro remove qualquer tema que já estava ativo
// depois coloca o novo tema que o usuário escolheu
function trocarTema(tema) {
    document.body.classList.remove('tema-escuro', 'tema-verde', 'tema-claro');
    document.body.classList.add('tema-' + tema);
}

















