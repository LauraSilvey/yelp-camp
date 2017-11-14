var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

var campgrounds = [
    {name: "Morro Dunes RV Park", image: "http://images.goodsam.com/trailerlifedirectory/largefeatured/1000x/pho_100006986_06.jpg"},
    {name: "White Wolf Campground", image: "http://www.parkcamper.com/Yosemite-National-Park/white-wolf-campground-yosemite.jpg"},
    {name: "Manzanita Lake Campground", image: "http://www.parkcamper.com/LV/Manzanita-Lake-campground-Lassen-Volcanic-NP.jpg"},
  ]

app.get("/campgrounds", function(req, res){
  

  res.render("campgrounds", { campgrounds })
});

app.post("/campgrounds", function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image,
  }
  campgrounds.push(newCampground);
  //redirect to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

app.listen(3000);