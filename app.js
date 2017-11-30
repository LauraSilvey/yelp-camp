var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    app        = express();

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



// Campground.create(
//   {
//     name: "White Wolf Campground", 
//     image: "http://www.parkcamper.com/Yosemite-National-Park/white-wolf-campground-yosemite.jpg",
//     description: "Nestled above the Yosemite Valley.  Running water, but no showers.  Tent camping only."
//   }, 
//   function(err, campground){
//        if(err){
//         console.log(err);
//        } else {
//         console.log("newly created campground: ");
//         console.log(campground);
//        }
// });

// var campgrounds = [
//     {name: "Morro Dunes RV Park", image: "http://images.goodsam.com/trailerlifedirectory/largefeatured/1000x/pho_100006986_06.jpg"},
//     {name: "White Wolf Campground", image: "http://www.parkcamper.com/Yosemite-National-Park/white-wolf-campground-yosemite.jpg"},
//     {name: "Manzanita Lake Campground", image: "http://www.parkcamper.com/LV/Manzanita-Lake-campground-Lassen-Volcanic-NP.jpg"},
//   ]


app.get("/", function(req, res){
  res.render("home");
});  

app.get("/campgrounds", function(req, res){
  //Get all campgrounds from database
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("index", { campgrounds });
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
  res.render("new");
});

//Show
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000);