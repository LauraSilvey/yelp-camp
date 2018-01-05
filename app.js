var express          = require("express"),
    LocalStrategy    = require("passport-local"),
    bodyParser       = require("body-parser"),
    expressSanitizer = require('express-sanitizer'),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    session          = require("express-session"),
    MongoDBStore     = require("connect-mongod-session")(session),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
    app              = express();

var store = new MongoDBStore(
  {
    uri: "mongodb://Laura:pw1234$@ds139067.mlab.com:39067/myyelpcampproject",
    collection: "cookieSessions"
  });

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

//Requiring Routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.connect("mongodb://Laura:pw1234$@ds139067.mlab.com:39067/myyelpcampproject", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

//Passport Config
app.use(require("express-session")({
  secret: "temp",
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
  store: store,
  resave: true,
  saveUninitialized: true,
}));
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