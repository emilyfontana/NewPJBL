# Sistema de Cadastro de Usuários


Projeto de CRUD completo com frontend em React, backend em Node.js + Express e banco de dados MySQL.


## Aluna
- **Emily Pontes Fontana**


## Descrição
Este sistema permite cadastrar, listar, editar, excluir e visualizar detalhes de usuários.
Ele atende aos requisitos da atividade ao usar React no frontend, Express no backend e MySQL no banco de dados.


## Tecnologias
- Frontend: React, Material-UI, React Router
- Backend: Node.js, Express, CORS, MySQL (mysql2)
- Banco de dados: MySQL


## Funcionalidades
- Tela de listagem de usuários com paginação
- Tela de cadastro de usuário
- Edição de usuário existente
- Exclusão de usuário
- Visualização detalhada de usuário
- Validação de formulário no frontend
- Validação de dados no backend
- Exibição de mensagens de erro no frontend
- Nome da aluna visível no sistema


## Estrutura do projeto
- `backend/` - servidor Node.js + Express
- `frontend/` - aplicação React


## Configuração do MySQL
1. Crie um banco de dados chamado `pjbl`.
2. Crie a tabela `usuarios` com os campos necessários.


Exemplo de tabela:


```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  genero VARCHAR(30) NOT NULL,
  data_nascimento DATE NOT NULL,
  telefone VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


3. Importe o arquivo `.sql` gerado pelo MySQL Workbench ou outro cliente, se houver.


> Observação: o arquivo `.sql` não está presente no repositório atual, então é necessário gerar a exportação antes da entrega.


## Como rodar


### Backend
```bash
cd backend
npm install
node app.js
```


O backend roda em `http://localhost:3001`.


### Frontend
```bash
cd frontend
npm install
npm start
```


O frontend roda em `http://localhost:3000`.


## Endpoints REST
- `GET /usuarios` - lista todos os usuários
- `GET /usuarios/:id` - busca um usuário pelo ID
- `POST /usuarios` - cria um novo usuário
- `PUT /usuarios/:id` - atualiza um usuário existente
- `DELETE /usuarios/:id` - exclui um usuário


## Observações importantes
- Verifique se o banco de dados está funcionando e se as credenciais em `backend/app.js` estão corretas.
- Caso o servidor de backend e o frontend usem portas diferentes, o CORS já está configurado no backend.
- A validação de CPF no frontend aceita o formato com ou sem pontos/traço e exibe o CPF no padrão `000.000.000-00`.


## Uso
1. Abra o navegador em `http://localhost:3000`
2. Clique em `Cadastrar usuário` para abrir o formulário
3. Preencha os campos obrigatórios
4. Salve para voltar à tela de listagem
5. Use `Editar`, `Excluir` ou `Ver` nas ações para gerenciar os dados


## Imagem de desmonstração 

<img width="1916" height="845" alt="image" src="https://github.com/user-attachments/assets/f69784cc-5392-4bf8-8f94-3018e8b61c83" />
