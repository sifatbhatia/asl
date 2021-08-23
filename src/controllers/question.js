const express = require('express');
const questionCtlr = express.Router();
const { isAuth } = require('../middlewares/auth')

const {
    Question,
    Quiz,
    Choice
} = require('../models')


questionCtlr.get('/', isAuth,async (req, res) => {
    let question = await Question.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question)
    } else {
        res.render('question/index', {question})
    }

})

questionCtlr.get('/new', isAuth,(req,res) => {
    res.render('question/create')
})
questionCtlr.post('/', isAuth,async (req, res) => {
    const question = await Question.create(req.body)
    let quiz = await Quiz.findAll()
    quiz = quiz.shift()
    question.setQuiz(quiz)

    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question)
    } else {
        res.redirect("/questions/" + question.id)
    }
})

questionCtlr.get('/:id', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    const question = await Question.findByPk(Number(id), {
        include: Quiz
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question)
    } else {
        res.render('question/show', { question })
    }
})

questionCtlr.get('/:id/edit',isAuth, async (req, res) => {
    const id = Number(req.params.id)
    const question = await Question.findByPk( id,{
        include: Quiz
    })
    res.render("question/edit", { question })
})


questionCtlr.post('/:id', isAuth,async (req, res) => {
    const { id } = req.params
    const {question} = req.body
    const questions = await Question.update({question}, {
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.redirect("/questions/" + id)
    }
})

questionCtlr.get('/:id/delete', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    var deleted = await Question.destroy({
        where: {
            id: id
        }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({"success" : deleted})
    } else {
        res.redirect('/questions')
    }

})

module.exports = questionCtlr;