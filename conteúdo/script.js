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

//função para verificar se o usuario preencheu todos os  dados//
function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
const erro = document.getElementById('erro-form');
}

//Validação e mensagem de erro//
if (nome === "" || email === "" || mensagem === "") {
    erro.style.display = 'block';
    return;
}

//se tudo estiver preenchido//
erro.style.display = 'none';
alert("Mensagem enviada com sucesso! Obrigado pelo contato.");

//Limpa os campos depois do envio//
document.getElementById('nome').value = '';
document.getElementById('email').value = '';
document.getElementById('mensagem').value = '';

const perguntas = [
    {
        pergunta: 'Quantos hectares foram queimados na Amazônia em 2024?',
        opcoes: ['5 milhões', '17 milhões', '30 milhões', '10 milhões'],
        correta: 1
    },
    {
        pergunta: 'Qual satélite fornece o índice de seca usado pelo FireWatch?',
        opcoes: ['Hubble', 'Copernicus', 'James Webb', 'GPS'],
        correta: 1
    },
    {
        pergunta: 'O que significa a sigla LoRa?',
        opcoes: ['Low Range', 'Long Range', 'Local Radio', 'Light Range'],
        correta: 1
    },
    {
        pergunta: 'Qual é a principal limitação dos satélites de monitoramento atuais?',
        opcoes: ['Custo alto', 'Latência orbital', 'Falta de cobertura', 'Consumo de energia'],
        correta: 1
    },
    {
        pergunta: 'O que é Edge Computing?',
        opcoes: [
            'Computação na nuvem',
            'Processamento local sem depender de internet',
            'Rede de satélites',
            'Sistema de GPS avançado'
        ],
        correta: 1
    },
    {
        pergunta: 'Qual sensor mede temperatura e umidade na estação local do FireWatch?',
        opcoes: ['TMP36', 'DHT22', 'LM35', 'DS18B20'],
        correta: 1
    },
    {
        pergunta: 'Qual tecnologia conecta regiões sem internet via satélite no FireWatch?',
        opcoes: ['Wi-Fi', 'Bluetooth', 'Starlink', 'Zigbee'],
        correta: 2
    },
    {
        pergunta: 'Em quantos níveis o FireWatch classifica o risco de queimada?',
        opcoes: ['2 níveis', '3 níveis', '4 níveis', '5 níveis'],
        correta: 1
    },
    {
        pergunta: 'Qual foi o prejuízo das queimadas para pequenos produtores em 2024?',
        opcoes: ['R$ 500 milhões', 'R$ 1,1 bilhão', 'R$ 2 bilhões', 'R$ 800 milhões'],
        correta: 1
    },
    {
        pergunta: 'Qual porcentagem das áreas rurais amazônicas não tem internet móvel?',
        opcoes: ['50%', '75%', '94%', '60%'],
        correta: 2
    }
];

// variáveis que controlam o estado do quiz
let perguntaAtual = 0; // qual pergunta está aparecendo agora
let pontuacao = 0;     // quantas o usuário acertou
let respondeu = false; // evita clicar duas vezes na mesma pergunta

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    respondeu = false;
    document.getElementById('resultado-quiz').style.display = 'none';
    document.getElementById('pergunta-container').style.display = 'block';
    document.getElementById('btn-proximo').style.display = 'none';
    mostrarPergunta();
}

// mostra a pergunta atual na tela e cria os botões de resposta
function mostrarPergunta() {
    respondeu = false;
    const p = perguntas[perguntaAtual];

    // atualiza o contador de perguntas ex: "Pergunta 1 de 10"
    document.getElementById('numero-pergunta').textContent =
        'Pergunta ' + (perguntaAtual + 1) + ' de ' + perguntas.length;

    // atualiza o texto da pergunta
    document.getElementById('texto-pergunta').textContent = p.pergunta;

    // apaga os botões da pergunta anterior
    const container = document.getElementById('opcoes-container');
    container.innerHTML = '';

    // cria um botão para cada opção de resposta
    p.opcoes.forEach(function(opcao, index) {
        const btn = document.createElement('button');
        btn.textContent = opcao;
        btn.className = 'btn-opcao';
        btn.onclick = function() {
            verificarResposta(index, btn, p.correta);
        };
        container.appendChild(btn);
    });

    document.getElementById('btn-proximo').style.display = 'none';
}

function verificarResposta(indice, botaoClicado, correta) {
    // se já respondeu não deixa clicar de novo
    if (respondeu) return;
    respondeu = true;

    // verde se acertou, vermelho se errou
    if (indice === correta) {
        botaoClicado.style.backgroundColor = '#265C00';
        botaoClicado.style.color = '#FFFFFD';
        pontuacao++;
    } else {
        botaoClicado.style.backgroundColor = '#E63946';
        botaoClicado.style.color = '#FFFFFD';
    }

    // mostra o botão de próxima pergunta
    document.getElementById('btn-proximo').style.display = 'block';
}

function proximaPergunta(){
    perguntaAtual++;

    if (perguntaAtual >= perguntas.lenght) {
        mostrarResultado();

    } else {
        mostrarPergunta();
    }


}

function mostrarResultado(){
    document.getElementById('pergunta-container').style.display = 'none';
    document.getElementById('btn-proximo').style.display = 'none';
    document.getElementById('resultado-quiz').style.display = 'block';
    document.getElementById('texto-resultado').textContent = 'Você acertou' + pontuacao + 'de' + perguntas.lenght + 'perguntas!';

}

function reiniciarQuiz(){
    iniciarQuiz();


}

iniciarQuiz();













