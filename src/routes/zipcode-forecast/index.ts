import * as express from 'express';
import * as core from "express-serve-static-core";
import { config } from '../../config';
const ForecastIo = require('forecastio');
const zipdb = require('zippity-do-dah');

const router: core.Router = express.Router();

const forecastIo = new ForecastIo(config.forecastio_key, {
  timeout: 10 * 1000
});

router
  /**
   * 首页
   */
  .get('/', (req: core.Request, res: core.Response) => {
    const date: string = res.locals.formatDate('2017-07-23');
    console.log(res.locals.formatDate);
    res.render('./zipcode-forecast', { date });
  })

  /**
   * 根据zipcode查询天气
   */
  .get(/^\/(\d{5})$/, (req: core.Request, res: core.Response, next: core.NextFunction) => {
    const zipcode: string = req.params[0];
    const location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
      res.json({
        err_no: 1,
        msg: 'can\'t find location'
      });
      return;
    }

    const { latitude, longitude } = location;

    forecastIo.forecast(latitude, longitude)
      .then((data: any) => {
        res.json({
          zipcode,
          temperature: data.currently.temperature
        });
      })
      .catch(next);
  });

export default router;
