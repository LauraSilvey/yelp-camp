var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", { campground: campground });
    }
  });  
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      return res.redirect("back");
    }
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        res.render("comments/edit", {
          campground_id: req.params.id, 
          comment: foundComment, 
        });
      }
    });  
  }); 
});

//Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  req.body.sanitized = req.sanitize(req.body.comment);
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.sanitized, function(err, updatedComment){
    if (err) {
      res.redirect("/back");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;