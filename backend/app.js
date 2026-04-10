
/*RESUMO DOS STATUS 
200 - OK
201 - Created 
400 - Bad Request 
404 - Not Found 
409 - Conflict mail ou cpf duplicado
500 - Internal Server Error 
*/


const express = require("express"); // express para rota
const cors = require("cors"); // cors permite q react acesse a API
const mysql = require("mysql2"); // por conta do erro  sqlMessage: 'Client does not support authentication protocol
//instalei o mysql2 para conectar ao bd 

// aqui é onde tem a conexão com o bd node.js + mysql



const app = express(); //inicia o servidor express

//servdor ecpress: aplicação para o node.js para facilitar criação api 


app.use(cors()); // permite acesso 
app.use(express.json()); //captar no formato json

// CONEXÃO COM BANCO - prencher as informações é uma das etapas mais importantes p não quebrar o código
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // precisa colocar a sua senha do mysql
    database: "pjbl"  //add o nome do schema
});

db.connect((err) => { //caso de erro console retorna mensagem 
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


//rotas crud 

//  CREATE
//post envia os dados dos campos do formulario para o mysql
//req pede os dados

app.post("/usuarios", (req, res) => {
    const { nome, email, cpf, genero, data_nascimento, telefone } = req.body;

    if (!nome || !email || !cpf || !genero || !data_nascimento) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, email, cpf, gênero e data de nascimento." });
    } //caso algum campo obrigatorio nao seja preenchido 

    const sql = "INSERT INTO usuarios (nome, email, cpf, genero, data_nascimento, telefone) VALUES (?, ?, ?, ?, ?, ?)"; 
    //DB QUERY ENVIA COMANDO AO DB 
    db.query(sql, [nome, email, cpf, genero, data_nascimento, telefone || null], (err, result) =>  {
        if (err) {
            //dup se item for repetido nao deverá ser aceito 
            //precisa aplciar essa questão principalemnte para o cpf 
            if (err.code === 'ER_DUP_ENTRY') {
                const field = err.message.includes('email') ? 'email' : err.message.includes('cpf') ? 'cpf' : 'campo'; //ESSE FIELD É REPSONSAVEL POR IDENTIFICAR QUAL CAMPO OBTEVE ESSE ERRO SUBSTINTINDO "FIELD"
                return res.status(409).json({ erro: `Valor duplicado no ${field}.` });
            }
            return res.status(500).json({ erro: err.message }); //ERRO GENERICO
        }
        res.json({ id: result.insertId, nome, email, cpf, genero, data_nascimento, telefone }); //RESULT SE TUDO DER CERTO FAZ INSERT
    });
});

//PONTO IMPORTANTE 

//CONFIRA SE A TABLE USUARIOS POSSUI TODOS OS ATRIBUTOS CITADOS ACIMA



// READ
//SELECT BUSCA TODOS OS REGISTROS DA TABLE 
app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(result); //ENVIA ARRAY COM OS USERS CADASTRADOS APRA
    });
});

//TAMBPEM REALIZA UM READ MAS DE FORMA ESPECIFICA PELO ID
//USADO EM DETALHES

app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!result.length) return res.status(404).json({ erro: "Usuário não encontrado." }); //CASO O ID NAO SEJA ENCONTRADO RETORNA ESSA MENSAGEM

        //exemplo de caso que esse codigo evita um uer pesquisar um id inexistente pelo navegador 
        //para puxar apenas um item e nao o array todo 
        const [usuario] = result; 

        //envia o resultado 
        res.json(usuario);
    });
});

//  UPDATE
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params; //pega o id da url 
    const { nome, email, cpf, genero, data_nascimento, telefone } = req.body; //pega as dados que o user digitou no form 

    if (!nome || !email || !cpf || !genero || !data_nascimento) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, email, cpf, gênero e data de nascimento." }); //confete se campo obrigatorio ta vazio
    }

    //verifica o id do user e troca os valor antigos pelos novos
    db.query(
        "UPDATE usuarios SET nome=?, email=?, cpf=?, genero=?, data_nascimento=?, telefone=? WHERE id=?",
        [nome, email, cpf, genero, data_nascimento, telefone || null, id],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    const field = err.message.includes('email') ? 'email' : err.message.includes('cpf') ? 'cpf' : 'campo';
                    return res.status(409).json({ erro: `Valor duplicado no ${field}.` });
                }
                return res.status(500).json({ erro: err.message });
            }
            
            res.json({ message: "Atualizado com sucesso" }); //se der tudo certo 
        }
    );
});

//DELETE
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ erro: "Usuário não encontrado." });
        res.json({ message: "Deletado com sucesso" });//ver possibilidade de add um aviso antes "certeza de que deseja excluir o user?"
    });
});


app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});

//no exemplo do professor estava 3000 mas ao testar sempre retornava que a port nao estava disponivel 