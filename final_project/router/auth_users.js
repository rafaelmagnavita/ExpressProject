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
                let accessToken = jwt.sign({
                    data: password
                }, 'access', { expiresIn: 60 * 60 });
                req.session.authorization = {
                    accessToken,username
                }

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
  var userReview = req.params.Review;
  if(isNullOrEmpty(userReview) === true){
    return res.status(300).json({message: "Review is missing!"});
  }
  var id = req.params.isbn;
  if(isNullOrEmpty(userReview) === true){
    return res.status(300).json({message: "isbn is missing!"});
  }
  var username = req.authorization['username'];
  if(isNullOrEmpty(userReview) === true){
    return res.status(300).json({message: "username authorization is missing!"});
  }
  var reviews = books[id].reviews;
  if(isNullOrEmpty(userReview) === true){
    return res.status(300).json({message: "Book not found!"});
  }

        var existingReview = reviews.find(rv => rv.username === username);
        
        if(!existingReview)
        {
            reviews.push({"username" : username, "review" : userReview});
            return res.status(300).json({message: "User Review with username " + username + " successfully added/updated"});
        }
        else
        {
            existingReview = {"username" : username, "review" : userReview};
            return res.status(300).json({message: "User Review with username " + username + " successfully added/updated"});
        }
    

});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
