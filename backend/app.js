require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 6005;
require("./connect/conn");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const userdb = require("./Model/userSchema");

const clientID = process.env.CID
const clientSecret = process.env.CSECRET;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(express.json());

// setup session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async(accessToken, refreshToken, profile, done)=>{
        console.log('profile', profile);
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if (!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null, user)
        } catch (error) {
            return done(error, null);
        }
    }
    )
)

// Serialize user
passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

app.get("/auth/google", passport.authenticate("google",{scope:["profile", "email"]}));


app.get("/auth/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}));

app.get("/login/success", async(req,res)=>{
    if (req.user) {
        res.status(200).json({message:"Login Success", user: req.user});
    } else {
        res.status(400).json({message:"Not Authorised"});
    }
})

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
