import { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function Formulario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/usuarios/${id}`)
        .then(res => res.json())
        .then(data => {
          setNome(data.nome);
          setCpf(data.cpf);
        });
    }
  }, [id]);

  const salvar = () => {
    const metodo = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:3001/usuarios/${id}`
      : 'http://localhost:3001/usuarios';

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf })
    })
      .then(() => navigate('/'))
      .catch(() => alert('Erro ao salvar'));
  };

  return (
    <Container>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <TextField
        label="CPF"
        fullWidth
        margin="normal"
        value={cpf}
        onChange={e => setCpf(e.target.value)}
      />

      <Button variant="contained" onClick={salvar}>
        Salvar
      </Button>
    </Container>
  );
}