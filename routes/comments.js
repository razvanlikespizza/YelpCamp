var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment = require("../models/comment");
var middleware = require("../middlewares");

// COMMENTS
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, item){
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {campground: item});
    }
  });
});

router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, item){
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
          req.flash("error", "We got an error buddy!");          
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          item.comments.push(comment);
          item.save();
          req.flash("success", "Successfully created the comment!");          
          res.redirect("/campgrounds/" + item._id);
        }
      })
    }
  });
});

router.get("/:comment_id/edit", middleware.commentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, comment){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: comment});
    }
  });
});

router.put("/:comment_id", middleware.commentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:comment_id", middleware.commentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Comment deleted!!");                  
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});

module.exports = router;