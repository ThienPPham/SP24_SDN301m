const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    comment:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    subTitle:{
        type: String,
        required: true
    },
    publish_date:{
        type: Date,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    page:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    comments:[commentSchema]
},{
    timestamps: true
});

var Books = mongoose.model('Book', bookSchema);

module.exports = Books;
