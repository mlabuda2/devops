const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();
const appId = uuidv4();

app.get('/', (req, res) => {
    res.send(`${appId} Hello`)
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
})
