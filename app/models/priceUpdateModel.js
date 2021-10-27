const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const PriceUpdatesSchema = new Schema({
    "time": Date,
    "asset_id_base": String,
    "asset_id_quote": String,
    "rate": Number,
    "update_in_db_time": Date
});

PriceUpdatesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PriceUpdates", PriceUpdatesSchema);

