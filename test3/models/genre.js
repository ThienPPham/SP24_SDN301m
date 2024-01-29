const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const genreSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Genres = mongoose.model('Genre', genreSchema);

module.exports = Genres
