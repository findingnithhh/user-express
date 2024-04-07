import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { User } from "../database/models/user";
import { hashPassword } from "../utils/hashPassword";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CLIENT_URL,
      scope: ["profile", "email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If user does not exist, create a new user
          const hashedPassword = await hashPassword(
            "aGeneratedOrProvidedPassword"
          );
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : undefined,
            password: hashedPassword,
            isVerified: true, // Set isVerified to true for OAuth Google users
          });
        } else {
          // If the user exists, update isVerified to true
          user.isVerified = true;
          await user.save();
        }

        return done(null, user);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);

// Serialize/deserialize user for session management
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
