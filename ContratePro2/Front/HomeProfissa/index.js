var UrList = "http://localhost:3000/user";
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
        prof.querySelector("#telefone").innerHTML += e.telefone;
        prof.querySelector("#cidade").innerHTML += e.cidade;
        prof.querySelector("#des").innerHTML += e.descricao;
        prof.querySelector(".redirect").innerHTML = `<button onclick="redirecionar(${e.id})">Ver Perfil</button>`

        listarProf.appendChild(prof);
    });

}


function redirecionar(id) {

    // console.log(id);
    // Construir a URL com os parâmetros de consulta
    const url = `../teste_perfilCli/pagina_destino.html`;

    localStorage.setItem("user_verificar", JSON.stringify({ "id_user": id.toString() }));
    // Redirecionar para a página de destino
    window.location.href = url;
}

function dados(i) {
    console.log(listar[i]);
    modal1.setAttribute('style', 'display:flex');
    idc.value = listar[i].id;
}

const button = document.querySelector('.enviar-proposta');
const profissionalId = button.dataset.id_profissional;


button.addEventListener('click', () => {
    let id = document.querySelector("#idc").value
    let nome = document.querySelector("#nomec").value
    let proposta = document.querySelector("#propostac").value

    let corpo = {
        "id_profissionais": profissionalId,
        "nome": nome,
        "proposta": proposta
    }

    let options = {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            // "Bearer": JSON.parse(localStorage.getItem('info')).token
        },
        "body": JSON.stringify(corpo)
    };

    fetch('http://localhost:3000/prop', options)
        .then(res => { return res.json() })
        .then(resp => {
            if (resp != undefined) {
                alert("Proposta enviada para o profissional.");
                window.location.reload();
            } else {
                console.log("Parece que aconteceu um erro inesperado. Tente novamente mais tarde.");
            }
        });
});


document.querySelector('#busca').addEventListener('input', search);

function search() {
  const busca = document.querySelector('#busca').value.toLowerCase();
  const perfis = document.querySelectorAll('.profile-body-section');

  perfis.forEach((perfil) => {
    const nome = perfil.querySelector('#nome').textContent.toLowerCase();

    if (busca === '' || nome.includes(busca)) {
      perfil.style.display = 'block';
    } else {
      perfil.style.display = 'none';
    }
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


function sair() {
    window.localStorage.removeItem("info");
    window.location.href = "../LoginProf/index.html";
}