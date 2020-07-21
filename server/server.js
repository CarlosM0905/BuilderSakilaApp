const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {db} = require('../database/db');

const app = express();
app.set('views', path.join(__dirname, '../', "views"));
app.set('view engine','hbs')

app.use('/public',express.static(path.join(__dirname, '../', "public")))
app.use(express.json());
app.use(express.urlencoded({extended: false}));


hbs.registerPartials(__dirname + '/views/partials')

let countries;
let clients;

 app.get('/results/:id', (req, res)=>{
    let idCountry = req.params.id;
    db.query(
        'SELECT CU.first_name, CU.last_name, A.address, CI.city, CO.country_id FROM customer CU INNER JOIN address A ON CU.address_id = A.address_id INNER JOIN city CI ON A.city_id = CI.city_id INNER JOIN country CO ON CI.country_id = CO.country_id WHERE CO.country_id =' + parseInt(idCountry)
    , (err, resultado)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        clients = resultado;
        console.log(clients);
        res.render('results', {clients});
    });
    
 })

app.get('/', (req, res)=>{
    db.query('SELECT *  FROM COUNTRY', (err, resultado)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        countries = resultado
        res.render('home', {countries});
    });
    
});

app.listen(3000, ()=>{
    console.log('Escuchando el puerto 3000');
})
