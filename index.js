const memoryjs = require('memoryjs');
const http = require('http');
const fs = require('fs');
const processName = "Titanfall2.exe";
//const processName = "r5apex.exe";

const htmlCode = fs.readFileSync("disp.html", "utf8");

// WEB SERVER
var server=http.createServer(function(request,response){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write('<meta http-equiv="refresh" content="0.1;" />');
  response.write(fs.readFileSync("speed.txt","utf8"));
  response.end();
});
server.listen(7000);

var process = memoryjs.openProcess(processName);

setInterval(function() {
  var clientModule = memoryjs.findModule("client.dll", process.th32ProcessID);
  var address1 = memoryjs.readMemory(process.handle, clientModule.modBaseAddr + 0x2A9EEB8, "ptr");
  var pilotVelocity = memoryjs.readMemory(process.handle, address1 + 0x884, "float");
  //console.log(pilotVelocity);
  fs.writeFileSync("speed.txt",Math.floor(pilotVelocity/12)+"kph");
},100);
