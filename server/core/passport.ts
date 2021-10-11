import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";

import { User } from "../../models";

console.log(User);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, cb) => {
            const userData = {
                fullname: profile.displayName,
                avatarUrl: profile.photos?.[0].value,
                isActive: 0,
                username: profile.username,
                phone: "",
            };
            const user = await User.create(userData);
            console.log(userData);
            cb();
        }
    )
);

// development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: "postgres",
// },

export { passport };
