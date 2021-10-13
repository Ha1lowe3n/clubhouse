import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import sharp from "sharp";
import fs from "fs";

dotenv.config({
    path: __dirname + "/.env",
});

import { passport } from "./core/passport";
import "./core/db";

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: function (_, __, cb) {
            cb(null, "public/avatars");
        },
        filename: function (_, file, cb) {
            cb(
                null,
                `${file.fieldname}-${Date.now()}.${file.originalname
                    .split(".")
                    .pop()}`
            );
        },
    }),
});
const PORT = process.env.PORT || 7000;

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(passport.initialize());

app.post("/upload", upload.single("photo"), (req, res, next) => {
    const filePath = req.file.path;

    sharp(filePath)
        .resize(150, 150)
        .toFormat("jpg")
        .toFile(filePath.replace("photo", "avatar"), (err) => {
            if (err) {
                throw new Error(err.message);
            }

            fs.unlinkSync(filePath);

            res.json({
                url: `avatars/${req.file.filename.replace("photo", "avatar")}`,
            });
        });
});

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
