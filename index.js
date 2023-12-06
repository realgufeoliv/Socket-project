// Código do cliente Socket
const readline = require("readline"); // Importa o módulo readline, auxilia na leitura e envio de dados pelo terminal
const WebSocket = require("ws"); // Importa o módulo ws, auxilia na criação do cliente socket
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); // Cria uma interface de leitura e escrita
const clientSocket = new WebSocket("ws://localhost:3001"); // Cria o cliente socket e conecta ao servidor socket

clientSocket.on("message", (resposta) => {
  getMessage = JSON.parse(resposta).message; // Converte a resposta do servidor para um objeto e pega a mensagem
  getStep = JSON.parse(resposta).step; // Converte a resposta do servidor para um objeto e pega o step
  buildResponse = (step, message) => JSON.stringify({ step, message }); // Cria uma função para montar a resposta do cliente
  rl.prompt();
  rl.question(getMessage, (respostaCliente) => {
    clientSocket.send(buildResponse(getStep,respostaCliente)); // Envia a resposta do cliente para o servidor
  });
});

clientSocket.on("close", () => { // Quando o servidor socket é fechado, o cliente socket também é fechado
  console.log("\nObrigado! Volte sempre :)\n"); 
  process.exit(0); 
});
