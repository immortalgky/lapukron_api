const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
    'email': String,
    'password': String,
    'displayName': String,
    'photoURL': String
})

UserSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password)
}

UserSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', UserSchema)