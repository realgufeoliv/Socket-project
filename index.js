// Código do cliente Socket
const readline = require("readline"); // Importa o módulo readline, auxilia na leitura e envio de dados pelo terminal
const WebSocket = require("ws"); // Importa o módulo ws, auxilia na criação do cliente socket
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); // Cria uma interface de leitura e escrita
const clientSocket = new WebSocket("ws://localhost:3001"); // Cria o cliente socket e conecta ao servidor socket

clientSocket.on("welcome", (welcome) => {
  // Evento boasvindas, recebe a mensagem do servidor
  console.log(welcome);
});

clientSocket.on("message", (resposta) => {
  getMessage = JSON.parse(resposta).message;
  getStep = JSON.parse(resposta).step;
  buildResponse = (step, message) => JSON.stringify({ step, message });
  rl.prompt();
  rl.question(getMessage, (respostaCliente) => {
    clientSocket.send(buildResponse(getStep,respostaCliente));
  });
});

clientSocket.on("close", (resposta) => {
  console.log("\nObrigado! Volte sempre :)\n");
  process.exit(0);
});
