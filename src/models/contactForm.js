const mongoose = require('mongoose')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom');
const { marked } = require('marked');
const dompurify = createDomPurify(new JSDOM().window)

const contactFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    query: String,
    status: {
        type: String,
        default: 'unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


contactFormSchema.pre('validate', function(next) {
    if(this.query){
        this.query = dompurify.sanitize(marked(this.query))
    }
    next()
})

module.exports = mongoose.model('ContactForm', contactFormSchema)