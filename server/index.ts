import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path: __dirname + "/.env",
});

import { passport } from "./core/passport";
import "./core/db";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(passport.initialize());

app.get("/auth/github", passport.authenticate("github"));

app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
        // Successful authentication, redirect home.
        console.log(res);

        res.send(req.user);
    }
);

app.listen(PORT, () => console.log("SERVER RUNNED!"));
