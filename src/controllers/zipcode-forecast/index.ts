import * as express from 'express';
import * as core from "express-serve-static-core";
const ForecastIo = require('forecastio');
const zipdb = require('zippity-do-dah');

const router: core.Router = express.Router();
const apiKey: string = '3df89f5a467bec0e45f61829971072b2';
const forecastIo = new ForecastIo(apiKey, {
  timeout: 10 * 1000
});

router
  /**
   * 首页
   */
  .get('/', (req: core.Request, res: core.Response) => {
    res.render('zipcode-forecast/index');
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

    const latitude = location.latitude;
    const longitude = location.longitude;

    forecastIo.forecast(latitude, longitude).then((data: any) => {
      res.json({
        zipcode,
        temperature: data.currently.temperature
      });
    }, (err: any) => {
      next(err);
    });
  });

export default router;
