import { Application } from 'express';
import { Passport } from 'passport';
import { User, IUser } from '../models/user';
import facebook from './facebook';
import github from './github';
import { config } from '../config';
import { ObjectID } from 'mongodb';

export interface IProviders {
  [key: string]: any;
}

export interface IAuthOptions {
  providers: IProviders;
  successRedirect: string;
  failedRedirect: string;
}

export default (app: Application, passport: Passport) => {
  User.setDb(app.get('db'));

  passport.serializeUser((user: IUser, done: (err: any, id?: any) => void) => {
    console.log('serializing user: '); console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser((id: string, done: (err: any, user?: IUser) => void) => {
    User.findById({ _id: new ObjectID(id) }).then((user: IUser) => {
      console.log('deserializing user:', user);
      done(null, user);
    }).catch(done);
  });

  const authOtions: IAuthOptions = {
    providers: config.authProviders,
    successRedirect: '/',
    failedRedirect: '/login'
  };

  facebook(app, passport, authOtions);
  github(app, passport, authOtions);
};
