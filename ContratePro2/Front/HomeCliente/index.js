var UrList = "http://localhost:3000/prof";
var listarProf = document.querySelector(".profileTwo");
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
            listaProfissionais(res);
        })
        .catch(err => console.error(err));
}

function listaProfissionais(profissionais) {
    profissionais.forEach((e, i) => {
        let prof = document.querySelector(".profile-body-section").cloneNode(true);
        prof.classList.remove("model");


        prof.querySelector("#id").innerHTML += e.id;
        prof.querySelector("#imagem").src = "../assets/" + e.imagem;
        prof.querySelector("#nome").innerHTML += e.nome;
        prof.querySelector("#cidade").innerHTML += e.cidade;
        prof.querySelector("#biografia").innerHTML += e.biografia;
        prof.querySelector("#nome_categoria").innerHTML += e.categoria.nome_categoria;
        prof.querySelector(".redirect").innerHTML = `<button onclick="redirecionar(${e.id})">Ver Perfil</button>`
        prof.querySelector("#edit").setAttribute("onclick", `modalProposta(${e.id})`);
        prof.querySelector("#porhora").innerHTML += e.porhora;

        listarProf.appendChild(prof);
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
    const url = `../teste_perfil/pagina_destino.html`;

    localStorage.setItem("user_profissional", JSON.stringify({ "id_user": id.toString() }));
    // Redirecionar para a página de destino
    window.location.href = url;
}



function modalProposta(id_profissional) {
    modal1.setAttribute('style', 'display:flex')

    //Falta arrumar a proposta, pegar o id do proffisional  como esse exemplo aqui <button onclick="abremodaldaProposta(${e.id})""> ai pega e coloca como e.id ou id mesmo 
    //e nao colocar como id_profissional...Não precisa de nome porque o id já pega ele com todo o resto das informações!
    const button = document.querySelector('.enviar-proposta');
    button.addEventListener('click', () => {
        let proposta = document.querySelector("#propostac").value
        let corpo = {
            "proposta": proposta,
            "id_cliente": Number(info.id),
            "id_profissional": Number(id_profissional),
        }

        let options = {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify(corpo)
        };
        console.log(options);
        fetch('http://localhost:3000/propcriar', options)
            .then(res => { return res.json() })
            .then(resp => {
                if (resp !== undefined) {
                    alert("Proposta enviada para o profissional.");
                    window.location.reload();
                } else {
                    alert("Parece que aconteceu um erro inesperado. Tente novamente mais tarde.");
                    window.location.reload();
                }
            });
    });

}



function alerta(a) {
    document.querySelector('#modal2').setAttribute('style', 'display:flex;');
    document.querySelector('#alerta').setAttribute('style', 'display:flex;');
    document.querySelector('#msg').innerHTML = a;
}

// function search() {
//     const Categorias = document.querySelectorAll('#nome_categoria');

//     Categorias.forEach((name) => {
//         if (!name.parentNode.className.includes("model")) name.parentNode.style.display = 'block';

//         if (!name.innerHTML.toLowerCase().includes(busca.value.toLowerCase())) {
//             name.parentNode.style.display = 'none';
//         }
//     });
// }

function search() {
    const busca = document.querySelector('#busca').value.toLowerCase();
    const perfis = document.querySelectorAll('.profile-body-section');

    perfis.forEach((perfil) => {
        const nome = perfil.querySelector('#nome').textContent.toLowerCase();


        if (nome.includes(busca)) {
            perfil.style.display = 'block';
        } else {
            perfil.style.display = 'none';
        }
    });
}

function sair() {
    window.localStorage.removeItem("info");
    window.location.href = "../LoginCliente/index.html";
}