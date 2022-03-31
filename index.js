const express = require('express')
const app = express()
const users = require('./users.json')
const produits = require('./produits.json')

// Middleware
app.use(express.json())

app.get('/users', (req,res) => {
    res.status(200).json(users)
})

app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.status(200).json(user)
})

app.post('/users', (req,res) => {
    users.push(req.body)
    res.status(200).json(users)
})

app.put('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let user = users.find(user => user.id === id)
    user.nom = req.body.nom,
    user.prenom = req.body.prenom,
    user.token = req.body.token,
    user.created_at = req.body.created_at,
    user.updated_at = req.body.updated_at,
    res.status(200).json(user)
})

app.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let user = users.find(user => user.id === id)
    users.splice(users.indexOf(user),1)
    res.status(200).json(users)
})

//===============Produits====================
app.get('/produits', (req,res) => {
    res.status(200).json(produits)
})

app.get('/produits/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const produit = produits.find(produit => produit.id === id)
    res.status(200).json(produit)
})

app.post('/produits', (req,res) => {
    produits.push(req.body)
    res.status(200).json(produits)
})

app.put('/produits/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let produit = produits.find(produit => produit.id === id)
    produit.nom = req.body.nom,
    produit.description = req.body.description,
    produit.token = req.body.token,
    produit.prix = req.body.prix,
    produit.stock = req.body.stock,
    produit.reference = req.body.reference,
    produit.created_at = req.body.created_at,
    produit.updated_at = req.body.updated_at,
    res.status(200).json(produit)
})

app.delete('/produits/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let produit = produits.find(produit => produit.id === id)
    produits.splice(produits.indexOf(produit),1)
    res.status(200).json(produits)
})


app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})