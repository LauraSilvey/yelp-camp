var express       = require("express"),
    LocalStrategy = require("passport-local"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    app           = express();

//Requiring Routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDB();

//Passport Config
app.use(require("express-session")({
  secret: "temp",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

 app.use(indexRoutes);
 app.use("/campgrounds/:id/comments", commentRoutes);
 app.use("/campgrounds", campgroundRoutes);






app.listen(3000);