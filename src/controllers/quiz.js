const express = require('express');
const quizCtlr = express.Router();
const { Quiz, Question } = require('../models')


quizCtlr.get('/',async (req, res) => {
    const quizzes = await Quiz.findAll({
        include: Question
    })
    res.json(quizzes)
    }
)
quizCtlr.post('/',async (req,res)=>{
    const quiz = await Quiz.create(req.body)
    res.json(quiz)
})

quizCtlr.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const quiz = await Quiz.findByPk( id,{
        include: Question
    })
    res.json(quiz)
})

quizCtlr.post('/:id', async (req, res) => {
    const id = Number(req.params.id)
    var quiz = await Quiz.update( req.body,{
        where:{ id: id}
    })
    var quiz = await Quiz.findByPk( id)
    res.json(quiz)
})

quizCtlr.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    var deleted = await Quiz.destroy( {
        where:{ id: id}
    })
    res.json(deleted)
    
})

module.exports = quizCtlr;