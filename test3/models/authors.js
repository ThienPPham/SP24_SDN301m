const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const authorSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    birthYear:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    }
})

var Authors = mongoose.model('Author', authorSchema);

module.exports = Authors