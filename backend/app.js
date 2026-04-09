import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './src/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senha",
    database: "meu_banco"
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado ao Mysql");
});


app.get("/", (req, res) => {
    res.send("Api rodando!");
});

app.listen(3000, () => {
    console.log("servidor rodando na porta 3000")
});







//CRUD 

//create user


app.post("/usuarios", (req, res) => {
    db.query(" INSERT INTO usuarios (nome, email) VALUES (?, ?) ", [nome, email], 
        (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({id: results.insertId, nome, email });
    
    });
});

//read


app.get("/usuarios", (req, res) => {
    db.query(" SELECT * FROM usuarios", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    
    });
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;
    db.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [nome, email, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Usuário atualizado com sucesso" });
    });
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Usuário removido" });
    });
});




app.listen(3001, () => console.log("Backend rodando na porta 3001"));

