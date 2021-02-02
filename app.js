const fs = require('fs')
const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(expressLayouts)


//middleware


app.get("/dinosaurs", function(req, res){
    const dinos = JSON.parse(fs.readFileSync('./dinosaurs.json'))
    console.log(dinos)
    res.render('dinosaurs/index', {myDinos: dinos})
})

app.listen(9999)