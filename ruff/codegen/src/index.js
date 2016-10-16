$.ready(function (error) {
var http = require('http');

var s_net_121_201_69_165_8000_variables_abc;
var s_net_121_201_69_165_8000_variables_abc_isnew;
var s_net_121_201_69_165_8000_variables_abc_isinit;
var s_remp_RelativeHumidity;
var s_remp_Temperature;


$('#lcd').setCursor(0, 0);

var postData = '{"abc": 123}';
var options = {hostname: '121.201.69.165', port: 8000, path: '/variables/add',
method: 'POST', headers: {'Content-Length': postData.length, 'Content-Type': 'application/json'}};var req = http.request(options, function(res) {
var data;
res.on('data', function (chunk) {console.log(chunk)});
res.setEncoding('utf8');})
req.write(postData);
req.end();
$('#button').on('push', function (error) {

var postData = '[1, 2, 3]';
var options = {hostname: '121.201.69.165', port: 8000, path: '/set_config',
method: 'POST', headers: {'Content-Length': postData.length, 'Content-Type': 'application/json'}};var req = http.request(options, function(res) {
var data;
res.on('data', function (chunk) {console.log(chunk)});
res.setEncoding('utf8');})
req.write(postData);
req.end();});
$('#sound').on('sound', function (error) {
if (s_remp_Temperature>20) {

$('#led-r').turnOn();
}});

setInterval(function() {
if((s_net_121_201_69_165_8000_variables_abc_isnew && s_net_121_201_69_165_8000_variables_abc)) {

console.log('asdfsfsadfasdf');
$('#lcd').clear();

$('#lcd').print(s_net_121_201_69_165_8000_variables_abc+'');
};
if((s_remp_Temperature>50) || (s_remp_RelativeHumidity>99)) {

$('#lcd').clear();

$('#lcd').print(s_remp_Temperature + 'k' + s_remp_RelativeHumidity);
};

if(s_net_121_201_69_165_8000_variables_abc_isnew || !s_net_121_201_69_165_8000_variables_abc_isinit) {
s_net_121_201_69_165_8000_variables_abc_isinit = 1;
var options = {hostname: '121.201.69.165', port: 8000, path: '/variables/abc',
method: 'GET'};var req = http.request(options, function(res) {
var data;
res.on('data', function (chunk) {data = data + chunk;});
res.on('end', function() {
s_net_121_201_69_165_8000_variables_abc = JSON.parse(data.replace('undefined', ''));
s_net_121_201_69_165_8000_variables_abc_isnew = 1;})
res.setEncoding('utf8');})
req.end()};$('#remp').getRelativeHumidity(function(error, val) { s_remp_RelativeHumidity = val; });
$('#remp').getTemperature(function(error, val) { s_remp_Temperature = val; });
}, 
800)
}
);
