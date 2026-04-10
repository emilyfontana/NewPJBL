import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TableContainer,
  Typography,
  Box,
  TablePagination,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001';


//MESMO CASO DO FOMRULARIO PARA MANTER A FORMATAÇÃO DO CPF
const formatCpf = (value) => {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, '$1.$2');
  if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};


export default function Listagem() {
  const [users, setUsers] = useState([]); //LISTA DE USER Q VEM DO BACNCO
  const [loading, setLoading] = useState(false); //carregamento 
  const [error, setError] = useState('');//msg de erro 
  const [page, setPage] = useState(0);//pag da tabela
  const [rowsPerPage, setRowsPerPage] = useState(5);//qtos users aparecer - max de 5 numa pag da tabela 


  //busca os dados no servidor 
  const carregar = () => {
    setLoading(true); 
    setError('');

    fetch(`${API_URL}/usuarios`)//pede lista ao backend
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar lista');
        return res.json();
      })
      .then((data) => setUsers(data)) //guarda os user na memoria
      .catch((err) => setError(err.message))//se der erro guarda a msg de erro para mostrar em tela
      .finally(() => setLoading(false));//fim do carregamento
  };

  useEffect(() => {
    carregar();//roda carregar assimq q a pag abre 
  }, []);

  

  const deletar = (id) => {
    if (!window.confirm('Deseja excluir este usuário?')) return; //caixa de confirm

    fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE', //metodo delete para deletar o user
    })
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao excluir');
        carregar();//se deu certo carrega dnv para atualzia 
      })
      .catch((err) => setError(err.message));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };//mudanca de pag da tabela

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; //qtd de user que aparece na tabela, quando muda a qtd volta para a primeira pag da tabela


  //controle da qtd de user que aparefce na tabela 
  const visibleRows = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  //parte visual 
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ color: '#7d3c98' }}>Usuários cadastrados</Typography>
        <Button variant="contained" color="secondary" component={Link} to="/cadastro">
          Cadastrar usuário
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : users.length === 0 ? (
        <Alert severity="info">Nenhum usuário encontrado. Use o botão acima para cadastrar.</Alert>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Data de nascimento</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{formatCpf(user.cpf)}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.data_nascimento 
                        ? new Date(user.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) 
                        : '-'}
                    </TableCell>

                    
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, flexWrap: 'wrap' }}>
                        <Button variant="outlined" size="small" component={Link} to={`/editar/${user.id}`}>
                          Editar
                        </Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => deletar(user.id)}>
                          Excluir
                        </Button>
                        <Button variant="contained" color="secondary" size="small" component={Link} to={`/detalhes/${user.id}`}>
                          Ver
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </>
      )}
    </Paper>
  );
}


