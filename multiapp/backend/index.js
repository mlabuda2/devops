const keys = require('./keys');
const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
const cors = require("cors");
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const client = redis.createClient({
    host: keys.redisHost,
    port: 6379
});

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost PG conn'));

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

function NWD(a,b){ return b?NWD(b,a%b):a }

app.get('/values', (req, res) => {
    pgClient
        .query('SELECT * FROM values')
        .then(resp => res.send(resp.rows))
        .catch(e => console.error(e.stack))
})
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

app.listen(5000, ()=>{
    console.log("Listening on port 5000");
})
