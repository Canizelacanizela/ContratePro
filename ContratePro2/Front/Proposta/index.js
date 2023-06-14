var UrList = "http://localhost:3000/prop";
var listarProp = document.querySelector(".profileTwo");
var busca = document.querySelector("#search");
var itemSec = document.querySelector(".profile-body-section");
const imguser = document.querySelector("#perfil");

var info = JSON.parse(localStorage.getItem("info"));

imguser.src = "../assets/" + info.imagem;



function carregar() {
    const options = {
        method: "GET"
    }
    fetch(UrList, options)
        .then(res => res.json())
        .then(res => {
            listaPropostas(res);
        })
        .catch(err => console.error(err));
}

function listaPropostas(propostas) {
    propostas.forEach((e, i) => {
        let prop = document.querySelector(".profile-body-section").cloneNode(true);
        prop.classList.remove("model");


        prop.querySelector("#id").innerHTML += e.id_cli.id;
        prop.querySelector("#imagem").src = "../assets/" + e.id_cli.imagem;
        prop.querySelector("#nome").innerHTML += e.id_cli.nome;
        prop.querySelector("#proposta").innerHTML += e.proposta;
        prop.querySelector(".redirect").innerHTML = `<button onclick="redirecionar(${e.id})">Ver Perfil</button>`

        listarProp.appendChild(prop);
    });

}

function aplicarFiltro(filtro) {
    const dados = document.querySelectorAll(".profile-header");
    dados.forEach(e => {
        const cidade = e.querySelector("#cidade").innerHTML;
        if (cidade !== filtro) {
            e.parentNode.style.display = "none";
        } else {
            e.parentNode.style.display = "block";
        }
    });
    if (filtro == "Todas") window.location.reload();
}



function redirecionar(id) {

    // console.log(id);
    // Construir a URL com os parâmetros de consulta
    const url = `../teste_perfilCli/pagina_destino.html`;

    localStorage.setItem("user_Cliente", JSON.stringify({ "id_user": id.toString() }));
    // Redirecionar para a página de destino
    window.location.href = url;
}



function alerta(a) {
    document.querySelector('#modal2').setAttribute('style', 'display:flex;');
    document.querySelector('#alerta').setAttribute('style', 'display:flex;');
    document.querySelector('#msg').innerHTML = a;
}

function sair() {
    window.localStorage.removeItem("info");
    window.location.href = "../HomeTeste/index.html";
}