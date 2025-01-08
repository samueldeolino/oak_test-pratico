const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(cors());


app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});


app.get('/', (req, res) => {
    res.send('API funcionando!');
});



app.post('/produtos', (req, res) => {
    const { nome, descricao, valor, disponibilidade } = req.body;

    const query = 'INSERT INTO produtos (nome, descricao, valor, disponivel) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, descricao, valor, disponibilidade], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar produto:', err);
            return res.status(500).send('Erro no cadastro do produto.');
        }
        res.status(201).send('Produto cadastrado com sucesso!');
    });
});


app.get('/produtos', (req, res) => {
    const query = 'SELECT nome, valor FROM produtos ORDER BY valor ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).send('Erro ao buscar produtos.');
        }
        res.status(200).json(results);
    });
});


app.listen(port, () => {
    console.log(`Servidor back-end rodando em http://localhost:${port}`);
});
