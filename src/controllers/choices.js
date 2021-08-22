const express = require('express');
const choiceCtlr = express.Router();
const { Question, Quiz, Choice } = require('../models')


choiceCtlr.get('/',async (req, res) => {
    let choice = await Choice.findAll({
        include: Quiz
    })
    
    res.json(choice)
    }
)
choiceCtlr.post('/',async (req,res)=>{
    const choice = await Choice.create(req.body)
    let quiz = await Quiz.findAll()
    quiz = quiz.shift()
    choice.addQuiz(quiz)
    res.json(choice)
})

choiceCtlr.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const choice = await Choice.findByPk( id,{
        include: Quiz
    })
    res.json(choice)
})

choiceCtlr.post('/:id', async (req, res) => {
    const id = Number(req.params.id)
    var choice = await Choice.update( req.body,{
        where:{ id: id}
    })
    var choice = await Quiz.findByPk( id)
    res.json(choice)
})

choiceCtlr.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    var deleted = await Choice.destroy( {
        where:{ id: id}
    })
    res.json(deleted)
    
})

module.exports = choiceCtlr;