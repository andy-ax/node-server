var http = require("http");
var serverHelper = require("./bin/helper/server");

var cache = {};
var process = 23000;
var onRequest = function(request, response) {
    if (request.url === '/') {
        serverHelper.serverStatic(response, cache, './public/index.html');
    } else if (request.url === '/getdata') {
        response.writeHead(200,{
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });
    }
    response.on('finish',function (data) {

    });
};
var onConnect = function () {
    console.log('connection is success!')
};
http.createServer(onRequest).listen(process, onConnect);
