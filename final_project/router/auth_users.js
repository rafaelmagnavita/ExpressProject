const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const isNullOrEmpty = require("./isNullOrEmpty.js");

let users = [];

const isValid = (username)=>{ 
    var user = users.find(user => user.username === username);
    if (user !== null && user !== undefined)
    {
        return false;
    }
    return true;
}

const authenticatedUser = (username,password)=>{ 
    var user = users.find(user => user.username === username);

    if (user !== null && user !== undefined)
    {
            if(user.password === password)
            {
                return true;
            }
            else
            {
                return false;
            }
    
    }
    
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    var body = req.body;
    if(body !== null && isNullOrEmpty(JSON.stringify(body)) === false){
        var username = body.username;
        var password = body.password;  
        if(isNullOrEmpty(username) === false && isNullOrEmpty(password) === false){
            if(authenticatedUser(username,password) === true)
            {
                return res.status(300).json({message: "User logged in!"});
            }
            else
            {
                return res.status(300).json({message: "Wrong Credentials! " });
            }

        }
    }
    return res.status(300).json({message: "Invalid Format!"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
