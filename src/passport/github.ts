import { Application } from 'express';
import { Passport } from 'passport';
import { Strategy, Profile } from 'passport-github';
import { User, IUser, IUserMethods } from '../models/user';
import { IAuthOptions, IProviders } from './';

export default (app: Application, passport: Passport, options?: IAuthOptions) => {

  const defaultOptions: IAuthOptions = {
    providers: {},
    successRedirect: '/',
    failedRedirect: '/login'
  };

  const opts: IAuthOptions = Object.assign({}, defaultOptions, options);

  const env: string = app.get('env');
  const providers: IProviders = opts.providers;

  passport.use(new Strategy({
    clientID: providers.github[env].clientId,
    clientSecret: providers.github[env].clientSecret,
    callbackURL: '/auth/github/callback'
  }, (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => {
    const authId: string = 'github:' + profile.id;
    User.findById({ authId }).then((user: IUser & IUserMethods) => {
      if (user) return done(null, user);
      user = new User({ authId, name: profile.displayName, created: Date.now(), role: 'customer' });
      user.save().then(() => {
        done(null, user);
      }).catch(done);
    }).catch(done);
  }));
};
