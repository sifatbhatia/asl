const express = require('express');
const quizCtlr = express.Router();
const { Quiz, Question } = require('../models')
const { isAuth } = require('../middlewares/auth')

quizCtlr.get('/', isAuth,async (req, res) => {
        const quizzes = await Quiz.findAll()
        if (req.headers.accept.indexOf('/json') > -1) {
            res.json(quizzes)
        } else {
            res.render('quiz/index', {quizzes})
        }
    }
)
quizCtlr.get('/new', isAuth,(req,res) => {
    res.render('quiz/create')
})
quizCtlr.post('/',isAuth,async (req,res)=>{
    const quiz = await Quiz.create(req.body)
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        res.redirect("/quizzes/" + quiz.id)
    }

})

quizCtlr.get('/:id', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    const quiz = await Quiz.findByPk( id,{
        include: Question
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        res.render('quiz/show', { quiz })
    }

})

quizCtlr.get('/:id/edit', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    const quiz = await Quiz.findByPk( id,{
        include: Question
    })
    res.render("quiz/edit", { quiz })
})



quizCtlr.post('/:id', isAuth,async (req, res) => {
    const { id } = req.params
    const {name} = req.body
    const quiz = await Quiz.update({name}, {
        where: { id }
    })

    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        res.redirect("/quizzes/" + id)
    }

})

quizCtlr.get('/:id/delete', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    var deleted = await Quiz.destroy( {
        where:{ id: id}
    })

    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({"success" : deleted})
    } else {
        res.redirect('/quizzes')
    }
    
})

module.exports = quizCtlr;