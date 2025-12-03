if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// console.log(process.env.SECRET);
// console.log(process.env.API_KEY);


const sanitizeV5 = require('./Utils/mongoSanitizeV5.js');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {campgroundSchema,reviewSchema} = require('./schemas.js');
const ExpressError = require('./Utils/ExpressErrors');
const flash = require('connect-flash');
const methodOverride = require('method-override'); 
const session = require('express-session')
const MongoStore = require('connect-mongo').default;
// const { wrap } = require('module');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user.js');
const helmet = require('helmet');


const userRoutes = require('./routes/users.js')
const campgroundRoutes = require('./routes/campground.js');
const reviewRoutes = require('./routes/reviews.js');
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-camp';
const dbUrl = process.env.DB_URL;

// 'mongodb://127.0.0.1:27017/yelp-camp'
// mongoose.connect(dbUrl);
mongoose.connect(dbUrl);


const db = mongoose.connection;
db.on("error", console.error.bind(console,"Connection Error:"));
db.once("open", ()=> {
    console.log("Database Connected");
})

const app = express();
app.set('query parser', 'extended');


app.engine('ejs',ejsMate);

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))
app.use(sanitizeV5({ replaceWith: '_' }));

const store = new MongoStore({
    mongoUrl: dbUrl,
    crypto: {
        secret: "thisshouldbeabettersecret!"
    },
    touchAfter: 24 * 60 * 60
});


store.on("error",function(e){
    console.log("Session Store Error",e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized:true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",   // REQUIRED for MapTiler JS
];

const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",   // REQUIRED for MapTiler CSS
];

const connectSrcUrls = [
    "https://api.maptiler.com/",   // REQUIRED to load tiles & API calls
];

const fontSrcUrls = [];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`,
                "https://images.unsplash.com/",
                "https://api.maptiler.com/",    // REQUIRED
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use('/',userRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


app.get('/',(req,res)=>{
    res.render('home');
})


app.all(/(.*)/, (req,res,next) => {
    next(new ExpressError('Page Not Found',404))
})

app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error',{err});
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Serving on port 3000!!!");
})