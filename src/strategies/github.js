const passport = require('passport');
const { Strategy } = require('passport-github2');
const GitHubUser = require('../database/schemas/GithubUser');

passport.serializeUser((user, done) => {
    console.log('Serializing User...');
    console.log(user);
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User');
    console.log(id);
    try {
      const user = await DiscordUser.findById(id);
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
            clientID: '00641107bc1aa4749878',
            clientSecret: '3918e6bb0ee3136723c38ee875af198f9b066ec0',
            callbackURL: 'http://localhost:3001/api/v1/auth/github/redirect',
            scope: ['user:email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(accessToken, refreshToken);
            console.log(profile);
            const githubuser = await GitHubUser.findOne({ githubId: profile.id });
            try{
                if (githubuser) {
                    console.log('Found User!: ${githubuser}')
                    return done(null, githubuser);
                } else {
                    const newUser = await GitHubUser.create({
                        githubId: profile.id,
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