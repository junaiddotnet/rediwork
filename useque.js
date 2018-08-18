const redis  = require('redis');
const queue  = require('./queue');
const client = redis.createClient();

var size =0;
var logques = new queue.Queue('logs',client);

const Max = 5;
for (var i = 0 ; i <=Max;i++)
{
    console.log('push..');
    logques.push('Hello Junaid #'+i);
}
 /* logques.size(function(err,response){
    console.log("Size is :"+response);
    for (var ii=0;ii<response;ii++)
    {
         logques.pop(function(err,data){
            console.log(data);
        }); 
        console.log(ii); 
    }
});  */
// specify the range

logques.range(function(err,response){
    response.forEach(element => {
            console.log(element);
    });
});
// pop the value
 logques.pop(function(err,response){
    console.log(response);
});
logques.pop(function(err,response){
    console.log(response);
});



client.quit();