const path = require('path')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongodbStore = require('connect-mongo')(session)

const api = require('./server/api')
const dbUrl = require('./server/enviornment').dbUrl

const app = express()

const cookieExpirationDays = 365
const cookieExpirationDate = new Date()
app.use(cookieParser('qwertyuiop123456789'))
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays)

app.use(session({
    name: 'session',
    store: new mongodbStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600
    }),
    secret: 'qwertyuiop123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: cookieExpirationDate
    }
}))

app.use(passport.initialize())
app.use(passport.session())

require('./server/common/passport')(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api', api)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
    if (err) {
      console.log('Build Angular Project!!!')
    }
  })
})
const port = process.env.PORT || '3000'

app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => console.log(`Server started on port ${port}.`))
