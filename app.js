const fs = require('fs')
const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}));


//middleware


app.get("/dinosaurs", function(req, res){
    let dinos = JSON.parse(fs.readFileSync('./dinosaurs.json'))
    console.log(dinos)
    const nameFilter = req.query.nameFilter;

    if (nameFilter) {
        if (nameFilter == "*" || nameFilter == "all"){
            res.render('dinosaurs/index', {myDinos: dinos})
        } else{
            dinos = dinos.filter(function(dino) {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        }
    )
        }
  }
    res.render('dinosaurs/index', {myDinos: dinos})
})

app.get("/dinosaurs/new", function(req,res){
    res.render('dinosaurs/new')
})

app.get("/dinosaurs/:idx", function(req, res){
    const dinos = JSON.parse(fs.readFileSync('./dinosaurs.json'))
    res.render("dinosaurs/show", {myDino: dinos[req.params.idx]})
})

app.post("/dinosaurs", function(req, res){
    //console.log(req.body)
    const dinos = JSON.parse(fs.readFileSync('./dinosaurs.json'))
    dinos.push(req.body)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos))
    res.redirect("/dinosaurs")
})



app.listen(9999)