const express = require('express');
const questionCtlr = express.Router();
const {
    Question,
    Quiz,
    Choice
} = require('../models')


questionCtlr.get('/', async (req, res) => {
    let question = await Question.findAll({
        include: Quiz
    })

    res.json(question)
})
questionCtlr.post('/', async (req, res) => {
    const question = await Question.create(req.body)
    let quiz = await Quiz.findAll()
    quiz = quiz.shift()
    question.setQuiz(quiz)
    res.json(question)
})

questionCtlr.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const question = await Question.findByPk(Number(id), {
        include: Quiz
    })
    res.json(question)
})

questionCtlr.post('/:id', async (req, res) => {
    const id = Number(req.params.id)
    var question = await Question.update(req.body, {
        where: {
            id: id
        }
    })
    var question = await Quiz.findByPk(id)
    res.json(question)
})

questionCtlr.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    var deleted = await Question.destroy({
        where: {
            id: id
        }
    })
    res.json(deleted)

})

module.exports = questionCtlr;