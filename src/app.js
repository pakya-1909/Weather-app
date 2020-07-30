const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//paths for express congif
const viewsPath = path.join(__dirname,'../templets/views')
const partialsPath = path.join(__dirname,'../templets/partials')

//setup handle bar 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// set up static dir to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather",
        name : "pankaj yadav"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : " About :) ",
        name : "Pankaj Yadav"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : " ? HELP :) ",
        name : "Pakya Dada",
        helptext : "this is a help service"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "Please provide address"
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,temperature)=>{
            if(error){
                return res.send({error})
            }

            console.log( 'temperature : ' ,temperature)
            console.log(location)

            res.send({
                location : location,
                forecast : temperature,
                place  : req.query.address
            })

        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you have to provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error : "help article not found",
        title : "error"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error : "page not found",
        title : "error"
    })
})



app.listen(port,()=>{
    console.log('server started on port on port' + port)
})
