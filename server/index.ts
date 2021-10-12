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
        // скрипт закрывает окно аутентификации и отправляет данные юзера в localStorage
        // 2 параметр в postMessage - URL страницы, куда мы отправляем данные
        res.send(
            `<script>window.opener.postMessage('${JSON.stringify(
                req.user
            )}', 'http://localhost:3000');window.close();</script>`
        );
    }
);

app.listen(PORT, () => console.log("SERVER RUNNED!"));
