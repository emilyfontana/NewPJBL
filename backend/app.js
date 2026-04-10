const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); // por conta do erro  sqlMessage: 'Client does not support authentication protocol
//instalei o mysql2

const app = express();

app.use(cors());
app.use(express.json());

// CONEXÃO COM BANCO
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PUC@1234",
    database: "pjbl" 
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

//  TESTE
app.get("/", (req, res) => {
    res.send("API rodando!");
});

//  CREATE
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    const sql = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";

    db.query(sql, [nome, email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, nome, email });
    });
});

// READ
app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

//  UPDATE
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    db.query(
        "UPDATE usuarios SET nome=?, email=? WHERE id=?",
        [nome, email, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Atualizado com sucesso" });
        }
    );
});

//DELETE
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM usuarios WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deletado com sucesso" });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});