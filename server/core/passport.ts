import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
        },
        (accessToken, refreshToken, profile, cb) => {
            const user = {
                fullname: profile.displayName,
                avatarUrl: profile.photos?.[0].value,
            };
            console.log(accessToken, refreshToken, profile, cb);
            cb();
        }
    )
);

export { passport };
