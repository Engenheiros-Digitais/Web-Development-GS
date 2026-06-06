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

// array com as 3 imagens e o texto que aparece embaixo de cada uma
const imagens = [
    { src: 'Imagens/slide1.jpg', legenda: 'Monitoramento de queimadas via satélite' },
    { src: 'Imagens/slide2.jpg', legenda: 'Estação IoT de campo com sensor DHT22' },
    { src: 'Imagens/slide3.jpg', legenda: 'Alerta emitido para comunidades rurais' }
];

// guarda qual imagem está aparecendo agora
let indiceAtual = 0;

// essa função muda a imagem quando o usuário clica nas setas
function mudarSlide(direcao) {
    indiceAtual += direcao;

    if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }

    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1;
    }

    document.getElementById('imagem-slide').src = imagens[indiceAtual].src;
    document.getElementById('legenda-slide').textContent = imagens[indiceAtual].legenda;
}

// coloca a legenda da primeira imagem quando a página abre
document.getElementById('legenda-slide').textContent = imagens[0].legenda;

















