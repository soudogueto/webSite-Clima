const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./forecast');
const geoData = require ('./utils/geoData');

const app = express();

// DEFININDO OS CAMINHOS PARA O EXPRESS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../modelos/views')
const partialsPath = path.join(__dirname, '../modelos/partials')

// CONFIGURAÇÃO AS LOCALIZAÇÕES DOS VIEWS E HANDLEBARS ENGINE
app.set('view engine','hbs')
app.set('views', viewsPath)

// CONFIGURAÇÃO DAS PÁGINAS ESTÁTICAS
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

// GET
app.get('', (req, res) => {
    res.render('index', {
        titleHead: 'Home',
        title: 'Consulte o Clima em Tempo Real 😎',
        name: 'Lucas Pereira',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        titleHead: 'Sobre nós',
        title: 'Um pouquinho sobre nós',
        name: 'Lucas',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        titleHead: 'Help',
        title: 'O quê você precisa?',
        name: 'Lucas',
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!req.query.address){
        return res.send({
            error: 'Você tem que inserir uma localização!'
        })
    }
    geoData(address, (error, data) => {
        if(error){
            return res.send({error})
        }
        const latitude = data.latitude;
        const longitude = data.longitude;
        const localização = data.localização;
        
        forecast(latitude, longitude, 'pt', (error, data) => {
            if(error){
                return res.send({error})
            }
            res.send({
                previsão: data,
                endereço: localização,
                local: req.query.address
            })
        })
    })


})

app.get('*', (req,res) => {
    res.render('404', {
        titleHead: '404',
        title: '404',
        errorMessage: 'Page not found'
    })
})

// DEFININDO AS PORTAS
app.listen(3000, () =>{
    console.log('O servidor está rodando na porta 3000')
})