var passport = require('passport')

module.exports = (req, res, next) => {
  console.log(req.body);
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.sendStatus(403)
        }
        req.login(user, error => {
            if (error) {
              console.log(error);
                var response = {
                    status: 'Fail',
                    message: 'Invalid Credentials'
                }
                res.json(response)
            } else {
                console.log(user.name + ' Logged In')
                var response = {
                    status: 'Success',
                    message: 'Logged in',
                    user:user
                }
                res.json(response)
            }
        })
    })(req, res, next)
}
