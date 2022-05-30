const Blogs = require('./../models/blogs')
const Testimonial = require('./../models/testimonials')


const getAllIndexDetails = async() => {
    try {
        const blogs = await Blogs.find({})
        const testimonials = await Testimonial.find({})

        let data = {
            blogs,
            testimonials
        }
        return { data }
    } catch (error) {
        return {error}
    }
}

module.exports = {
    getAllIndexDetails
}