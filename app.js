const express = require("express");
const app = express();
const path = require("path");


const mongoose = require("mongoose");
const Event = require("./models/event.js");
const Insight = require("./models/insight.js");
const Question = require("./models/question.js");
const Answer = require("./models/answer.js");
const Job = require("./models/job.js");
const Chat = require("./models/chat.js");



const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {eventSchema, insightSchema} = require("./schema.js");

var methodOverride = require('method-override');;
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")))

app.use('/Assets', express.static('Assets'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

// require express-session
const session = require("express-session");
const flash = require("connect-flash");

// passport
const passport = require("passport");
const LocalStratagy = require("passport-local");
const User = require("./models/user.js");

const {isLoggedIn, saveRedirectUrl, isOwner, validateEvent, validateInsight, isInsightProvider, validateQuestion, isQuestionWriter, validateAnswer, isAnswerProvider} = require("./middleware.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/ConneXion";

const eventsRouter = require("./routes/event.js");
const insightSRouter = require("./routes/insight.js");
const questionRouter = require("./routes/question.js");
const answerRouter = require("./routes/answer.js");
const userRouter = require("./routes/user.js");
const jobsRouter = require("./routes/jobs.js");
const user = require("./models/user.js");
const { func } = require("joi");

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    mongoose.connect(MONGO_URL);
}



// define session object
const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    httpOnly: true
}

app.get("/", (req, res) => {
    res.send("Hi, i am root");
});

app.use(session(sessionOption));
app.use(flash());  // we are going to use flash in our routes so flash should be first then routes

// [we always use passport after session objects bcz we need that bcz when user want to go one route to another we have to store user info...]

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash message middleware

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    const route = req.path.split("/")[1]; // Get the first part of the path
    res.locals.activePage = route || "ConneXion"; // Default to "dashboard" if empty
    next(); // remember don't forgot to call next otherwise we'll stuck on this middleware only
});


app.get("/connexion", async(req, res) => {
    if(!req.user) {
        res.render("index.ejs");
    }  else if(req.user && req.user.genre == "Admin") {
        const users = await User.find({});
        res.render("admin.ejs", {users});
    } else {
        const allEvents = await Event.find({});
        const allJobs = await Job.find({}).populate("jobPostedUser");
        const allQuestions = await Question.find({}).populate({path: "answers", populate: {path: "ansAuthor"}}).populate("queAuthor");
        const branchQuestions = await Question.find({branch: req.user.branch});
        const allUsers = await User.find({});
        const allInternships = await Job.find({jobType: 'Internship'});
        res.render("afterlogin.ejs", {allEvents, allQuestions, branchQuestions, allJobs, allUsers, allInternships});
    }
});


app.get("/chats", async(req, res) => {
    const allUsers = await User.find();
    res.render("./chats/chatIndex.ejs", {allUsers});
});

app.get("/ConneXion/user/:id", async(req, res) => {
    let {id} = req.params;
    console.log(id);
    let user = await User.findById(id);
    res.render("admin/showUser.ejs", {user});
});

app.put("/ConneXion/user/:id", async (req, res) => {
    const { id } = req.params;
    const {username, genre, branch, batch } = req.body.user;

    const user = await User.findById(id);
    user.username = username;
    user.genre = genre;
    user.branch = branch;
    user.batch = batch;

    // DO NOT reset password

    await user.save();
    req.flash("success", "Detail Updated Successfully");
    res.redirect("/ConneXion");
});


// -----------------------------------
const http = require('http').createServer(app);  // Important
const io = require("socket.io")(http);

let usp = io.of('/user-namespace'); // usp = usernamespace
usp.on('connection', async function(socket) {
    console.log('User Connected');

    let userId = socket.handshake.auth.token;
    // console.log(userId);

    await User.findByIdAndUpdate({_id: userId}, {$set: {is_online:'1'}});

    // user broadcast online status
    socket.broadcast.emit('getOnlineUser', { user_id: userId});

    socket.on('disconnect', async function() {
    await User.findByIdAndUpdate({_id: userId}, {$set: {is_online:'0'}});
        console.log('user disconnected');
        socket.broadcast.emit('getOfflineUser', { user_id: userId});
    });

    // user broadcast ofline status
    
});

app.post("/save-chat", async(req, res) => {
    try {
        let chat = new Chat({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            message: req.body.message
        });

        let newChat = await chat.save();
        req.flash("success", "chat inserted");
        res.status(200).send({success:true, mas: 'chat inserted', data: newChat});
    } catch (error) {
        res.status(400).send({"error": msg});
    }
})


// ___________events_________________ 

app.use("/events", eventsRouter);

// ___________insights_______________

app.use("/events/:id/insights", insightSRouter);

// ___________questions_______________

app.use("/qna", questionRouter);

// ___________answers________________

app.use("/qna/:id", answerRouter);

// ___________jobs_________________ 

app.use("/jobs", jobsRouter);

// ___Login, Signup and Signout______

app.use("/", userRouter);

app.get("/alumnis", async(req, res) => {
    const alumnis = await User.find({genre: "Alumni"});
    console.log(alumnis);
    res.render("alumniDirectory/aluIndex.ejs", {alumnis});
})


// _________error handling middleware

app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("events/eventError.ejs", {message});
});


http.listen(8080, () => {
    console.log("app listening to port 8080");
});