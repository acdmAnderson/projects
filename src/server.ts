import express, { Application, Response } from 'express';
import Fibonacci from './fibonacci';

const server: Application = express();
const fibonacci: Fibonacci = new Fibonacci();

server.get('/', (req: any, res: Response) => {
    console.log(`Worker ${process.pid} called`);
    const start = Date.now();
    const { position }: { position: number } = req.query;
    const fibonacciValue = fibonacci.find(position);
    res.status(200).send(`Fibonacci[${Date.now() - start}ms] = ${fibonacciValue}`);
});

export default server;