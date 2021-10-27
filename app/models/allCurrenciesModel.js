const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const AllCurrenciesSchema = new Schema({
    "asset_id": String,
    "name": String,
    "type_is_crypto": Number,
    "data_start": Date,
    "data_end": Date,
    "data_quote_start": Date,
    "data_quote_end": Date,
    "volume_1hrs_usd": Number,
    "volume_1day_usd": Number,
    "volume_1mth_usd": Number,
    "price_usd": Number
});

AllCurrenciesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("AllCurrencies", AllCurrenciesSchema);

