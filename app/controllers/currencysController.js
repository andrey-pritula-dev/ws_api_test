const axios = require('axios');
const AllCurrenciesSchema = require("../models/allCurrenciesModel");

const requestCurrencyData = async () => {
    return axios.get(
        `${process.env.API_REST_URL}v1/assets`,
        {
            headers: {
                "X-CoinAPI-Key": process.env.API_KEY
            }
        })
}

const updateDataInDb = async () => {
    const {data} = await requestCurrencyData();
    for (const current of data) {
        if (current.type_is_crypto === 1) {
            await AllCurrenciesSchema.updateOne({name: current.name}, current, {new: true, upsert: true})
        }
    }
}

const getCurrencyDbData = async (req, res) => {
    try {
        let {params: {limit, page}} = req;

        if (!limit) {
            limit = 100;
        }
        if (!page) {
            page = 1;
        }
        const filters = {};

        const options = {
            page: page,
            limit: limit < 1 ? 1 : limit > 250 ? 250 : limit,
            collation: {
                locale: "en",
            },
            sort: {name: "asc"}
        };

        const data = await AllCurrenciesSchema.paginate(filters, options);
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

module.exports = {getCurrencyDbData, updateDataInDb}
