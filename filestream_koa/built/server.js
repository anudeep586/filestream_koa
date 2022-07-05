"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyparser = require("koa-bodyparser");
const { fork } = require("child_process");
const cluster = require('cluster');
const os = require('os');
const cpuN = os.cpus().length;
const port = 8080;
const app = new Koa();
const router = new Router();
router.get('/', async (ctx) => {
    const child = fork("/home/raramuri/Desktop/filestream_koa/src/zip.ts");
    await child.send({ time: Date.now() });
    const timeTaken = await new Promise((resolve) => {
        child.on('message', resolve);
    });
    child.on("exit", (code) => {
        console.log("exited with code", code);
    });
    ctx.body = timeTaken;
    cluster.worker.kill();
});
app.use(logger());
app.use(bodyparser());
app.use(router.routes());
if (cluster.isMaster) {
    for (let i = 0; i < cpuN; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid} has been killed`);
        cluster.fork();
        console.log(`new process created ${process.pid}`);
    });
}
else {
    app.listen(port, () => {
        console.log("process are ", process.pid);
    });
}
// app.listen(port)
exports.default = app;
//# sourceMappingURL=server.js.map