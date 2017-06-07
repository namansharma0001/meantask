const router = require('express').Router()

const users = require('./users')
const Posts = require('../models').Posts
var mongoose = require('mongoose');



router.post('/register', users.register)
router.post('/login', users.login)
router.get('/view/:email', users.view)
router.post('/edit', users.edit)
router.post('/logout', users.logout)

var mongoose = require('mongoose');

router.get('/posts', function(req, res, next) {
  Posts.find(function (err, products) {
    if (err) return next(err);
    console.log(products);
    res.json(products);
  });
});

router.delete('/post/:id', function(req, res, next) {
  Posts.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/post/new', function(req, res, next) {
  console.log(req.body);
  if(req.body.author && req.body.title){
    req.body._id = mongoose.Types.ObjectId();

    Posts.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }

});
module.exports = router;
