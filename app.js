var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Morro Dunes RV Park", image: "http://images.goodsam.com/trailerlifedirectory/largefeatured/1000x/pho_100006986_06.jpg"},
    {name: "White Wolf Campground", image: "http://www.parkcamper.com/Yosemite-National-Park/white-wolf-campground-yosemite.jpg"},
    {name: "Manzanita Lake Campground", image: "http://www.parkcamper.com/LV/Manzanita-Lake-campground-Lassen-Volcanic-NP.jpg"},
  ]

  res.render("campgrounds", { campgrounds })
});

app.post("/campgrounds", function(req, res){
  res.send("this is the post route")
  //get data from form and add to campgrounds array
  //redirect to campgrounds page
});

app.listen(3000);