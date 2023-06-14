// Obter o ID dos parâmetros do localStorage
let user_profissional = JSON.parse(window.localStorage.getItem("user_profissional"));
var info = JSON.parse(localStorage.getItem("info"));
  // Fazer uma requisição Fetch para obter as informações do perfil
  fetch(`http://localhost:3000/prof/`+ user_profissional.id_user)
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
      document.querySelector("#hora").innerHTML = profile.porhora;
      document.querySelector("#tel").innerHTML = profile.telefone;
      document.querySelector("#email").innerHTML = profile.email;
      document.querySelector("#city").innerHTML = profile.cidade;
      document.querySelector("#cat").innerHTML = profile.categoria.nome_categoria;
      document.querySelector("#biografia").innerHTML = profile.biografia;
      document.querySelector("#button").innerHTML = `<button onclick="redirecionar(${profile.id})">Envie uma Mensagem</button>`
    })
    .catch((error) => {
      console.log("Ocorreu um erro:", error);
    });

    function sair() {
      window.localStorage.removeItem("info");
      window.location.href = "../LoginCliente/index.html";
  }


  function redirecionar(id) {

    // console.log(id);
    // Construir a URL com os parâmetros de consulta
    const url = `../chat_Cli/index.html`;

    localStorage.setItem("info", JSON.stringify({ "id_user": id.toString() }));
    // Redirecionar para a página de destino
    window.location.href = url;
}