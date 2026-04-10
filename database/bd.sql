-- create databse e use 
CREATE DATABASE pjbl;
USE pjbl;

-- create table
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--mysql nao deixa add a data no formato br 
-- add de dados 
INSERT INTO usuarios (nome, email, cpf, genero, data_nascimento, telefone)
VALUES 
("Emy", "emily@gmail.com", "111.111.111-55", "Feminino", "2006-10-04", "41999999999"),
("Ju", "jusilva@gmail.com", "111.111.111-40", "Feminino", "2006-06-12", "41999999988"),
("Jose", "josea@gmail.com", "111.111.221-40", "Masculino", "2005-05-10", "41999299988");
-- read dos user
SELECT * FROM usuarios;

-- update do id 1
UPDATE usuarios
SET telefone = '41911111111'
WHERE id = 1;

-- exclusao de user
DELETE FROM usuarios
WHERE id = 3;