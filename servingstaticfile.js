var express = require('express')
var app = express()
var fs = require('fs')

app.use(express.static('public'))

app.use(express.static('public2'))


app.get("/",function(req,res){
    //res.send("please wait")
    res.sendFile(__dirname+"/myhome.html")
})


/*app.get("/budha.jpg",function(req,res){ 
    res.sendFile(__dirname+"/budha.jpg")
})*/



app.listen(3600,function(){console.log("server running on 3600")})