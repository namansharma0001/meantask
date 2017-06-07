var mongoose = require('mongoose')
mongoose.Promise = global.Promise

const MONGO_URL = require('../enviornment').dbUrl

const user = require('./user')
const posts = require('./posts')


var db = mongoose.connection

db.on('error', function (error) {
    console.log('DB connection error.')
})
db.on('connected', function () {
    console.log('Connected to DB.')
})
db.on('reconnected', function () {
    console.log('Reconnected to DB.')
})
db.on('disconnected', function () {
    console.log('Disconnected from DB.')
    mongoose.connect(MONGO_URL,
        {
            server: {
                auto_reconnect: true, reconnectTries: Number.MAX_VALUE,
                socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
            }
        })
})

mongoose.connect(MONGO_URL, { server: { auto_reconnect: true, reconnectTries: Number.MAX_VALUE } })

var Users = db.model('Users', user, 'Users')
var Posts = db.model('Posts', posts, 'Posts')


module.exports = {
    Users,
    Posts
}
