var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middlewares");

router.get("/", function(req, res) {
  Campground.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: items});
    }
  });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.input_name;
  var imgUrl = req.body.img_url;
  var descrp = req.body.input_description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newObj = {
    name: name,
    img: imgUrl,
    description: descrp,
    price: price,
    author: author
  };
  Campground.create(newObj, function(err, item) {
    if (err) {
      console.log(err);
    } else {
      console.log("*** item ADDED ***");
      console.log(item);
      res.redirect("/campgrounds");
    }
  });
});
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

router.get("/:id", function(req ,res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, item) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: item});
    }
  });
});
// EDIT
router.get("/:id/edit", middleware.campgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
      res.render("campgrounds/edit", {campground: campground});
  });
});
// Update
router.put("/:id", middleware.campgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROYYYY
router.delete("/:id", middleware.campgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;