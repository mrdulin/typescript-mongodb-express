import { User, IUser, IUserMethods } from '../models/user';
import * as passport from 'passport';
import { Strategy, Profile } from 'passport-facebook';
import { Application } from 'express';

interface IProviders {
  [key: string]: any;
}

interface IAuthOptions {
  providers: IProviders;
  successRedirect: string;
  failedRedirect: string;
}

export interface IAuth {
  init(): void;
  registerRoutes(): void;
}

export const authFactory = (app: Application, options: IAuthOptions): IAuth => {

  const defaultOptions: IAuthOptions = {
    providers: {},
    successRedirect: '/',
    failedRedirect: '/login'
  };

  const opts: IAuthOptions = Object.assign({}, defaultOptions, options);

  User.db = app.get('db');

  passport.serializeUser((user: IUser, done: (err: any, id?: any) => void) => {
    done(null, user._id);
  });

  passport.deserializeUser((id: string, done: (err: any, user?: IUser) => void) => {
    User.findById(id).then((user: IUser) => {
      done(null, user);
    }).catch(done);
  });

  return {
    init() {
      const env: string = app.get('env');
      const providers: IProviders = options.providers;

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

      app.use(passport.initialize());
      app.use(passport.session());
    },

    registerRoutes() {

    }
  };

};
