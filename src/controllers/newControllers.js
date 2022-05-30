const Blogs = require('./../models/blogs')
const Testimonials = require('./../models/testimonials')
const ContactForm = require('./../models/contactForm')



const createNewBlog = async(req, res) => {
    try {
        console.log("oho")
        const newBlog = new Blogs({
            title: req.body.title,
            description: req.body.description,
            markdown1: req.body.markdown1,
            markdown2: req.body.markdown2,
            author: req.body.author,
            imageLink: req.body.imageLink,
            blogImgLink1: req.body.imageLink2,
            blogImgLink2: req.body.imageLink2,
            quote: req.body.quote
        })
        await newBlog.save();
        return res.status(200).json({
            code: 200,
            message: "New Blog Created!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error, code: 500 })
    }
}


const deleteBlog = async(req, res) => {
    try {
        const blog = await Blogs.deleteOne({ _id: req.params.id})
        return res.status(200).json({
            code: 200,
            message: "Blog Deleted!"
        })
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}

const udpateBlog = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}


const createNewTestimonial = async(req, res) => {
    try {
        const newTestimony = new Testimonials({
            name: req.body.name,
            testimony: req.body.content
        })
        await newTestimony.save()
        return res.status(200).json({
            code: 200,
            message: "New Testimony Added!"
        })
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}


const updateTestimony = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}


const deleteTestimony = async(req, res) => {
    try {
        const testimony = await Testimonials.deleteOne({ _id: req.params.id})
        return res.status(200).json({
            code: 200,
            message: "Testimony Deleted!"
        })
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}



const createContactQuery = async(req, res) => {
    try {
        const query = new ContactForm({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            query: req.body.query
        })
        await query.save()
        return res.status(200).json({
            code: 200,
            message: "New Contact Query Received!"
        })        
    } catch (error) {
        return res.status(500).json({ error, code: 500 })

    }
}


const changeStatusContactForm = async(req, res) => {
    try {
        console.log(req.body.status)
        const query = await ContactForm.findOneAndUpdate({ _id: req.params.id}, {
            $set: {
                status: req.body.status
            },
        })
        console.log(query)
        return res.status(200).json({
            code: 200,
            message: "udpated!"
        })
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}

const deleteQuery = async(req, res) => {
    try {
        const query = await ContactForm.deleteOne({ _id: req.params.id})
        return res.status(200).json({
            code: 200,
            message: "Query Deleted!"
        })
    } catch (error) {
        return res.status(500).json({ error, code: 500 })
    }
}




module.exports = {
    createNewBlog,
    udpateBlog,
    deleteBlog,
    createNewTestimonial,
    updateTestimony,
    deleteTestimony,
    changeStatusContactForm,
    createContactQuery,
    deleteQuery
}