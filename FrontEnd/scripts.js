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