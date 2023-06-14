const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');
const router = require('./src/routes/routes')
const app = express();
const server = require('http').createServer(app);
var pris = new PrismaClient()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router)


const httpServer = app.listen(PORT, () => {
    console.log('Servidor HTTP configurado e em execução');
});

const prisma = new PrismaClient();

const wss = new WebSocket.Server({ server: httpServer });

const clients = new Set();

wss.on('connection', (ws) => {
  // Adiciona o cliente à lista de clientes conectados
  clients.add(ws);

  ws.on('message', (message) => {
    // Envia a mensagem recebida para todos os clientes conectados
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    // Remove o cliente da lista de clientes conectados
    clients.delete(ws);
  });
});


console.log('Servidor WebSocket configurado e em execução');