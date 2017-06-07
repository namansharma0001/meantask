var Schema = require('mongoose').Schema



var user = new Schema({
    _id:String,
    name: String,
    email: String,
    password: String,
    lastUpdatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})


module.exports = user
