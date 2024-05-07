const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, {
    timestamps: true
})

var Quizzes = mongoose.model('Quiz', quizSchema);

module.exports = Quizzes;