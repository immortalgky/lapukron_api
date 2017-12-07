const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express()

const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('./models/User.js')
const cors = require('cors')

mongoose.connect("mongodb://localhost/lapukron", {useMongoClient : true});

app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())

// app.get('/token', function (req, res) {
//     const token = jwt.sign({foo: 'bar'}, 'gky', { expiresIn: '1h' })
//     res.json(jwt.decode(token))
// })

app.get('/', function (req, res) {
    res.json('List all post')
})

app.post('/signup', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            throw err
        }
        if (user) {
            res.json('Email already exist')
        } else {
            let newUser = new User()
            newUser.email = req.body.email
            newUser.password = newUser.hashPassword(req.body.password)
            newUser.save(function (err) {
                User.findOne({email: newUser.email}, function (err, user) {
                    const payload = {
                        uid: user._id
                    }
                    let token = jwt.sign(payload, app.get('superSecret'), { expiresIn: '1h' })
                    res.json({
                        success: true,
                        message: 'Logged In',
                        token: token
                    })
                })
            })
        }
    })
})

app.post('/signin', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            throw err
        }
        if (!user) {
            res.json('Email not found')
        } else {
            if (!user.comparePassword(req.body.password, user.password)) {
                res.json('Invalid Password')
            } else {
                const payload = {
                    uid: user._id
                }
                let token = jwt.sign(payload, app.get('superSecret'), { expiresIn: '1h' })
                res.json({
                    success: true,
                    message: 'Logged In',
                    token: token
                })
            }
        }
    })
})

app.listen('3001', function () {
    console.log('Lapukron_API Server Started')
})