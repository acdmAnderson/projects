import express, { Application, Response } from 'express';
import Fibonacci from './fibonacci';

const server: Application = express();
const fibonacci: Fibonacci = new Fibonacci();

server.get('/', (req: any, res: Response) => {
    console.log(`Worker ${process.pid} called`);
    const { position }: { position: number } = req.query;
    res.status(200).send(`${fibonacci.find(position)}`);
});

export default server;