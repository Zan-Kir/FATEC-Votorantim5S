const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const moongose = require('mongoose');

// Criar um objeto Express e configurar Porta
const app = express();
const port = 3000;

// Vincular o middleware ao Express
app.use(cors());

// Permissâo para usar outros métodos HTTP
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

//Permissâo servidor
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({status: 'ok'})
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
