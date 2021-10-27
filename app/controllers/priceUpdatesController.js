const PriceUpdatesSchema = require("../models/priceUpdateModel");

const getPriceUpdates = () => {
    const WebSocket = require('ws');
    const ws = new WebSocket(process.env.API_WS_URL);
    ws.on('open', function open() {
        const msg = {
            "type": "hello",
            "apikey": process.env.API_KEY,
            "heartbeat": false,
            "subscribe_data_type": ["exrate"],
            "subscribe_update_limit_ms_quote": 1000,
        };
        console.log('Start listening WS')
        ws.send(JSON.stringify(msg));
    });

    ws.on('message', async function incoming(data) {
        const messageData = JSON.parse(data.toString());
        await PriceUpdatesSchema.create({...messageData, update_in_db_time: new Date()})
    });

    ws.on('error', e => {
        console.log(e)
    })
}

const getPriceById = async (req, res) => {
    try {
        let {params: {limit, page, id}} = req;
        if (!id) {
            res.json({code: 422, data: 'Id is required parameter'})
        }
        if (!limit) {
            limit = 100;
        }
        if (!page) {
            page = 1;
        }
        const filters = {
            asset_id_base: id.toUpperCase()
        };

        const options = {
            page: page,
            limit: limit < 1 ? 1 : limit > 250 ? 250 : limit,
            collation: {
                locale: "en",
            },
            sort: {time: "desc"}
        };

        const data = await PriceUpdatesSchema.paginate(filters, options);
        if (!data.docs.length) {
            res.json({code: 404, data: [], message: 'Data not found'});
            return
        }
        res.json({code: 200, data: data, message: 'OK'});
    } catch (error) {
        res.json({code: 500, data: [], message: error.message});
        console.log(error);
    }
}

module.exports = {getPriceUpdates, getPriceById}