var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds"),
    app        = express();

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res){
  res.render("home");
});  

app.get("/campgrounds", function(req, res){
  //Get all campgrounds from database
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/index", { campgrounds });
    }
  });  
});

app.post("/campgrounds", function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description,
  }
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newEntry){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});

//Show
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// ===============
// Comments Routes
// ===============

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", { campground });
    }
  });  
});

app.listen(3000);