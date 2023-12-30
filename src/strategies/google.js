const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const GoogleUser = require('../database/schemas/GoogleUser');

passport.serializeUser((user, done) => {
    console.log('Serializing User...');
    console.log(user);
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User');
    console.log(id);
    try {
      const user = await GoogleUser.findById(id);
      if (!user) throw new Error('User not found');
      console.log(user);
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, null);
    }
  });

  passport.use(
    new Strategy(
        {
            clientID:     '366091449926-boc8a1vqckmoq561tdi60nejhavoadoe.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
            scope: ['email', 'profile']
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(accessToken, refreshToken);
            console.log(profile);
            const googleuser = await GoogleUser.findOne({ googleId: profile.id });
            try{
                if (googleuser) {
                    console.log('Found User!: ${googleuser}')
                    return done(null, googleuser);
                } else {
                    const newUser = await GoogleUser.create({
                        googleId: profile.id,
                    });
                    console.log('Created User!: ${newUser}')
                    return done(null, newUser);
                }
            } catch (err) {
                console.log(err);
                return done(err, null);
            }
        }
    )
);