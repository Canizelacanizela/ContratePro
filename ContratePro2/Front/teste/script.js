// Seletor para a div que contém as bolhas do chat
const chatContainer = document.querySelector('.chat-container');

// Seletor para a entrada de texto
const chatInput = document.querySelector('.chat-input input');

// Seletor para o botão de enviar
const chatButton = document.querySelector('.chat-input button');

// Evento de clique do botão
chatButton.addEventListener('click', () => {
  // Cria uma nova bolha de chat para o usuário atual
  const newChatBubble = document.createElement('div');
  newChatBubble.classList.add('chat-bubble', 'user1');
  newChatBubble.innerHTML = `<p>${chatInput.value}</p>`;
  
  // Adiciona a nova bolha de chat à lista de bolhas
  chatContainer.appendChild(newChatBubble);
  
  // Limpa a entrada de texto
  chatInput.value = '';
});

// Função para simular o recebimento de mensagens de outro usuário
function receiveMessage(message) {
  // Cria uma nova bolha de chat para o outro usuário
  const newChatBubble = document.createElement('div');
  newChatBubble.classList.add('chat-bubble', 'user2');
  newChatBubble.innerHTML = `<p>${message}</p>`;
  
  // Adiciona a nova bolha de chat à lista de bolhas
  chatContainer.appendChild(newChatBubble);
}

// Exemplo de recebimento de mensagem após 1 segundos
setInterval(() => {
  receiveMessage('Oi, Você');
}, 10000); // 1 minuto em milissegundos

const intervalId = setInterval(() => {
  receiveMessage('O que posso te ajudar');
}, 20000); // 1 minuto em milissegundos

// Cancelar o envio de mensagens após 10 minutos
setTimeout(() => {
  clearInterval(intervalId);
}, 100000); // 10 minutos em milissegundos