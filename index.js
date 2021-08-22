
const express = require('express');
const app = express();
const quizzes = require('./src/controllers/quiz')
const {Quiz} = require("./src/models")
const questions = require('./src/controllers/question')
const choices = require('./src/controllers/choices')
const bodyparser = require('body-parser')
app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')
app.use(bodyparser.urlencoded({ extended: false }))
app.get('/', async (req, res) => {
    let quiz;
    quiz = await Quiz.findByPk(3);
    res.render("home/home", {

        quiz
    })
})


app.use("/quizzes",quizzes)
app.use("/questions",questions)
app.use("/choices", choices)
app.listen(3000)