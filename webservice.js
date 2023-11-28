var express = require('express')
var app = express()
var fs = require('fs')


app.get("/countries",function(req,res){
    var countries = JSON.parse(fs.readFileSync("countries.txt").toString())
    res.send(countries)//end point
 })
 app.get("/products",function(req,res){
    var products = JSON.parse(fs.readFileSync("products.txt").toString())
    res.send(products)
 })//end point

 app.listen(3600,function(){console.log("server running on 3600")})