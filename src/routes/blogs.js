const Blogs = require('./../models/blogs')
const router = require('express').Router()



router.get('/blogs', async(req, res) => {
    try {
        console.log("Trying to fetch all the blogs")
        let articles = await Blogs.find().sort({ createdAt: 'desc'})
        var time = new Date()
        if(articles.length==0){
            articles = [
            {
                title: 'How to book a appointment',
                description: 'you will learn how to book an appointment',
                slug: "book an appointment",
                createdAt: new Date().toLocaleDateString(),
                author: 'Prashant Mishra',
                sanitizedHtml: '<h1>No Blogs</h1>',
                imageLink: "https://mdbootstrap.com/img/Photos/Others/images/77.jpg"
            }
            ]
        }
        res.render('blogs-home',{
            blogs: articles
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
    
})


router.get('blog/view/:slug', async (req, res) => {
    const article = await Blogs.findOne({ slug: req.params.slug })
    if(article == null) return res.status(400).send("Wrong Route")
    return res.render('blog-single', { article: article, user: req.user, title: ["Blogs", `${article.title}`] })
})


router.get('blog/:slug', async (req, res) => {
    const article = await Blogs.findOne({ slug: req.params.slug }) 
    if(article == null) return res.json({
        status: 400,
        error: "Blog ID Does not exist"
    })
    res.json({
        status: 200,
        article: article
    })
})




module.exports = router