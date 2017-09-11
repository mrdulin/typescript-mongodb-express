
import { formatDate, formatDatetime } from './date';
import { createPagination } from './pagination';
import { stripScript } from './script';
import { isActive } from './link';
import { Request, Response, NextFunction } from "express";

/**
 * Helpers method
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

function helpers(name: string) {
  return function (req: Request, res: Response, next: NextFunction) {

    res.locals.appName = name || 'App';
    res.locals.title = name || 'App';
    res.locals.req = req;
    res.locals.isActive = isActive;
    res.locals.formatDate = formatDate;
    res.locals.formatDatetime = formatDatetime;
    res.locals.stripScript = stripScript;
    res.locals.createPagination = createPagination(req);

    // if (typeof req.flash !== 'undefined') {
    //   res.locals.info = req.flash('info');
    //   res.locals.errors = req.flash('error');
    //   res.locals.success = req.flash('success');
    //   res.locals.warning = req.flash('warning');
    // }

    next();
  };
}

export default helpers;


