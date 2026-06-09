document.addEventListener('DOMContentLoaded', function () {

    // inicia o slideshow com a legenda da primeira imagem
    document.getElementById('legenda-slide').textContent = imagens[0].legenda;

    // inicia o quiz assim que a página carrega
    iniciarQuiz();

});

// TROCA DE TEMA
// Remove qualquer tema ativo e aplica o novo
// As seções usam variáveis CSS que respondem ao tema do body

function trocarTema(tema) {
    document.body.classList.remove('tema-escuro', 'tema-verde', 'tema-claro');
    document.body.classList.add('tema-' + tema);
}

// SLIDESHOW

// array com as 3 imagens e o texto que aparece embaixo de cada uma
const imagens = [
    { src: '/imagens/Monitoramento-Satelite.png', legenda: 'Monitoramento de queimadas via satélite' },
    { src: '/imagens/Estacao-IoT.png', legenda: 'Estação IoT de campo com sensor DHT22' },
    { src: '/imagens/Alerta.jpeg', legenda: 'Alerta emitido para comunidades rurais' }
];

// guarda qual imagem está aparecendo 
let indiceAtual = 0;

// muda a imagem quando o usuário clica nas setas
// direcao é 1 para avançar e -1 para voltar
function mudarSlide(direcao) {
    indiceAtual = (indiceAtual + direcao + imagens.length) % imagens.length;

    // atualiza a imagem e a legenda
    document.getElementById('imagem-slide').src = imagens[indiceAtual].src;
    document.getElementById('legenda-slide').textContent = imagens[indiceAtual].legenda;
}

// VALIDAÇÃO DO FORMULÁRIO

// validar se o e-mail tem formato correto
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const erro = document.getElementById('erro-form');

    // verifica se algum campo está vazio
    if (nome === '' || email === '' || mensagem === '') {
        erro.textContent = 'Preencha todos os campos antes de enviar.';
        erro.style.display = 'block';
        return;
    }

    // verifica se o e-mail tem formato válido
    if (!regexEmail.test(email)) {
        erro.textContent = 'Digite um e-mail válido (ex: nome@email.com).';
        erro.style.display = 'block';
        return;
    }

    // tudo certo: esconde o erro, avisa o usuário e limpa os campos
    erro.style.display = 'none';
    alert('Mensagem enviada com sucesso! Obrigado pelo contato.');

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensagem').value = '';
}

// QUIZ

// lista com as 10 perguntas, as opções de resposta e qual é a certa
// o número em "correta" é o índice (começa do 0) da resposta correta
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

// reinicia tudo e começa o quiz do zero
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

    // atualiza o contador de perguntas 
    document.getElementById('numero-pergunta').textContent =
        'Pergunta ' + (perguntaAtual + 1) + ' de ' + perguntas.length;

    // atualiza o texto da pergunta
    document.getElementById('texto-pergunta').textContent = p.pergunta;

    // troca de botões
    const container = document.getElementById('opcoes-container');
    container.innerHTML = '';

    p.opcoes.forEach(function (opcao, index) {
        const btn = document.createElement('button');
        btn.textContent = opcao;
        btn.className = 'btn-opcao';
        btn.setAttribute('aria-label', 'Opção: ' + opcao);
        btn.onclick = function () {
            verificarResposta(index, btn, p.correta);
        };
        container.appendChild(btn);
    });

    document.getElementById('btn-proximo').style.display = 'none';
}

// verificação da resposta
function verificarResposta(indice, botaoClicado, correta) {
    if (respondeu) return;
    respondeu = true;

    // pega todos os botões de opção para poder marcar o correto
    const botoes = document.querySelectorAll('.btn-opcao');

    if (indice === correta) {
        // acertou: verde no botão clicado
        botaoClicado.style.backgroundColor = '#265C00';
        botaoClicado.style.color = '#FFFFFD';
        botaoClicado.style.borderColor = '#265C00';
        pontuacao++;
    } else {
        // errou: vermelho no clicado + verde na resposta certa
        botaoClicado.style.backgroundColor = '#E63946';
        botaoClicado.style.color = '#FFFFFD';
        botaoClicado.style.borderColor = '#E63946';

        // marca o botão correto de verde para o usuário aprender
        botoes[correta].style.backgroundColor = '#265C00';
        botoes[correta].style.color = '#FFFFFD';
        botoes[correta].style.borderColor = '#265C00';
    }

    // desabilita todos os botões para não deixar clicar de novo
    botoes.forEach(function (btn) {
        btn.disabled = true;
        btn.style.cursor = 'default';
    });

    document.getElementById('btn-proximo').style.display = 'block';
}

// Próxima pergunta
function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual >= perguntas.length) {
        mostrarResultado();
    } else {
        mostrarPergunta();
    }
}

// Mostrar Resultado
function mostrarResultado() {
    document.getElementById('pergunta-container').style.display = 'none';
    document.getElementById('btn-proximo').style.display = 'none';
    document.getElementById('resultado-quiz').style.display = 'block';
    document.getElementById('texto-resultado').textContent =
        'Você acertou ' + pontuacao + ' de ' + perguntas.length + ' perguntas!';
}

// Reiniciar Quiz
function reiniciarQuiz() {
    iniciarQuiz();
}