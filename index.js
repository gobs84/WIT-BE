const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
 
const app = express();

const registros = require('./db/registros');
const login = require('./db/login');
 
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
 
app.get('/', (req, res) => {
    res.json({
        registro: 'Hello Moto!'
    });
});

app.get('/registros', (req, res) => {
    registros.getAll().then((registros) => {
        res.json(registros);
    });
});

app.post('/registros', (req, res) => {
    console.log("body ",req.body);
    registros.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.post('/login',(req,res)=>{
    login.logUser(req.body).then((message)=>{
        if (message!=null) {
            res.status(200);
            res.json({
                response: 'Logged'
            });
        } else {
            res.status(404);
            res.json({
                response: 'Not Logged'
            });
        }
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    });
})

app.post('/loginC',(req,res)=>{
    console.log(req.body);
    login.create(req.body).then((message)=>{
        res.json();
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    })
});

app.get('/users', (req, res) => {
    login.users().then((registros) => {
        res.json(registros);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});