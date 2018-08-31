var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {
  campgroundOwnership: function(req, res, next) {
    if(req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, campground){
        if (err) {
          console.log(err);
          req.flash("error", "We got an error buddy.");          
          res.redirect("back");
        } else {
          if (campground.author.id.equals(req.user._id)) {
            next();     
          } else {
            req.flash("error", "You don't have permission to do that!");            
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You have to be logged in to do that!");
      res.redirect("back");
    }
  },
  commentOwnership: function(req, res, next) {
    if(req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          if (comment.author.id.equals(req.user._id)) {
            next();     
          } else {
            req.flash("error", "You don't have permission to do that!");            
            res.redirect("back");
          }
        }
      });
    } else {
      res.redirect("back");
    }
  },
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
     return next();
    }
    req.flash("error", "You have to be logged in to do that!");
    res.redirect("/login");
  }
};

module.exports = middlewareObj;