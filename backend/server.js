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
    port: process.env.DB_PORT
});


db.connect((err) => {

    if (err) throw err;
    console.error('Conectado ao banco!');

    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, result) => {
        if (err) throw err;

        db.changeUser({database: process.env.DB_NAME }, (err) => {
            if (err) throw err;

            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS produtos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                valor DECIMAL(10, 2) NOT NULL,
                disponivel BOOLEAN NOT NULL
            )
            `;

            db.query(createTableQuery, (err, result) => {
                if (err) throw err;
            });
        });
    });
});


app.get('/', (req, res) => {
    res.send('API funcionando!');
});


app.post('/produtos', (req, res) => {
    const { nome, descricao, valor, disponivel } = req.body;

    const query = 'INSERT INTO produtos (nome, descricao, valor, disponivel) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, descricao, valor, disponivel], (err, result) => {
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
