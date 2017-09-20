import { Application } from 'express';
import { Passport } from 'passport';
import { Strategy, Profile } from 'passport-facebook';
import { User, IUser, IUserMethods } from '../models/user';

interface IProviders {
  [key: string]: any;
}

interface IAuthOptions {
  providers: IProviders;
  successRedirect: string;
  failedRedirect: string;
}

export default (app: Application, passport: Passport, opts: IAuthOptions) => {

  const defaultOptions: IAuthOptions = {
    providers: {},
    successRedirect: '/',
    failedRedirect: '/login'
  };

  opts = Object.assign({}, defaultOptions, opts);

  const env: string = app.get('env');
  const providers: IProviders = opts.providers;
  User.db = app.get('db');

  passport.use(new Strategy({
    clientID: providers.facebook[env].appId,
    clientSecret: providers.facebook[env].appSecret,
    callbackURL: '/auth/facebook/callback'
  }, (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => {
    const authId: string = profile.id;
    User.findById(authId).then((user: IUser & IUserMethods) => {
      if (user) return done(null, user);
      user = new User({ authId, name: profile.displayName, created: Date.now(), role: 'customer' });
      user.save().then(() => {
        done(null, user);
      }).catch(done);
    }).catch(done);
  }));
};
