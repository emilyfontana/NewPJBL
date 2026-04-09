import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Detalhes() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/usuarios/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  return (
    <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5">{user.nome}</Typography>
        <Typography>CPF: {user.cpf}</Typography>
      </CardContent>
    </Card>
  );
}