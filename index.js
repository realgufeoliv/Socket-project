// Código do cliente Socket
const readline = require("readline"); // Importa o módulo readline, auxilia na leitura e envio de dados pelo terminal

let rl = readline.createInterface({input:process.stdin,output: process.stdout}); // Cria uma interface de leitura e escrita
const ioClient = require("socket.io-client"); // Importa o socket.io-client biblioteca usada para ciar o cliente socket
const clientSocket = ioClient(`http://localhost:3001`); // Cria o cliente socket e conecta ao servidor socket

clientSocket.on("boasvindas", (boasvindas) => { // Evento boasvindas, recebe a mensagem do servidor
  console.log(boasvindas);
});

clientSocket.on("chooseOption", (resposta) => {

  rl.prompt()
    rl.question(`${resposta} `, (respostaCliente) => {
    clientSocket.emit('chooseOption', respostaCliente);
  });


  
clientSocket.on("disconnect", () => {
  console.log("Obrigado! Volte sempre :)\n");
  process.exit(0);
})

});
clientSocket.on("chooseMenu", (resposta) => {

  rl.prompt()
    rl.question(resposta, (chooseMenu) => {
    clientSocket.emit('chooseMenu', chooseMenu);
  });

});