const mongoose = require('mongoose')

const pukronSchema = new mongoose.Schema({
    title: String,
    author: String,
    photoURL: String,
    detail: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Pukron', pukronSchema)