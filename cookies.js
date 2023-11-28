var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var app = express()
app.set('view engine', 'ejs');
/*app.use(function(req,res,next){
    console.log("this is middleware") middleware
    next()
})*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.get("/",function(req,res){
    //res.send("welcome to express based web application")
     res.sendFile(__dirname+"/home.html")
})

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html")
})


app.post("/authenticate",function(req,res){
    console.log(req.cookies)
    console.log(req.cookies.username)
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
        res.cookie('username',req.body.username)
        res.cookie('password',req.body.password)
        res.sendFile(__dirname+"/home.html")
    }
    else{
        res.sendFile(__dirname+"/login.html")
    }
    //res.send("wait")
})

app.get("/aboutus",function(req,res){
    console.log(req.cookies)
    res.sendFile(__dirname+"/aboutus.html")
})
app.get("/contactus",function(req,res){
    console.log(req.cookies)
    res.sendFile(__dirname+"/contactus.html")
})
app.use(function(req,res,next){
    var users = JSON.parse(fs.readFileSync('users.txt'))
    console.log(users)
    //console.log(req.body)
    var filteredusers = users.filter(function(user){
       if(user.username===req.cookies.username && user.password===req.cookies.password ){
        return true
       }
    })                                                                                                              
    //console.log(filteredusers)
    if(filteredusers.length!==0){
        //res.sendFile(__dirname+"/home.html")
        next()
    }
    else{
        res.sendFile(__dirname+"/login.html")
    }
})
/*app.use(function(req,res,next){
    console.log("this is middleware function")
    next()

})
app.use(function(req,res,next){
    console.log("this is xyz middleware function")
    next()

})*/

/*function abc(req,res,next){   //middleware
    console.log("middleware")    
    next()
}
function xyz(req,res,next){
    console.log("xyz middleware")
    next()
}*/ 



/*app.get("/addcontact",function(req,res){
    console.log(req.query)
    //res.send("Hello")
    var contacts = JSON.parse(fs.readFileSync("contacts.txt"))
    console.log(Array.isArray(contacts))
    contacts.push(req.query)
    fs.writeFileSync("contacts.txt",JSON.stringify(contacts))
    res.send("wait for a while")
})*/

app.get("/contactslist",function(req,res){
    console.log(req.cookies)
    var contactsdata = JSON.parse(fs.readFileSync("contacts.txt").toString())
    res.render("contactlist",{company:'edupoly',allcontacts:contactsdata})
   // res.send("contactslist")
   // res.setHeader("Content-Type","text/html")
   /* var contactsdata = JSON.parse(fs.readFileSync('contacts.txt').toString())
    console.log(contactsdata)
    console.log(Array.isArray(contactsdata))
    var contactslist = `
    <table border="2">
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Mobile Number</th>
                <th>Action</th>
            </tr>
           
        </thead>
        <tbody>
            <tr>
            ${
                contactsdata.map((contacts)=>{
                    return `<tr>
                    <td>${contacts.fullname}</td>
                    <td>${contacts.mobile}</td>
                    <td>
                    <button>Delete</button>
                    </td>
                    <tr>`
                })
            }
                
            </tr>
        </tbody>
    </table>
   
    `
    res.send(contactslist)*/
    //res.send(fs.readFileSync("contactslist.html").toString())

})
/*app.get("/getallcontacts",function(req,res){
    res.setHeader("Content-Type","text/json")
    var contactsdata = fs.readFileSync("contacts.txt").toString()
   
    res.send(contactsdata)
})*/
app.post("/addcontact",function(req,res){
    console.log(req.cookies)
    console.log("post request received")
    console.log(req.body)
   var contacts = JSON.parse(fs.readFileSync("contacts.txt"))
    console.log(Array.isArray(contacts))
    contacts.push(req.body )
    fs.writeFileSync("contacts.txt",JSON.stringify(contacts))
    //res.send("wait for a while")
    res.redirect("/contactslist")
})

app.delete("/deletecontact/:id",function(req,res){
    console.log(req.params)
    var deletecontacts = JSON.parse(fs.readFileSync("contacts.txt").toString())
    deletecontacts.splice(req.params.id,1)
    fs.writeFileSync("contacts.txt",JSON.stringify(deletecontacts))
    //res.redirect("/contactslist")
    res.json({status:'deletesuccess'})
})
app.listen(3500,function(){console.log("running on 3500")})