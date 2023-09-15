const express = require('express');
let books = require("./booksdb.js");
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
    return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  var id = req.params.isbn;
  var book = books[id];
  return res.status(300).json(book);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    var author = req.params.author;
    for (const key in books) {
        if(books[key].author === author)
        return res.status(300).json(books[key]);
    }
    return res.status(300).json({message: "Author not found"});

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

module.exports.general = public_users;
