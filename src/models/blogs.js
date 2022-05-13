const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


const BlogSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    }, 
    description: {
        type: String
    }, 
    markdown1: {
        type: String, 
        required: true
    }, 
    markdown2: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    author: {
        type: String,
        required: false
    }, 
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml1: {
        type: String,
        required: true
    },
    sanitizedHtml2: {
        type: String
    },
    imageLink: {
        type: String,
        default: "https://mdbootstrap.com/img/Photos/Others/images/77.jpg"
    },
    blogImgLink1: {
        type: String,
        default: "https://mdbootstrap.com/img/Photos/Others/images/77.jpg"
    },
    blogImgLink2: {
        type: String,
        default: "https://mdbootstrap.com/img/Photos/Others/images/77.jpg"
    },
})

BlogSchema.pre('validate', function (next) {
    if (this.title){
        this.slug = slugify(this.title, {lower: true, 
            strict: true})
    }
    if(this.markdown){
        this.sanitizedHtml1 = dompurify.sanitize(marked(this.markdown1))
        this.sanitizedHtml2 = dompurify.sanitize(marked(this.markdown2))
    }
    next()
})

module.exports = mongoose.model('Blogs', BlogSchema)