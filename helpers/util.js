exports.setupController = function(controllerNames, app) {
    controllerNames.map(function (controllerName) {
        app.use('/' + controllerName, require(__base + 'controllers/' + controllerName));
    })
}