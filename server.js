var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/server.html")
})

app.get("/products",function(req,res){
    var products = JSON.parse(fs.readFileSync("products.txt").toString())
    //console.log(products.toString())
    res.render("productslist",{productlist:products})
    
})

app.get("/products/:id",function(req,res){
    var productdetails = JSON.parse(fs.readFileSync("products.txt").toString())
    //console.log(productdetails)
    console.log("x::",productdetails[productdetails.length-1].id+1)
   res.render('details',{productsdetails:productdetails[req.params.id]})
})

app.get("/countries",function(req,res){
    var countries = JSON.parse(fs.readFileSync("countries.txt").toString())
    //res.send(countries)
    res.render("countrieslist",{countrylist:countries})
    
})

app.get("/countries/:name",function(req,res){
    var countrydetails = JSON.parse(fs.readFileSync("countries.txt").toString())
    var filtereddetails = countrydetails.filter(function(country){
        console.log(country.name.common)
        console.log(req.params)
        if(country.name.common === req.params.name){
            return true
        }
    })
    console.log("filterdetails::",filtereddetails)
    //console.log(Array.isArray(filtereddetails))
    res.render("countrydetails",{countrydetails:filtereddetails})
})

app.get("/addproduct",function(req,res){
    //res.send("please wait")
    res.sendFile(__dirname+"/AddProduct.html")
})

app.post("/addproduct",function(req,res){
    console.log(req.body)
    var filedata = JSON.parse(fs.readFileSync("products.txt").toString())
    //res.send(filedata)
   // console.log(filedata[filedata.length-1])
   // console.log(filedata[filedata.length-1]['id'])
   // console.log(filedata[filedata.length-1]['id']+1)
   req.body.id = filedata[filedata.length-1]['id']+1;
    filedata.push(req.body)
    fs.writeFileSync("products.txt",JSON.stringify(filedata))
    res.send("please wait")
})

app.get("/deleteproduct/:id",function(req,res){
    var filedata = JSON.parse(fs.readFileSync("products.txt").toString())
    var remainingproducts = filedata.filter(function(product){
        if(product.id === +req.params.id){
            return false
        }
        else{
            return true
        }

    })
    fs.writeFileSync("products.txt",JSON.stringify(remainingproducts))
    //res.send("please wait")
    res.redirect("/products")

})




app.listen(3600,function(){console.log("server running on 3600")})