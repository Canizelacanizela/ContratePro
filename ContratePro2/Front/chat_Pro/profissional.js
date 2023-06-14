// 

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
    span.textContent = `Cliente: ${mensagemTexto}`;
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