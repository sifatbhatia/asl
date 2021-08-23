const express = require('express');
const choiceCtlr = express.Router();
const { Question, Quiz, Choice } = require('../models')
const { isAuth } = require('../middlewares/auth')


choiceCtlr.get('/',isAuth,async (req, res) => {
    let choice = await Choice.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice)
    } else {
        res.render('choice/index', {choice})
    }
})
choiceCtlr.get('/new', (req,res) => {
    res.render('choice/create')
})
choiceCtlr.post('/',isAuth,async (req,res)=>{
    const choice = await Choice.create(req.body)
    let quiz = await Quiz.findAll()
    quiz = quiz.shift()
    choice.addQuiz(quiz)


    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice)
    } else {
        res.redirect("/choices/" + choice.id)
    }
})

choiceCtlr.get('/:id', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    const choice = await Choice.findByPk( id,{
        include: Quiz
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice)
    } else {
        res.render('choice/show', { choice })
    }

})
choiceCtlr.get('/:id/edit', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    const choice = await Choice.findByPk( id,{
        include: Quiz
    })
    res.render("choice/edit", { choice })
})


choiceCtlr.post('/:id', isAuth,async (req, res) => {
    const { id } = req.params
    const {choice} = req.body
    const choices = await Choice.update({choice}, {
        where: { id }
    })

    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices)
    } else {
        res.redirect("/choices/" + id)
    }
})

choiceCtlr.get('/:id/delete', isAuth,async (req, res) => {
    const id = Number(req.params.id)
    var deleted = await Choice.destroy( {
        where:{ id: id}
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({"success" : deleted})
    } else {
        res.redirect('/choices')
    }
    
})

module.exports = choiceCtlr;