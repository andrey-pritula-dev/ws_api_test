const express = require('express');
const router = express.Router();
const {getCurrencyDbData} = require("../controllers/currencysController");
const {getPriceById} = require("../controllers/priceUpdatesController");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const options = {
    swaggerOptions: {
        validatorUrl: null
    }
};

router.get('/', function (req, res) {
    res.send('You can check swagger by route \"/api/docs/\"');
});

router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs', swaggerUi.setup(swaggerDocument, options));
router.get('/api/list', getCurrencyDbData);
router.get('/api/list/id/:id', getPriceById);
router.get('/api/list/limit/:limit/page/:page', getCurrencyDbData);
router.get('/api/list/id/:id/limit/:limit/page/:page', getPriceById);

module.exports = router;