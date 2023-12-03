// Código do cliente Socket
const readline = require("readline"); // Importa o módulo readline, auxilia na leitura e envio de dados pelo terminal
const net = require('net');

let rl = readline.createInterface({input:process.stdin,output: process.stdout}); // Cria uma interface de leitura e escrita
const ioClient = require("socket.io-client"); // Importa o socket.io-client biblioteca usada para ciar o cliente socket
const clientSocket = ioClient(`http://localhost:3001`); // Cria o cliente socket e conecta ao servidor socket


clientSocket.on("welcome", (welcome) => { // Evento boasvindas, recebe a mensagem do servidor
  console.log(welcome);
});

clientSocket.on("chooseOption", (resposta) => {

  rl.prompt()
    rl.question(`${resposta} `, (respostaCliente) => {
    clientSocket.emit('chooseOption', respostaCliente);
  });


  
clientSocket.on("disconnect", () => {
  console.log("\nObrigado! Volte sempre :)\n");
  process.exit(0);
})

});
clientSocket.on("chooseMenu", (resposta) => {

  rl.prompt()
    rl.question(resposta, (chooseMenu) => {
    clientSocket.emit('chooseMenu', chooseMenu);
  });

});

clientSocket.on("checkout", (resposta) => {

  rl.prompt()
    rl.question(resposta, (checkout) => {
    clientSocket.emit('checkout', checkout);
  });

});
clientSocket.on("adress", (resposta) => {

  rl.prompt()
    rl.question(resposta, (adress) => {
    clientSocket.emit('adress', adress);
  });

});