const Blogs = require('./../models/blogs')


const showOneBlog = async(req, res) => {
    try {
        const blog = await Blogs.findOne({ slug: req.params.id })
        if(blog){
            return res.render('blogs-single', {
                blog
            })
        } else {
            throw "No Blog With such Slug"
        }   
    } catch (error) {
        return res.status(500).json({ code: 500, error})
    }
}

module.exports = {
    showOneBlog
}