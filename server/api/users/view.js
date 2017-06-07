const moment = require('moment')
const Users = require('../../models').Users

module.exports = (req, res) => {
    if (req.isAuthenticated()) {
        var user = req.user
        var dateOfBirth = moment(user.dateOfBirth).format('DD-MM-YYYY')
        var response = {
            status: 'Success',
            message: 'User Found',
            user: {
                name: user.name,
                dateOfBirth,
                status: user.status,
                email: user.email
            }
        }
        res.json(response)
    } else {
        var email = req.params.email
        if (email) {
            Users.findOne({ email: email }, function (err, user) {
                if (err) {
                    var response = {
                        status: 'Fail',
                        message: 'Please try again'
                    }
                    res.json(response)
                } else {
                    if (user) {
                        var dateOfBirth = moment(user.dateOfBirth).format('DD-MM-YYYY')
                        var response = {
                            status: 'Success',
                            message: 'User Found',
                            user: {
                                name: user.name,
                                dateOfBirth,
                                status: user.status,
                                email: user.email
                            }
                        }
                        res.json(response)
                    } else {
                        var response = {
                            status: 'Fail',
                            message: 'User not found'
                        }
                        res.json(response)
                    }
                }
            })
        } else {
            var response = {
                status: 'Fail',
                message: 'No parameters recieved'
            }
            res.json(response)
        }
    }
}
