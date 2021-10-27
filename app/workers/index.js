const {parentPort} = require("worker_threads");
const actionTypes = require("./action-types");
const {updateDataInDb} = require("../controllers/currencysController");
const initDB = require("../db");
const connection = initDB();

parentPort.on("message", async (msg) => {
    if (!msg.action) return;
    console.log(`[${new Date()}] Worker action ${actionTypes.UPDATE_CURRENCY_DATA} started`);
    switch (msg.action) {
        case actionTypes.UPDATE_CURRENCY_DATA:
            await updateDataInDb();
            console.log(`[${new Date()}] Worker action ${actionTypes.UPDATE_CURRENCY_DATA} finished`);
            break;
        default:
            console.log('Invalid worker action');
            break;
    }
});

process.on("exit", () => {
    if (connection) {
        connection.disconnect();
    }
});
