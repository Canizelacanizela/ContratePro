// Obter o ID dos parâmetros do localStorage
let user_verificar = JSON.parse(window.localStorage.getItem("user_verificar"));


console.log(user_verificar.id_user);
// Fazer uma requisição Fetch para obter as informações do perfil
fetch(`http://localhost:3000/userOne/` + user_verificar.id_user)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Erro ao obter informações do servidor.");
    }
  })
  .then((profile) => {
    // Exibir as informações obtidas na página
    document.querySelector("#nome").innerHTML = profile.nome;
    document.querySelector("#imagem").src = "../assets/" + profile.imagem;
    document.querySelector("#tel").innerHTML = profile.telefone;
    document.querySelector("#email").innerHTML = profile.email;
    document.querySelector("#city").innerHTML = profile.cidade;
    document.querySelector("#des").innerHTML = profile.descricao;
  })
  .catch((error) => {
    console.log("Ocorreu um erro:", error);
  });


function sair() {
  window.localStorage.removeItem("info");
  window.location.href = "../LoginProf/index.html";
}