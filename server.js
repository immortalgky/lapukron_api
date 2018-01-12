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

const Pukron = require('./models/Pukron.js')

// app.get('/token', function (req, res) {
//     const token = jwt.sign({foo: 'bar'}, 'gky', { expiresIn: '1h' })
//     res.json(jwt.decode(token))
// })

Pukron.collection.drop()
Pukron.create({
    photoURL: 'https://farm5.staticflickr.com/4530/26850238749_53b47c2a06.jpg',
    title: 'Lets go Bangkok',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm5.staticflickr.com/4205/35407795425_fe3edbd301.jpg',
    title: 'Lets go Phuket',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm5.staticflickr.com/4252/35240563872_cfc9fff026.jpg',
    title: 'Lets go Krabi',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm5.staticflickr.com/4545/24761796768_56c9b9d212.jpg',
    title: 'Lets go Canela',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm8.staticflickr.com/7106/7500036996_4272dbe32d.jpg',
    title: 'Lets go America',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm9.staticflickr.com/8591/16245755703_f5f73af197.jpg',
    title: 'Lets go Paris',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm9.staticflickr.com/8606/16278566891_e89819a1b3.jpg',
    title: 'Lets go Yaowarath',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm1.staticflickr.com/612/33232260590_9ff5703fbd.jpg',
    title: 'Lets go UK Part 4',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm9.staticflickr.com/8551/29843085116_2eff8bed44.jpg',
    title: 'Lets go Office Life',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
Pukron.create({
    photoURL: 'https://farm5.staticflickr.com/4268/35193951245_108825ae24.jpg',
    title: 'Lets go UK Part 1',
    author: 'Gky',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt volutpat eleifend. Suspendisse massa risus, lobortis sed condimentum ac, tempor vitae mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. '
})
//----------------------//
// Index Route ---------//
//----------------------//
// query param : all, set
app.get('/pukron', function (req, res) {
    const limitFactor = req.query.all ? req.query.set : 1
    const skipFactor = req.query.all ? 0 : 1
    Pukron.find({}).sort({_id: -1}).limit(9 * limitFactor).skip((req.query.set - 1) * 9 * skipFactor).exec(function (err, pukron) {
        if (err) {
            throw err
        }
        if (pukron.length === 0) {
          res.status(404).send('Not Found')
        } else {
          res.json(pukron)
        }
    })
})

//-----------------------//
// Create Route ---------//
//-----------------------//
app.post('/pukron', function (req, res) {
    const newPukron = {
        photoURL: req.body.photoURL,
        title: req.body.title,
        author: req.body.author,
        detail: req.body.detail,
        detailHTML: req.body.detailHTML
    }
    Pukron.create(newPukron, function (err, pukron) {
        if (err) {
            throw err
        }
        res.json(pukron)
    })
})

//-----------------------//
// Show Route -----------//
//-----------------------//
app.get('/pukron/:id', function (req, res) {
    Pukron.findById(req.params.id, function (err, pukron) {
        if (err) {
            console.log(err)
        }
        if (pukron.length === 0) {
            res.status(404).send('Not Found')
        } else {
            res.json(pukron)
        }
    })
})

//-----------------------//
// Update Route ---------//
//-----------------------//
app.put('/:id')
//-----------------------//
// Destroy Route --------//
//-----------------------//
app.delete('/:id')

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