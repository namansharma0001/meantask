const md5 = require('md5')
const moment = require('moment')
const Users = require('../../models').Users
var mongoose = require('mongoose');


module.exports = (req, res) => {
  console.log(req.body);
    var name = req.body.username
    var email = req.body.email
    var password = req.body.password
    if (email && password && name ) {
      console.log("inside");
        var emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        var validEmail = emailRegExp.test(email)
        if (validEmail) {
            password = md5(password)
            var _id = mongoose.Types.ObjectId();
            var newUserObject = {
                _id:_id,
                name:name,
                email:email,
                password:password
            }
            var newUser = new Users(newUserObject)
            newUser.save(function (err, done) {
              if(err){
                var response = {
                    status: 'Fail',
                    message: 'Some Error Occured',
                }
                res.json(response)
              }
                console.log('Registered : ')
                console.log(newUserObject)
                var response = {
                    status: 'Success',
                    message: 'User registered',
                    user: newUser
                }
                res.json(response)
            })
        } else {
            var response = {
                status: 'Fail',
                message: 'Invalid Email'
            }
            res.json(response)
        }
    } else {
        var response = {
            status: 'Fail',
            message: 'Parameters Missing'
        }
        res.json(response)
    }
}
