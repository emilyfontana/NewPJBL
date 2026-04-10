import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Listagem from './pages/Listagem';
import Formulario from './pages/Formulario';
import Detalhes from './pages/Detalhes';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <Container>
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<Listagem />} />
            <Route path="/cadastro" element={<Formulario />} />
            <Route path="/editar/:id" element={<Formulario />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Routes>
        </Box>
      </Container>

      {/* Rodapé */}
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Sistema Desenvolvido por: <strong>Emily Fontana</strong> | PJBL2 2025
        </p>
      </footer>

    </Router>
  );
}

export default App;