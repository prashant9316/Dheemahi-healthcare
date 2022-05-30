const Blogs = require('./../models/blogs')
const ContactForm = require('./../models/contactForm')
const Testimonial = require('./../models/testimonials')


const getAllAdminDetails = async() => {
    try {
        const blogs = await Blogs.find({})
        const contactQueries = await ContactForm.find({})
        const testimonials = await Testimonial.find({})

        let data = {
            blogs,
            contacts: contactQueries,
            testimonials
        }
        return { data }
    } catch (error) {
        return {error}
    }
}

module.exports = {
    getAllAdminDetails
}