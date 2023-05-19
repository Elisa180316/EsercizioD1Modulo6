const mongoose = require('mongoose')

const PostsModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        },

    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },

    rate: {
        type: Number,
        required: false
    }
},{timestamps:true, strict: true})

module.exports = mongoose.model('postsModel', PostsModel, 'posts');