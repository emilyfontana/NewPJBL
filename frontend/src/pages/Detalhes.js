import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button, CircularProgress, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const formatCpf = (value) => {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, '$1.$2');
  if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
};

export default function Detalhes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError('');

    fetch(`${API_URL}/usuarios/${id}`)
      .then(async (res) => {
        const text = await res.text();
        let body = null;
        try {
          body = text ? JSON.parse(text) : null;
        } catch {
          body = null;
        }

        if (!res.ok) {
          const message = body?.erro || body?.message || text || 'Usuário não encontrado.';
          throw new Error(message);
        }

        return body;
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{ textAlign: 'center', mt: 4 }}>
        {error}
      </Typography>
    );
  }

  const formattedDate = user?.data_nascimento
    ? new Date(user.data_nascimento).toLocaleDateString('pt-BR')
    : '-';

  return (
    <Card sx={{ maxWidth: 760, mx: 'auto', mt: 3, p: 2, borderRadius: 4, boxShadow: 4, bgcolor: '#faf1fb' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: '#7d3c98' }}>
          Detalhes do usuário
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #f0d9f1' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Nome
              </Typography>
              <Typography variant="body1" sx={{ color: '#3d1f58', fontWeight: 600 }}>
                {user.nome}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #f0d9f1' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                E-mail
              </Typography>
              <Typography variant="body1" sx={{ color: '#3d1f58', fontWeight: 600 }}>
                {user.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #f0d9f1' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                CPF
              </Typography>
              <Typography variant="body1" sx={{ color: '#3d1f58', fontWeight: 600 }}>
                {formatCpf(user.cpf)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #f0d9f1' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Gênero
              </Typography>
              <Typography variant="body1" sx={{ color: '#3d1f58', fontWeight: 600 }}>
                {user.genero}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #f0d9f1' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Data de nascimento
              </Typography>
              <Typography variant="body1" sx={{ color: '#3d1f58', fontWeight: 600 }}>
                {formattedDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #f0d9f1' }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Telefone
              </Typography>
              <Typography variant="body1" sx={{ color: '#3d1f58', fontWeight: 600 }}>
                {user.telefone}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button variant="contained" onClick={() => navigate('/')}>
          Voltar para a lista
        </Button>
      </CardContent>
    </Card>
  );
}


