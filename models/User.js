const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    'email': String,
    'password': String,
    'displayName': String,
    'photoURL': String
})

UserSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10)
}

UserSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', UserSchema)