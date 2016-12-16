var url = require('url');

var routes = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: []
};
//映射方法
//:username关键字匹配用户名
/**
 *
 * @param path
 * @param type
 * @param action
 */
var use = function (path, type, action) {
    //noinspection JSDuplicatedDeclaration
    var type = type.toUpperCase();

    if (path.indexOf(':username') > -1) {
        path = path.replace(/\:username/g,'([0-9a-zA-Z_]+)');
    }
    path = new RegExp('^' + path + '$');

    routes[type].push({
        path: path,
        action: action
    });
};

/**
 *
 * @param req
 * @param res
 * @return {{action: *, args: (*)} || boolean}
 */
var pathSet = function(req,res) {
    var route,
        i,
        len,
        result,
        args,
        type = req.method,
        pathname = url.parse(req.url).pathname;

    for (i = 0,len = routes[type].length; i < len; i++) {
        route = routes[type][i];
        result = route.path.exec(pathname);
        if (result) {
            route.path.lastIndex = 0;
            result.shift();
            //将req,res与匹配项叠加
            args = Array.prototype.slice.call(arguments,0).concat(result);

            return {
                action: route.action,
                args: args
            };
        }
    }
    return false;
};

exports.pathSet = pathSet;
exports.use = use;
