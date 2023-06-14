let info = JSON.parse(localStorage.getItem("info"));
let user= JSON.parse(window.localStorage.getItem("info"));
// let nome = document.querySelector(".nomeUser2");
// let re = document.querySelector(".nome")

fetch(`http://localhost:3000/prof/`+ user.id_user)
.then((res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Erro ao obter informações do servidor.");
  }
})
.then((profile) => {
  // Exibir as informações obtidas na página
  document.querySelector("#name_user2").innerHTML = profile.nome;
  document.querySelector("#imagem_yser2").src = "../assets/" + profile.imagem;
  
 })
 .catch((error) => {
   console.log("Ocorreu um erro:", error);
});

// const socket = new WebSocket('ws://localhost:3000');
// const envia = document.querySelector("#envia");
// const recebe = document.querySelector("#recebe");

// function enviar() {
//     const input = document.querySelector("#envia");
//     const remetenteId = 2;
//     const destinatarioId = 1;
//     const conteudo = input.value;
//     const data = new Date().toISOString();

//     const message = {
//         remetenteId,
//         destinatarioId,
//         conteudo,
//         data,
//     };

//     socket.send(JSON.stringify(message));
//     exibirMensagem(message); // Exibir a mensagem enviada
//     input.value = '';
// }

// function adicionarMensagem(conteudo, remetenteId) {
//     const sectionRecebe = document.querySelector("#recebe");
//     const span = document.createElement('span');
//     span.textContent = conteudo;

//     if (remetenteId === 2) {
//         span.classList.add('conteudoRemetente');
//     } else {
//         span.classList.add('conteudo');
//     }
//     sectionRecebe.appendChild(span);
//     sectionRecebe.scrollTop = sectionRecebe.scrollHeight; // Rolagem automática para exibir a mensagem mais recente
// }

// function exibirMensagem(mensagem) {
//     const sectionRecebe = document.querySelector("#recebe");
//     fetch('http://localhost:3000/men')
//       .then(resp => resp.json())
//       .then(mensagens => {
//         sectionRecebe.innerHTML = "";
//         mensagens.forEach(m => {
//           const lista = document.createElement('span');
//           if (m.destinatarioId == mensagem.destinatarioId) {
//             lista.classList.add('conteudo');
//           } else {
//             lista.classList.add('conteudoRemetente');
//           }
//           lista.textContent = m.conteudo;
//           sectionRecebe.appendChild(lista);
//         });
//       })
//       .catch(error => {
//         console.error('Erro:', error);
//       });
  
//     adicionarMensagem(mensagem.conteudo, mensagem.remetenteId);
//   }
  
  // if (nome.destinatarioId == user.id_user) {
  //   var lista = document.createElement('span');
  //   lista.classList.add('conteudo');
  //   lista.innerHTML = re.conteudo;
  //   document.querySelector('.nomeUser2').innerHTML = nomePromotor;
  //   mensagem.appendChild(lista);
  // } else {
  //   var lista = document.createElement('span');
  //   lista.classList.add('conteudoRemetente');
  //   lista.innerHTML = re.conteudo;
  //   mensagem.appendChild(lista);
  // } 
  
  


//   ws.onopen = () => {
//     console.log('Conexão estabelecida.');
//   };
  
//   const receivedMessages = new Set();
  
//   ws.onmessage = (event) => {
//     const messagesDiv = document.getElementById('recebe');
//     const mensagem = JSON.parse(event.data);
//     const remetenteId = mensagem.remetenteId;

//     if (receivedMessages.has(mensagem.id_mensagem)) {
//         return; // Ignorar a mensagem duplicada
//     }

//     receivedMessages.add(mensagem.id_mensagem);

//     const conteudoSpan = document.createElement('span');
//     conteudoSpan.textContent = mensagem.conteudo;

//     if (remetenteId == 2) {
//         conteudoSpan.classList.add('conteudoRemetente');
//         conteudoSpan.style.display = "flex"
//     } else {
//         conteudoSpan.classList.add('conteudo');
//         conteudoSpan.style.display = "flex"
//     }

//     messagesDiv.appendChild(conteudoSpan);
//     messagesDiv.scrollTop = messagesDiv.scrollHeight;
// };

// Adicionar evento de teclado para o campo de entrada
// const input = document.querySelector("#envia");
// input.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter' && input.value != '') {
//         enviar();
//     } else {
//         console.log('ou tem nada não');
//     }
// });
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => {
  console.log('Conexão estabelecida.');
};

ws.onmessage = (event) => {
  const mensagemBlob = event.data;

  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const mensagemTexto = event.target.result;

    // Cria a nova span e adiciona ao elemento recebe
    const span = document.createElement('span');
    span.textContent = `Profissional: ${mensagemTexto}`;
    recebe.appendChild(span);
  };
  fileReader.readAsText(mensagemBlob);
};

const recebe = document.getElementById('recebe');
const input = document.getElementById('envia');
const button = document.getElementById('enviar');

button.addEventListener('click', enviar);

function enviar() {
  const mensagem = input.value;

  // Cria a nova span e adiciona ao elemento recebe
  const span = document.createElement('span');
  span.textContent = `Me: ${mensagem}`;
  recebe.appendChild(span);

  // Envia a mensagem para o servidor WebSocket
  ws.send(mensagem);

  input.value = '';
}