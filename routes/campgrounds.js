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
router.post("/", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description,
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
router.get("/new", function(req, res){
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

module.exports = router;