const mongoose = require('mongoose')

const testimonial = new mongoose.Schema({
    name: String,
    testimony: String
})

module.exports = mongoose.model('Testimonial', testimonial);