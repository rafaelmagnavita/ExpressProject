const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function isNullOrEmpty(str){
    if(str === null || str === undefined || str.trim() === ''){
        return true;
    }
    return false;
}

public_users.post("/register", (req,res) => {
    var body = req.body;
    if(body !== null && isNullOrEmpty(JSON.stringify(body)) === false){
        var username = body.username;
        var password = body.password;
    
        if(isNullOrEmpty(username) === false && isNullOrEmpty(password) === false){
            if(isValid(username) === true){
                var newUser = {"username": username, "password": password};
                users.push(newUser);
                return res.status(300).json({message: "User " + newUser + " added successfully!"});
            }
            return res.status(300).json({message: "Username already exists!"});

        }
    }
    return res.status(300).json({message: "Invalid Format!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  var id = req.params.isbn;
  var book = books[id];
  if(book === undefined || book === null)
  {
    return res.status(300).json("Book Not Found!");
  }
  return res.status(200).json(book);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    var author = req.params.author;
    if((author) === null || author === undefined){
        return res.status(300).json({message: "No Author Input Value"});
    }
    for (const key in books) {
        if(books[key].author === author)
        return res.status(200).json(books[key]);
    }
    return res.status(200).json({message: "Author not found"});

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var title = req.params.title;
    for (const key in books) {
        if(books[key].title === title)
        return res.status(300).json(books[key]);
    }
    return res.status(300).json({message: "Title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    var id = req.params.isbn;
    var book = books[id].reviews;
    return res.status(300).json(book);
});


public_users.get('/books', async (req, res) => {
    let myPromise = new Promise((resolve,reject) => {
       axios
      .get('https://rafaelmagnav-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/')
      .then((response) => {
        const books = response.data;
        return resolve(books);
      })
      .catch((error) => {
        return reject;
      });
    });

    myPromise.then((successMessage) => {
        return res.status(200).json(successMessage);
    });
});
  
public_users.get('/asyncisbn/:isbn', async (req, res) => {
    var id = req.params.isbn;

    let myPromise = new Promise((resolve,reject) => {
       axios
      .get('https://rafaelmagnav-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/' + id)
      .then((response) => {
        const books = response.data;
        return resolve(books);
      })
      .catch((error) => {
        return reject;
      });
    });

    myPromise.then((successMessage) => {
        return res.status(200).json(successMessage);
    });
});

public_users.get('/asyncauthor/:author', async (req, res) => {
    var author = req.params.author;

    let myPromise = new Promise((resolve,reject) => {
       axios
      .get('https://rafaelmagnav-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/' + author)
      .then((response) => {
        const books = response.data;
        return resolve(books);
      })
      .catch((error) => {
        return reject;
      });
    });

    myPromise.then((successMessage) => {
        return res.status(200).json(successMessage);
    });
});

module.exports.general = public_users;
