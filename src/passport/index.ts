import { Application } from 'express';
import { Passport } from 'passport';
import { User, IUser } from '../models/user';
import facebook from './facebook';
// import github from './github';
import { config } from '../config';

export default (app: Application, passport: Passport) => {
  User.db = app.get('db');

  passport.serializeUser((user: IUser, done: (err: any, id?: any) => void) => {
    console.log('serializing user: '); console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser((id: string, done: (err: any, user?: IUser) => void) => {
    User.findById(id).then((user: IUser) => {
      console.log('deserializing user:', user);
      done(null, user);
    }).catch(done);
  });

  facebook(app, passport, {
    providers: config.authProviders,
    successRedirect: '/',
    failedRedirect: '/login'
  });
};
