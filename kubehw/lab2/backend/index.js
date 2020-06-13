const express = require("express");
const {v4: uuidv4} = require("uuid");
const redis = require("redis");
const client = redis.createClient({
    host: 'my-redis-service',
    port: 6379
});
const { Pool } = require('pg');
const app = express();
const appId = uuidv4();

const pgClient = new Pool({
    user: keys.pgUser,
    host: 'my-postgres-service',
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

app.get('/', (req, res) => {
    res.send(`${appId} Hello`)
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
            pgClient
                .query(`INSERT INTO values (number) VALUES (${nwd})`)
                .catch(err => console.log(err));
            res.send(`NWD(${key}): ${nwd}`);
            client.set(key, nwd);
        }
    });
});


app.listen(8080, () => {
    console.log("Listening on port 8080");
})
