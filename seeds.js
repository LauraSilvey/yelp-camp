var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Morro Dunes RV Park",
    image: "http://images.goodsam.com/trailerlifedirectory/largefeatured/1000x/pho_100006986_06.jpg",
    description:  "Located across the street from Atascadero Beach and Morro Rock"
  },
  {
    name: "White Wolf Campground", 
    image: "http://www.parkcamper.com/Yosemite-National-Park/white-wolf-campground-yosemite.jpg",
    description: "Nestled above the Yosemite Valley.  Running water, but no showers.  Tent camping only."
  },
  {
    name: "Manzanita Lake Campground", 
    image: "http://www.parkcamper.com/LV/Manzanita-Lake-campground-Lassen-Volcanic-NP.jpg",
    description: "Conveniently located near the northern entrance to Lassen National Park."
  }
  
];

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds");
      //Add a few campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if (err) {
            console.log(err);
          } else {
            console.log("added campground");
            //Create a comment
            Comment.create(
              {
                text: "I love this place",
                author: "Laura",
              }, function(err, comment){
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log('create comment');
                } 
            }); 
          }
        });  
      });
    }  
  });
}

module.exports =  seedDB;
