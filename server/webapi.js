
module.exports = { handle: handle, handleGet: handleGet };
var http = require('http');
var request = require('request');


function handle(req, res) {
    // results = db.getData();
    // res.send('The solution is: ', results.length);
    // var param = req.params[""];
    console.log(req.body);
    // console.log(JSON.stringify(req.body));
    // res.render('gameid', {
    //     title: 'TITLE', 
    //     // json: (queryResult), 
    //     helpers: {
    //         json: function () { return "sdf"; }
    //     }
    // });

    // http.get({
    //     host: 'personatestuser.org',
    //     path: req.body.webapi
    // }, function(response) {
    //     // Continuously update stream with data
    //     var body = '';
    //     response.on('data', function(d) {
    //         body += d;
    //     });
    //     response.on('end', function() {

    //         // Data reception is done, do whatever with it!
    //         var parsed = JSON.parse(body);
    //         callback(body);
    //     });
    // });

    request.post({
            url: req.body.webapi,
            method: "POST",
            // json: true,   // <--Very important!!!
            form: req.body
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                res.set('Content-Type', 'text/html;charset=utf-8');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                res.send(body);
            }
        }
    );

    // var http = require("http");
    // var options = {
    //     hostname: req.body.webapihost,
    //     port: req.body.webapiport,
    //     path: req.body.webapipath,
    //     method: 'POST',
    //     // headers: {
    //     //     'Content-Type': 'application/json',
    //     // }
    // };
    // var req = http.request(options, function(res) {
    //     console.log('Status: ' + res.statusCode);
    //     console.log('Headers: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     res.on('data', function (body) {
    //         console.log('Body: ' + body);
    //     });
    // });
    // req.on('error', function(e) {
    //     console.log('problem with request: ' + e.message);
    // });
    // // write data to request body
    // req.write('{"string": "Hello, World"}');
    // req.end();

}
function handleGet(req, res) {
    console.log("get test");
    res.set('Content-Type', 'text/html;charset=utf-8');
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.send("get test");
}