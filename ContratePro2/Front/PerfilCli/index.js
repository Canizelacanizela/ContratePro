var listarProf = document.querySelector(".profile");
var listarComent = document.querySelector(".footer");
var editar = document.querySelector(".editar");
var alterar = document.querySelector("#alterar");
var perfil = {};

var listar = [];
// const idPerfil = new URLSearchParams(window.location.search).get("id");


function listInfo() {
  const options = { method: "GET" };

  let info = JSON.parse(window.localStorage.getItem("info"));

  fetch("http://localhost:3000/user", options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Erro ao obter informações do servidor.");
      }
    })
    .then((profiles) => {
      profiles.forEach((profile) => {
        if (profile.id === info.id) {
          // Atualizar as informações do objeto info com os dados do perfil atual
          info.nome = profile.nome;
          info.imagem = profile.imagem;
          info.telefone = profile.telefone;
          info.email = profile.email;
          info.cidade = profile.cidade;
        }
      });

      // Atualizar o valor do localStorage com as informações atualizadas
      window.localStorage.setItem("info", JSON.stringify(info));

      // Exibir as informações atualizadas
      document.querySelector("#nome").innerHTML = info.nome;
      document.querySelector("#imagem").src = "../assets/" + info.imagem;
      document.querySelector("#tel").innerHTML = info.telefone;
      document.querySelector("#email").innerHTML = info.email;
      document.querySelector("#city").innerHTML = info.cidade;
    })
    .catch((error) => {
      console.log("Ocorreu um erro:", error);
    });
}
//Lá em cima no .then((profiles)),estamos percorrendo cada perfil (profile) obtido no fetch, usando
//o método forEach. Para cada perfil, verificamos se o id do perfil é igual ao id obtido da variável info.
//Se o id for correspondente, significa que encontramos o perfil correto. Então, usamos as seletores
// do documento (querySelector) para encontrar os elementos HTML desejados
// e atualizar seu conteúdo usando a propriedade innerHTML. Os valores dos campos, como nome,
//porhora, telefone, email, cidade, categoria e biografia, são extraídos do perfil e inseridos nos elementos HTML correspondentes.
//Essa lógica permite preencher os campos do HTML com as informações corretas do perfil específico que foi encontrado pelo id correspondente.

// // Fechar modal ao clicar no botão de fechar
document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("myModalEdit").style.display = "none";
  });

function fechar() {
  document.getElementById("myModalEdit").style.display = "none";
}

function openModal() {
  var user = JSON.parse(localStorage.getItem("info"));

  //function para abrir modal
  const mCadas = document.getElementById("myModalEdit");
  document.getElementById("myModalEdit").style.display = "block";
  alterar.onclick = () => {
    alteracao();
  };
  //preencher os campos
  document.querySelector("#m_id").value = user.id;
  document.querySelector("#m_nome").value = user.nome;
  document.querySelector("#m_email").value = user.email;
  document.querySelector("#m_imagem").value =  user.imagem;
  document.querySelector("#m_cidade").value = user.cidade;
  document.querySelector("#m_telefone").value = user.telefone;
}

function alteracao() {
  //pegar a function do lado de fora
  var id = document.querySelector("#m_id").value;

  let corpo = {
    id: Number(id),
    nome: document.querySelector("#m_nome").value,
    email: document.querySelector("#m_email").value,
    imagem: document.querySelector("#m_imagem").value,
    cidade: document.querySelector("#m_cidade").value,
    telefone: document.querySelector("#m_telefone").value,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Bearer: JSON.parse(localStorage.getItem("info")).token,
    },
    body: JSON.stringify(corpo),
  };
  console.log(corpo);

  fetch("http://localhost:3000/userupdate/" + id, options)
    .then((res) => {
      if (res.status == 202) {
        window.location.reload();
      } else {
        console.log(res); // Exibe a resposta completa no console
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}


function sair() {
  window.localStorage.removeItem("info");
  window.location.href = "../LoginCliente/index.html";
}