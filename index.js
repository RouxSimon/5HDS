const express = require('express')
const app = express()
const users = require('./users.json')
const produits = require('./produits.json')
const { v4: uuidv4 } = require('uuid'); 
const fs = require("fs")

// Mtokendleware
app.use(express.json())


//===============users====================
app.get('/users', (req,res) => {
    res.status(200).json(users)
})

app.get('/users/:token', (req,res) => {
    const token = req.params.token
    const user = users.find(user => user.token === token)
    res.status(200).json(user)
})

app.post('/users', (req,res) => {
    
    let myToken = uuidv4();

    let newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        token: myToken,
        createdAt: new Date(),
        updateAt: null
    };

    users.push(newUser)
    res.status(200).json(users)
    
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("users.json", "utf8"));
        }
    });

})

app.put('/users/:token', (req,res) => {
    const token = req.params.token
    const myUser = users.find(myUser => myUser.token === token)
    const hasBeenUpdateAt = new Date();

    let updatedUser = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        token: myUser.token,
        created_at: myUser.created_at,
        updated_at: hasBeenUpdateAt
    };
    let targetIndex = users.indexOf(myUser);
    users.splice(targetIndex, 1, updatedUser);    
   
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("users.json", "utf8"));
        }
    });

    res.status(200).json(users)
})

app.delete('/users/:token', (req,res) => {
    const token = req.params.token
    let user = users.find(user => user.token === token)
    users.splice(users.indexOf(user),1)
    res.status(200).json(users)
    
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("users.json", "utf8"));
        }
    });
})

//===============Produits====================
app.get('/produits', (req,res) => {
    res.status(200).json(produits)
})

app.get('/produits/:token', (req,res) => {
    const token = req.params.token
    const produit = produits.find(produit => produit.token === token)
    res.status(200).json(produit)
})

app.post('/produits', (req,res) => {
   let myToken = uuidv4();

    let newProduct = {
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        stock: req.body.stock,
        reference: req.body.reference,
        token: myToken,
        createdAt: new Date(),
        updateAt: null
    };

    produits.push(newProduct)
    res.status(200).json(produits)
    
    fs.writeFile("produits.json", JSON.stringify(produits), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("produits.json", "utf8"));
        }
    });
})

app.put('/produits/:token', (req,res) => {
    const token = req.params.token
    const myproduit = produits.find(myproduit => myproduit.token === token)
    const hasBeenUpdateAt = new Date();

    let updatedproduit = {
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        stock: req.body.stock,
        reference: req.body.reference,
        token: myproduit.token,
        created_at: myproduit.created_at,
        updated_at: hasBeenUpdateAt
    };
    let targetIndex = produits.indexOf(myproduit);
    produits.splice(targetIndex, 1, updatedproduit);    
   
    fs.writeFile("produits.json", JSON.stringify(produits), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("produits.json", "utf8"));
        }
    });

    res.status(200).json(produits)
})

app.delete('/produits/:token', (req,res) => {
    const token = req.params.token
    let produit = produits.find(produit => produit.token === token)
    produits.splice(produits.indexOf(produit),1)
    res.status(200).json(produits)

    fs.writeFile("produits.json", JSON.stringify(produits), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("produits.json", "utf8"));
        }
    });
})


app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})