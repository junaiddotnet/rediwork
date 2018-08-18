const redis  = require('redis');

const client  = redis.createClient();

const express  = require('express');
const app = express();

// set the keys for article
client.exists('article:1234:headline','First Article with number 1234',function(err,response){
    if (response==0)
    {
        
        client.set('article:1234:headline','First Article with number 1234');

    }
    
});
client.set ('article:1621:headline','Second Article with number 1621');
client.set('article:1638:headline','Third Article with number 1638');
 
client.exists('article:1234:vote',function(err,response){
    console.log(err);
    if (err!=null)
    {
        client.set('article:1234:vote',0);

    }

});
client.set ('article:1621:vote',0);
client.set('article:1638:vote',0);

function UpVote(id)
{
    const key = 'article:'+id+':vote';
    client.incr(key)
}

function DownVote(id)
{
    const key = 'article:'+id+':vote';
    client.decr(key)
}
function showVote(id)
{
    const articleKey = 'article:'+id+':headline';
    const voteKey  = 'article:'+id+':vote'
   // const voteKey = 'article:1234:vote';
    console.log("show method");
    client.mget([articleKey,voteKey],function(err,response){
        response.forEach(element => {
           console.log("R"+element);
        });
      //  console.log('Article '+response[0]+' has  '+response[1]+' votes');
    });
}


UpVote(1234);
UpVote(1234);
UpVote(1234);

showVote(1234);

UpVote(1621);
UpVote(1621);
//showVote(1621);

// start the service 



app.listen(3000,function(){
    console.log('listening to port 3000...');
});