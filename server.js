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


mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected to db")    
)



app.get('/', async(req,res) => {
    return res.render('index');
})

// app.get('/blogs', async(req, res) => {
//     return res.render('blogs-home')
// })


// app.get('/blog/:id', async(req, res) => {
//     return res.render('blogs-single')
// })


app.get('/blog/1', async(req, res) => {
    return res.render(
        'blog-1'
    )
})

app.get('/blog/2', async(req, res) => {
    return res.render('blogs-single')
})

const BlogRouter = require('./src/routes/blogs')
app.use('/', BlogRouter)


app.get('/contact', async(req, res) => {
    return res.render('contact')
})



app.listen(process.env.PORT, ()=>{
    console.log(`Open Website on http://${process.env.HOST}:${process.env.PORT}`)
})