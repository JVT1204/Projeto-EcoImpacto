function inicio() {
    window.location.href = "index.html";
}
function minigames() {
    window.location.href = "minigames.html";
}
function quiz() {
    window.location.href = "quiz.html";
}
function saibamais() {
    window.location.href = "saibamais.html";
}
function abrirquiz() {
    fecharquiz();
    var novoDiv = document.createElement("div");
    var novoBotao = document.createElement("div");
    novoDiv.className = "quizContainer";
    novoBotao.className = "quizBotao";
    novoBotao.innerHTML = "<button onclick=\"fecharquiz()\">X</button>";

    fetch('conteudoQuiz.html')
        .then(response => response.text())
        .then(data => { 
            novoDiv.innerHTML = data;
            document.body.appendChild(novoDiv);
            document.body.appendChild(novoBotao);
        })
        .catch(error);

    document.body.appendChild(novoDiv);
    document.body.appendChild(novoBotao);
}
function fecharquiz() {
    var divQuiz = document.querySelectorAll(".quizContainer, .quizBotao");
    divQuiz.forEach(function(element){
        element.remove();
    });
}
var arrayDeLixos = []; //evitar buscar por elementos em classe sempre (aka cache)
var fim = false;
var pontuacao = 0;
var intervaloCriarLixoID;
var intervaloMoverLixoID;
function abrirjogo() {
    fecharjogo();
    pontuacao = 0;
    fim = false;
    arrayDeLixos = []
    var novoDiv = document.createElement("div");
    var novoBotao = document.createElement("div");
    novoDiv.className = "jogoContainer";
    novoBotao.className = "quizBotao jogoBotao";
    novoBotao.innerHTML = "<button onclick=\"fecharjogo()\">X</button>";

   /* fetch('conteudoJogo.html') //inutil
        .then(response => response.text())
        .then(data => { 
            novoDiv.innerHTML = data;
            document.body.appendChild(novoDiv);
            document.body.appendChild(novoBotao);
        })
        .catch(error);
    */

    document.body.appendChild(novoDiv);
    document.body.appendChild(novoBotao);
    logicajogo();
}
function fecharjogo() {
    var divQuiz = document.querySelectorAll(".jogoContainer, .quizBotao, .lixeira, .lixo, .pontos");
    divQuiz.forEach(function(element){
        element.remove();
    });
    fim = true;
    clearInterval(intervaloCriarLixoID);
    clearInterval(intervaloMoverLixoID);
}
function logicajogo() {
    
    //divs aparecem aleatoriamente em Y fixo num X limitado pelo tamanho do div, aparece um div com imagem de lata de lixo abaixo
    //esses divs acima tem imagens de lixo
    var lixeiraDiv = document.createElement("div");
    lixeiraDiv.className = "lixeira";
    document.body.appendChild(lixeiraDiv);

    var pontosDiv = document.createElement("div");
    pontosDiv.innerHTML = "<h2>Pontuação: 0</h2>";
    pontosDiv.className = "pontos";
    document.body.appendChild(pontosDiv);

    criarLixo(6, 3000, lixeiraDiv, pontosDiv);
    moverLixeira();
    //os divs de lixo se movem para baixo
    //o div de lixeira é movido com o mouse ao segurar ele até os máximos do div container

    //se um div chegar na parte mais baixa do div (encostar no fim do div) o jogo acaba (funções são pausadas)
    //se clicarem no div (quando acaba) o jogo reinicia
    //ao reiniciar todos divs são deletados e a função recomeça
    //caso o div colida com o div com imagem de lixeira, esse div de lixo é deletado e pontos são adicionados
    //os pontos são mostrados no canto superior esquerdo

    //todos são deletados ao fechar o jogo
}
function criarLixo(quantidadeLixos, intervalo, lixeiraDiv, pontosDiv) {
    var contador = 0;
    var inicio = false;
    intervaloCriarLixoID = setInterval(function() {
        if (arrayDeLixos.length < quantidadeLixos && !fim) {
            if (arrayDeLixos.length == 0) {
                inicio = false;
            }
            var lixoDiv = document.createElement("div");
            lixoDiv.className = "lixo";
            lixoDiv.style.top = "30%";
            let max = 38;
            let min = 60;
            let posicaoAleatoria = Math.random() * (max - min) + min;
            lixoDiv.style.left = posicaoAleatoria + "%";
            arrayDeLixos.push(lixoDiv);
            document.body.appendChild(lixoDiv);
            contador += 1;
            if (!inicio) {
                moverLixo(20, lixeiraDiv, pontosDiv);
                inicio = true;
            }
        } else if (fim) {
            clearInterval(intervaloCriarLixoID);
        }
    }, intervalo);
}
function moverLixo(intervalo, lixeiraDiv, pontosDiv) {
    var intervaloMoverLixoID = setInterval(function() {
        if (arrayDeLixos.length > 0 && !fim) {
            for (var i = 0; i < arrayDeLixos.length; i++) {
                if (arrayDeLixos[i] && arrayDeLixos[i].style.top) {

                    var topAtual = parseFloat(arrayDeLixos[i].style.top);
                    var novoTop = topAtual + topAtual * 0.01;
                    arrayDeLixos[i].style.top = novoTop + "%";

                    if (parseFloat(arrayDeLixos[i].style.top) >= 85) {
                        var textoFim = document.createElement("div");
                        textoFim.innerHTML = "<h1>Você Perdeu</h1>";
                        textoFim.className = "pontos fim";
                        document.body.appendChild(textoFim);
                        fim = true;
                    } else if (checarColisao(arrayDeLixos[i], lixeiraDiv)) {
                        document.body.removeChild(arrayDeLixos[i]);
                        arrayDeLixos.splice(i, 1);
                        i--;
                        pontuacao += 1;
                        pontosDiv.innerHTML = `<h2>Pontuação: ${pontuacao}</h2>`;
                    }
                }
            }
        } else {
            clearInterval(intervaloMoverLixoID);
        }
    }, intervalo);
}
function checarColisao(div1, div2) {
    //obter as propriedades de posicao e tamanho do div
    var rect1 = div1.getBoundingClientRect();
    var rect2 = div2.getBoundingClientRect();
    //verifica colisoes
    var colidindo = !(rect1.right < rect2.left || 
                      rect1.left > rect2.right || 
                      rect1.bottom < rect2.top || 
                      rect1.top > rect2.bottom );
    return colidindo;
}
function moverLixeira() {

}