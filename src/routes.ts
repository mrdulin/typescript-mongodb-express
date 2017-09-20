import { Application, Request, Response, NextFunction } from "express";
import zipcode from './routes/zipcode-forecast';
import seed from './routes/seed';
import proExpress from './routes/pro-express';
import pagination from './routes/pagination';
import guestBook from './routes/guest-book';
import dailyEnglish from './routes/daily-english';
import staticFile from './routes/static-file';
import { uploadRoute } from './routes/upload';
import initPassport from './passport';

const setupRoutes = (app: Application) => {
  const passport = app.get('passport');
  initPassport(app, passport);

  // -- app routes start --
  app.get('/', (req: Request, res: Response) => {
    if (!req.session!.passport || !req.session!.passport.user) {
      return res.redirect(303, '/login');
    }
    res.render('index');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });
  app.use('/zipcode-forecast', zipcode);
  app.use('/seed', seed);
  app.use('/pro-express', proExpress);
  app.use('/pagination', pagination);
  app.use('/guest-book', guestBook);
  app.use('/daily-english', dailyEnglish);
  app.use('/static-file', staticFile);
  app.use('/upload', uploadRoute(app));

  app.get('/auth/facebook', (req: Request, res: Response, next: NextFunction) => {
    const redirect: string = encodeURIComponent(req.query.redirect);
    passport.authenticate('facebook', {
      successRedirect: `/auth/facebook/callback?redirect=${redirect}`
    })(req, res, next);
  });

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
  }), (req: Request, res: Response) => {
    res.redirect(303, req.query.redirect || '/');
  });

  app.get('/auth/github', (req: Request, res: Response, next: NextFunction) => {
    const redirect: string = encodeURIComponent(req.query.redirect);
    passport.authenticate('github', {
      successRedirect: `/auth/github/callback?redirect=${redirect}`
    })(req, res, next);
  });

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
  }), (req: Request, res: Response) => {
    res.redirect(303, req.query.redirect || '/');
  });


  // -- app routes end --

};

export default setupRoutes;
