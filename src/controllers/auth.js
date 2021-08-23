const express = require('express')
const router = express.Router()
const request = require('request')
const querystring = require("querystring");


router.get('/login', (req, res) => {
    res.render('auth/login')
} )

router.get('/callback', async (req,res) => {
    const {code} = req.query
    await request({
        uri: "https://github.com/login/oauth/access_token",
        qs: {
            client_id: 'e6e3ad17f46dd71c1fc4',
            client_secret: '2b5979f26672c4c2ac120ccdf2b0d048855b6444',
            code
        }

    }, async (error,response,body)=>{
        const { access_token } = querystring.parse(body)
        req.session.access_token = access_token;
        res.redirect("/")

    })

})

module.exports = router;