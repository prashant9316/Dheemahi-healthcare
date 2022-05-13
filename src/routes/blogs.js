const Blogs = require('./../models/blogs')
const router = require('express').Router()

const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)

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


router.get('/create-new', async(req, res) => {
    try {
        return res.render('admin/create-blog')
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
})


// router.get('/new', isAdmin, async(req, res) => {
//     const article = {}
//     res.render('new_blog_page', {
//         user: req.user,
//         article: article,
//         title: ['Blogs', 'New Blog Page']
//     })
// })

router.post('blog/new', async(req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndReturn('new'))



// router.post('/edit/:id' , isAdmin, async (req, res) => {
//     try {
//         const article = await Article.findById(req.params.id)
//         if(!article){
//             return res.status(400).send("Article not found")
//         }
//         try {
//             if(req.body.title){
//                 req.body.slug = slugify(req.body.title, { lower: true, strict: true})
//             }
//             if(req.body.markdown){
//                 req.body.sanitizedHtml = dompurify.sanitize(marked(req.body.markdown))
//             }
//             const savedArticle = await Article.findOneAndUpdate(
//                 {
//                     _id: req.params.id
//                 },
//                 {
//                     $set: req.body
//                 },
//                 {
//                     new: true
//                 }
//             )
//             return res.redirect(`/blogs/view/${savedArticle.slug}`)
//         } catch (err) {
//             return res.json({
//                 code: '500', 
//                 error: 'Unable to edit the Blog'
//             })
//         }
//     } catch (e) {
//         res.json({
//             status: 500,
//             error: e
//         })
//     }
// })

router.get('blog/view/:slug', async (req, res) => {
    const article = await Blogs.findOne({ slug: req.params.slug })
    if(article == null) return res.status(400).send("Wrong Route")
    return res.render('blog-single', { article: article, user: req.user, title: ["Blogs", `${article.title}`] })
})

// router.get('/edit/:slug', isAdmin, async (req, res) => {
//     const article = await Article.findOne({ slug: req.params.slug })
//     if(article == null) return res.status(400).send("Wrong Route")
//     return res.render('edit_blog_page', { article: article, user: req.user, title: ['Blogs','Edit Blog'] })
// })

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



// router.post('/delete/:id', isAdmin, async (req, res) => {
//     try {
//         // await Article.findById(req.params.id)
//         await Article.findOneAndDelete({ _id: req.params.id })
//         return res.json({
//             status: 200,
//             error: false,
//         })

//     } catch (e) {
//         return res.json({
//             status: false,
//             error: e
//         })
//     }
// })


function saveArticleAndReturn(path) {
    return async (req, res) => {
        let article = req.article
        
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.author = req.body.author
        article.imageLink = req.body.imageLink
        
        try {
            article = await article.save()
            return res.redirect(`/blogs/view/${article.slug}`)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}


module.exports = router