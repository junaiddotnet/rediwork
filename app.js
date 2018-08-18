const redis  = require('redis');
const express  = require('express');

// set the node microservce 

const app = express();

const redisClient  = redis.createClient();

redisClient.set('key1','welcome to redis ..');
redisClient.get('key1',redis.print);
redisClient.get('key1',function(err,result){
    if (!err)
    {   
        console.log(result);
    }
});

redisClient.quit();

// start the service
app.listen(3000,function(){
    console.log('micro service is up and running ...');
});