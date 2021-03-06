const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      User = require("./models/user"),
      methodOverride = require("method-override"),
      flash = require("connect-flash"),
      SeedDB = require("./seeds");
const commentRoutes = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index");


mongoose.connect(process.env.DBSTRING, {useNewUrlParser: true, useUnifiedTopology: true});



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
// SeedDB();

//PASSPORT
app.use(require("express-session")({
  secret: "I love cats",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
// app.listen(3000, "localhost", function() {
//   console.log("**********");
//   console.log("Server started");
//   console.log("**********");
// });
app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("Server listening...");
});