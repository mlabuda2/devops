const express = require("express");
const redis = require("redis");
const process = require("process");
const app = express();
const client = redis.createClient({
    host: 'myredis',
    port: 6379
});

client.set('counter', 0);

function NWD(a,b){ return b?NWD(b,a%b):a }

app.get('/', (req, res) => {
    // process.exit(0);
    client.get('counter2', (err, counter_value) => {
      res.send('Counter: ' + counter_value);
      client.set('counter', parseInt(counter_value) +1);
    });
});

app.get('/nwd', (req, res) => {
    const number1 = req.query.number1;
    const number2 = req.query.number2;
    let sortedNums = [number1, number2].sort();
    let nwd = null;
    console.log(sortedNums.join());
    client.get(sortedNums.join(), (err, nwd_value) => {
        if (nwd_value != null){
            nwd = nwd_value;
            res.send(`Cached NWD(${sortedNums.join()}): ${nwd}`);
        }
    });
    nwd = NWD(number1, number2);
    res.send(`NWD(${sortedNums.join()}): ${nwd}`);
    client.set(sortedNums.join(), nwd);
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
})
