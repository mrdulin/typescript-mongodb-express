import * as url from 'url';
import * as qs from 'querystring';
import { Request } from "express-serve-static-core";

type Clas = 'active' | 'no';
/**
 * Pagination helper
 *
 * @param {Number} pages
 * @param {Number} page
 * @return {String}
 * @api private
 */

function createPagination(req: Request) {
  return function (pages: number, page: number): string {
    const params = qs.parse(url.parse(req.url).query);
    let str: string = '';

    params.page = 1;
    let clas: Clas = page === 1 ? "active" : "no";

    for (let p = 1; p <= pages; p++) {
      params.page = p;
      clas = page === p ? "active" : "no";

      const href: string = '?' + qs.stringify(params);

      str += '<li class="' + clas + '"><a href="' + href + '">' + p + '</a></li>';
    }

    return str;
  };
}

export {
  createPagination
};
