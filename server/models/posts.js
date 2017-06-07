var Schema = require('mongoose').Schema



var posts = new Schema({
    _id:String,
    title: String,
    author: String,
    content:String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = posts
