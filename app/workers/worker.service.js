const {Worker} = require("worker_threads");
const path = require("path");
const initWorker = () => {
    const workerPath = path.resolve(__dirname + "/index.js");
    return new Worker(workerPath);
};

const reInitWorker = () => {
    const newWorker = initWorker();
    newWorker.on("exit", () => reInitWorker());
    return newWorker;
};

module.exports = {
    initWorker,
    reInitWorker,
};
