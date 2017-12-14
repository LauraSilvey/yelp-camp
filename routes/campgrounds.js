var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Index - Show all campgrounds
router.get("/", function(req, res){
  //Get all campgrounds from database
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/index", { campgrounds: campgrounds, currentUser: req.user });
    }
  });  
});

//Create  - add a new campgound to db
router.post("/", isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author,
  };
  
  Campground.create(newCampground, function(err, newEntry){
    if(err){
      console.log(err);
    }else{
      
      res.redirect("/campgrounds");
    }
  });
});

//New
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//Show
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//Edit
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//Update
router.put("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Destroy 
router.delete("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if (err) {
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user._id)){
          res.render("campgrounds/edit", {campground: foundCampground});
        } else {
          res.redirect("back");
        }
        
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;