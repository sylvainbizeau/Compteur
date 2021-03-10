var http = require('http');
var counter = 0;
function f(req, response)
{
  if(req.url == '/favicon.ico') return;
  response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
  counter++;
  response.write(counter.toString()) ;
  response.end();
}
var server = http.createServer(f);
server.listen(80);
