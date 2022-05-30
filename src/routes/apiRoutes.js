const { createNewBlog, createContactQuery, createNewTestimonial, deleteBlog, deleteTestimony, deleteQuery, changeStatusContactForm } = require('../controllers/newControllers')
const { verifyAdmin } = require('../services/verifyAdmin')

const router = require('express').Router()


router.post('/create-new-blog', verifyAdmin, createNewBlog)

router.post('/delete-blog/:id', verifyAdmin, deleteBlog)

router.post('/new-contact-query', createContactQuery)

router.post('/update-query-status/:id', verifyAdmin, changeStatusContactForm)

router.post('/delete-query/:id', verifyAdmin, deleteQuery)

router.post('/new-testimony', verifyAdmin, createNewTestimonial)

router.post('/delete-testimony/:id', verifyAdmin, deleteTestimony)



module.exports = router