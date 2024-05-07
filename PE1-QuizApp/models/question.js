const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    option: [{
        type: String,
        required: true
    }],
    correctAnswerIndex: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var Questions = mongoose.model('Question', questionSchema);

module.exports = Questions;