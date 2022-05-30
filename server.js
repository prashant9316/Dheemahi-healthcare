require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

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
app.use(cookieParser());
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
const { verifyAdmin } = require('./src/services/verifyAdmin')
app.use('/', BlogRouter)


app.get('/contact', async(req, res) => {
    return res.render('contact')
})


app.get('/admin/login', async(req, res) => {
    return res.render('admin/login')
})


app.post('/login', async(req, res) => {
    try {
        console.log(req.body.email)
        console.log(req.body.password)
        let email = req.body.email;
        let pass = req.body.password;
        console.log(email, pass)
        if(email == 'admin@drsanjaykumar.in' && pass == 'Admin@123'){
            return res.json({
                AuthToken: process.env.AuthToken,
                code: 200,
                status: 200
            })
        }else {
            return res.json({
                error: 'Failed to login!',
                code: 401,
                status: 401
            })
        }
    } catch (error) {
        return res.json({
            error: "Server error!",
            code: 500,
            status: 500
        })
    }
})


app.get('/admin', verifyAdmin, async(req, res) => {
    return res.render('admin/dashboard')
})


const courses = [
    {
        courseName: "Academic Success Blueprint",
        courseSubTitle: "Become super clear about your academic and professional goals to become super successful and ultra achiever in life",
        imgLink: "https://img-b.udemycdn.com/course/240x135/4338986_fac9_2.jpg",
        courseLink: "https://www.udemy.com/course/academic-success-blueprint/",
        About: "You need to be a success seeker and willing to create lots of achievements in life",
        price: "₹385",
        duration: "1.5 hours",
        rating: "4.8",
        date: "Octorber 2021"
    },
    {
        courseName: "Beginner's Guide to Become Super Achiever",
        courseSubTitle: "Transform Your Self into 'Outcome Oriented Professional'",
        imgLink: "https://img-b.udemycdn.com/course/480x270/4364492_f037.jpg",
        About: "",
        price: "₹385",
        duration: "1.5 hours",
        rating: "5.0",
        date: "November 2021", 
        courseLink: "https://www.udemy.com/course/become-super-achiever-in-2-days/"
    },
    {
        courseName: "Beginner's Guide to Complete Your Assignments",
        courseSubTitle: "An Easy Yet Effective Approach",
        imgLink: "https://img-b.udemycdn.com/course/480x270/4390718_3f5d.jpg",
        About: "",
        price: "₹385",
        duration: "1.5 hours",
        rating: "0.0",
        date: "December 2021",
        courseLink: "https://www.udemy.com/course/beginners-guide-to-complete-your-school-assignments/"
    },
    {
        courseName: "One thing to become super successful",
        courseSubTitle: "Give your self a new perspective of life",
        imgLink: "https://img-b.udemycdn.com/course/480x270/4454174_6dff_2.jpg",
        About: "",
        price: "₹385",
        duration: "1.5 hours",
        rating: "0.0",
        date: "December 2021",
        courseLink: "https://www.udemy.com/course/one-thing-to-become-super-successful/"
    },
    // {
    //     courseName: "",
    //     courseSubTitle: "",
    //     imgLink: "",
    //     About: "",
    //     price: "",
    //     duration: "",
    //     rating: "",
    //     date: ""
    // }

]

app.get('/courses', async(req, res) => {
    return res.render('courses', {
        courses
    })
})



app.listen(process.env.PORT, ()=>{
    console.log(`Open Website on http://${process.env.HOST}:${process.env.PORT}`)
})