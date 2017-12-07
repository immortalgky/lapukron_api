const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const app = express()

const User = require('./models/User.js')

mongoose.connect("mongodb://localhost/lapukron", {useMongoClient : true});

app.use(bodyParser.urlencoded({extended: true}));

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
            newUser.save()
            res.json('Created success')
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
                res.json('Welcome.')
            }
        }
    })
})

app.listen('8081', function () {
    console.log('Lapukron_API Server Started')
})