const Blogs = require('./../models/blogs')


const getBlogBySlug = (id) => {
    try {
        const blog = await Blogs.findOne({ slug: id })
        if(blog){
            return {
                blog
            } 
        } else {
            throw "Blog Not Found!"
        }
    } catch (error) {
        return { error }
    }   
}

module.exports = {
    getBlogBySlug
}