const keys = require('./keys');
const express = require("express");
const redis = require("redis");
const process = require("process");
const app = express();
const client = redis.createClient({
    host: 'myredis-server',
    port: 6379
});

client.set('counter', 0);

app.get('/', (req, res)=>{
    res.send('Hello world');
});

app.listen(8080, ()=>{
    console.log("Listening on port 8080");
})
