const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;
const initDB = require('./db');
const routes = require('./router');
const cron = require('node-cron');
const morgan = require('morgan');
const cors = require("cors");

const currencyWorkerService = require('./workers/worker.service');
const currencyWorkerActionTypes = require('./workers/action-types');
const {getPriceUpdates} = require('./controllers/priceUpdatesController');

const currencyWorker = currencyWorkerService.reInitWorker();

app.use(morgan('dev'));
app.use(cors());
app.use(routes);
cron.schedule('0 */15 * * * *', () => {
    currencyWorker.postMessage({
        action: currencyWorkerActionTypes.UPDATE_CURRENCY_DATA,
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    initDB();
    // initial fill db with all currencies data for rest API
    currencyWorker.postMessage({
        action: currencyWorkerActionTypes.UPDATE_CURRENCY_DATA,
    });
    // start live price updating
    getPriceUpdates();
})

