const mongoose = require('mongoose')

const pukronSchema = new mongoose.Schema({
    title: String,
    author: String,
    photoURL: String,
    detail: String,
    detailHTML: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Pukron', pukronSchema)