const express = require("express");
const redis = require("redis");
const process = require("process");
const app = express();
const client = redis.createClient({
    host: 'myredis',
    port: 6379
});

client.set('counter', 0);


app.get('/', (req, res) => {
    // process.exit(0);
    client.get('counter2', (err, counter_value) => {
        res.send('Counter: ' + counter_value);
        client.set('counter', parseInt(counter_value) +1);
    });
});

function NWD(a,b){ return b?NWD(b,a%b):a }

app.get('/nwd', (req, res) => {
    const sortedNums = [req.query.number1, req.query.number2].sort();
    const key = sortedNums.join();
    client.get(key, (err, nwd_value) => {
        if (nwd_value != null){
            res.send(`Cached NWD(${key}): ${nwd_value}`);
        } else {
            const nwd = NWD(sortedNums[0], sortedNums[1]);
            res.send(`NWD(${key}): ${nwd}`);
            client.set(key, nwd);
        }
    });
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
})
