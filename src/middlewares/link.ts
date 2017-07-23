import { Request } from "express-serve-static-core";

function isActive(req: Request, link: string): string {
  if (link === '/') {
    return req.url === '/' ? 'active' : '';
  } else {
    return req.url.indexOf(link) !== -1 ? 'active' : '';
  }
}

export {
  isActive
};
