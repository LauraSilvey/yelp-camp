var express          = require("express"),
    dotenv           = require('dotenv').config(),
    LocalStrategy    = require("passport-local"),
    bodyParser       = require("body-parser"),
    expressSanitizer = require('express-sanitizer'),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    session          = require("express-session"),
    MongoDBStore     = require("connect-mongodb-session")(session),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
    app              = express();


//Requiring Routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";

mongoose.connect(url, {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

//Passport Config
var store = new MongoDBStore(
  {
    uri: process.env.DATABASEURL,
    collection: "myYelpSessions"
  });

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
        maxAge: 86400000 // 24 hours
      },
  store: store,
  resave: true,
  saveUninitialized: true,
}));
console.log("uri", store);
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
 app.use("/campgrounds/:id/comments", commentRoutes);
 app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT || 3000, function(){
 console.log('app running at port 3000...');
});