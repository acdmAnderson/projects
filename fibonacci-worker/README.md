## Multithreading com Node.js

Este projeto tem como objetivo demonstrar como o **Node.js** trabalha com ***threads*** por meio de um algoritmo recursivo de Fibonacci para exigir o máximo do processador. Desta maneira, o ***event loop*** vai ficar preso até a finalização da primeira chamada.

A seguir temos uma breve explicação de como o **Node** funciona e em seguida como testar por meio da aplicação.

O **Node.js** usa dois tipos de *threads*:

- Uma *thread* principal tratada pelo ***event loop*** e várias *threads* auxiliares no ***worker pool***. O ***event loop*** é o mecanismo que recebe *callbacks* (funções) e os registra para serem executados em algum ponto no futuro. Ele opera na mesma *thread* que o código JavaScript adequado. Quando uma operação JavaScript bloqueia a *thread*, o ***event loop*** também é bloqueado.

- O ***worker pool*** é um modelo de execução que gera e lida com *threads* separados, que realizam a tarefa de maneira síncrona e retornam o resultado ao ***event loop***. O ***event loop*** então executa o retorno de chamada fornecido com o referido resultado. 

Para executar o projeto:

- Instale as dependências por meio do comando ``$ npm i``;

- Para executar com uma única *thread* ``$ npm run start`` ou ``npm run dev``;

- Para executar com *multithread* ``$ npm run start:worker``;

- Caso queira rodar com o **Docker** basta utilizar ```$ docker build -t project-name . && docker run project-name ```  

Ao finalizar o processo de execução é só acessar em mais de uma aba do navegador http://localhost:3000 e passar como parâmetro a posição de Fibonacci desejada. Ex: http://localhost:3000?position=40.