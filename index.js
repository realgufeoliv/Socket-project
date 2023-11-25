const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

io.on('connection', (socket) => {


  console.log(`Um cliente acaba de entrar`);

  socket.on('pergunta', (pergunta) => {
    console.log(`Pergunta recebida do cliente (ID: ${socket.id}): ${pergunta}`);
    const resposta = `Resposta para: ${pergunta}`;
    socket.emit('resposta', resposta);
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado (ID: ${socket.id})`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    var figlet = require("figlet");
    
  console.log(`Pizzaria aberta! Rua Local http://localhost, número:${PORT}`);
  console.log(
    figlet.textSync("Bem vindo à Node Pizzaria!", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  // Código do cliente Socket.IO no mesmo arquivo
  const ioClient = require('socket.io-client');
  const clientSocket = ioClient(`http://localhost:${PORT}`);

  clientSocket.on('resposta', (resposta) => {
    console.log(`Resposta do servidor: ${resposta}`);
  });

  clientSocket.emit('pergunta', 'Vocês tem pizza de calabresa?');
});