import { Application } from "express-serve-static-core";

function mountRoutes(controllerNames: string[], app: Application) {
  controllerNames.map((controllerName) => {
    app.use('/' + controllerName, require(global.__base + 'controllers/' + controllerName));
  });
}

export default mountRoutes;

