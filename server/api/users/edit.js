const moment = require('moment')
const Users = require('../../models').Users

module.exports = (req, res) => {
    console.log('edit')
    if (req.isAuthenticated()) {
        var name = req.body.name
        var dateOfBirth = req.body.dateOfBirth
        var status = req.body.status

        var user = req.user

        name = name || user.name
        dateOfBirth = dateOfBirth || user.dateOfBirth
        status = status || user.status
        dateOfBirth = moment(dateOfBirth, 'DD-MM-YYYY').toDate()
        Users.update({ _id: user._id }, {
            $set: {
                name,
                dateOfBirth,
                status,
                lastUpdatedAt: new Date()
            }
        }, function (err, success) {
            if (err) {
                console.log(err)
                var response = {
                    status: 'Fail',
                    message: 'Please try again'
                }
                res.json(response)
            }
            var response = {
                status: 'Success',
                message: 'User Updated'
            }
            res.json(response)
        })

    } else {
        var response = {
            status: 'Fail',
            message: 'Please login again'
        }
        res.json(response)
    }
}