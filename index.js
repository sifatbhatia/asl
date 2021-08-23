
const express = require('express');
const app = express();
const quizzes = require('./src/controllers/quiz')
const session = require('express-session')
const {Quiz} = require("./src/models")
const questions = require('./src/controllers/question')
const choices = require('./src/controllers/choices')
const authCtrl = require('./src/controllers/auth')
const bodyparser = require('body-parser')
app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')
app.use(session({
    saveUninitialized: false,
    secret: "keyboard cat",
    cookie: { maxAge: 60000 }
}))
app.use(bodyparser.urlencoded({ extended: false }))
app.get('/', (req, res,next) => {
    res.render('home/home')

})


app.use("/quizzes",quizzes)
app.use("/questions",questions)
app.use("/choices", choices)
app.use("/auth", authCtrl)

app.listen(3000)