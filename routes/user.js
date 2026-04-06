const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")

const {saveRedirectUrl} = require("../middleware.js");

const passport = require("passport");
const User = require("../models/user.js");



// *********************************************************************************************************
// ******************************  Login, Signup and Signout Section  **************************************
// *********************************************************************************************************



router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req, res) => {
    try {
        let {username, email, password, genre, branch, batch} = req.body;
        const newUser = await User({email, username, genre, branch, batch});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to ConneXion");
            res.redirect("/ConneXion");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", async(req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), async(req, res) => {
    // req.flash("success", "welcome back to ConneXion");
    let redirectUrl = res.locals.redirectUrl || "/ConneXion";
    res.redirect(redirectUrl);
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/ConneXion");
    });
});

module.exports = router;