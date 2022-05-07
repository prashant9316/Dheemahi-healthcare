require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')

const app = express()


// Setting CORS
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    credentials: true
}
app.use(cors(corsOpts))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src/views"))


app.get('/', async(req,res) => {
    return res.render('index');
})



app.listen(process.env.PORT, ()=>{
    console.log(`Open Website on http://${process.env.HOST}:${process.env.PORT}`)
})