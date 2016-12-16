var http = require("http");
var serverHelper = require("./bin/helper/server");
var handle404 = require('./bin/helper/handel404').handle404;
var route = require('./bin/helper/route');

var cache = {};
var process = 23000;
var onRequest = function(request, response) {
    if (request.url === '/') {
        serverHelper.serverStatic(response, cache, './public/index.html');
    } else {
        //路由映射
        var result = route.pathSet(request,response);
        if (result) {
            result.action.apply(this, result.args);
        } else {
            //处理404请求
            handle404(response);
        }
    }
};
var onConnect = function () {
    console.log('connection is success!')
};

function init () {
    http.createServer(onRequest).listen(process, onConnect);
    route.use('/user/:username', 'get', function (req, res, name) {
        //在这里处理请求的响应

        debugger
    });
}

init();
