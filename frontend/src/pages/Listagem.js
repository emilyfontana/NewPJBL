import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Button, Container
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Listagem() {
  const [users, setUsers] = useState([]);

  const carregar = () => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => alert('Erro ao carregar dados'));
  };

  useEffect(() => {
    carregar();
  }, []);

  const deletar = (id) => {
    if (!window.confirm('Deseja excluir?')) return;

    fetch(`http://localhost:3001/usuarios/${id}`, {
      method: 'DELETE'
    }).then(() => carregar());
  };

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.cpf}</TableCell>

              <TableCell>
                <Button component={Link} to={`/editar/${user.id}`}>
                  Editar
                </Button>

                <Button
                  color="error"
                  onClick={() => deletar(user.id)}
                >
                  Excluir
                </Button>

                <Button component={Link} to={`/detalhes/${user.id}`}>
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}