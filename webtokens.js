var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html")
})

app.post("/authenticate",function(req,res){
    var users = JSON.parse(fs.readFileSync('users.txt'))
    console.log(users)
    //console.log(req.body)
    var filteredusers = users.filter(function(user){
       if(user.username===req.body.username && user.password===req.body.password ){
        return true
       }
    })                                                                                                              
    //console.log(filteredusers)
    if(filteredusers.length!==0){
        var token = jwt.sign(req.body,"manasa")
        res.cookie('token',token)
        res.redirect("/")
    }
    else{
        res.sendFile(__dirname+"/login.html")
    }
})
function isLoggedIn(req,res,next){
    if(jwt.decode(req.cookies.token)){
        next()
    }
    else{
        res.redirect("/login")
    }

} 

app.get("/",isLoggedIn,function(req,res){
    res.send("Hello")
    
})




app.listen(3400,function(){console.log("server running on 3400")})