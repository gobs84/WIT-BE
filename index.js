const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
 
const app = express();

const registros = require('./db/registros');
 
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
    console.log(req.body);
    registros.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});