const express = require('express');
const app = express();
const users = require('./users.json')

app.get('/users', (req,res) => {
    res.status(200).json(users)
})

app.listen(5500, () => {
    console.log("Serveur à l'écoute")
})