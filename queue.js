const redis  = require('redis');

// create redis client 
const client = redis.createClient();


function Queue(queueName,redisClient)
{
    this.queueName = queueName;
    this.redisClient = redisClient;
    
    this.queueKey = 'queues:'+queueName;
    this.timeout=0;
};
Queue.prototype.size = function(callback) {

    this.redisClient.llen(this.queueKey,callback);
};
Queue.prototype.range = function(callback)
{
    this.redisClient.lrange(this.queueKey,0,22,callback);
};
Queue.prototype.push = function(data)
{
    this.redisClient.lpush(this.queueKey,data);
};
Queue.prototype.pop = function(callback)
{
    this.redisClient.brpop(this.queueKey,this.timeout,callback);
};

exports.Queue=Queue;