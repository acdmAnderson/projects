import cluster from 'cluster';
import os from 'os';
import server from './server';

const worker = function (): void {
    if (cluster.isMaster) {
        const numberCPUs = os.cpus().length - 1; console.log(`Master ${process.pid} is running`);
        for (let i = 0; i < numberCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker) => {
            console.log(`worker ${worker.process.pid} died`);
        });
        cluster.on('message', (worker) => {
            console.log(`worker ${worker.process.pid} called`);
        });
    } else {                     
        server.listen(3000, () => {
            console.log(`Server linten on http://127.0.0.1:3000 from Worker ${process.pid}`);
        });        
        console.log(`Worker ${process.pid} started`);
        cluster.emit('message', cluster.worker);
    }
}
worker();