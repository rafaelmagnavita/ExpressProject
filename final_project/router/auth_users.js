const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    for (const user in users)
    {
        if(user !== null){
            
            if(user.username === username)
            {
                return false;
            }
        }
    }
    return true;
}

const authenticatedUser = (username,password)=>{ 
    for (const user in users)
    {
        if(user.username === username)
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
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
