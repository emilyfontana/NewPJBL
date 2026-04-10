import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
} from '@mui/material';

import Listagem from './pages/Listagem';
import Formulario from './pages/Formulario';
import Detalhes from './pages/Detalhes';
import Navbar from './components/Navbar';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7d3c98',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d81b60',
      contrastText: '#ffffff',
      light: '#f9bfd7',
    },
    background: {
      default: '#fbeaf2',
      paper: '#ffffff',
    },
    text: {
      primary: '#2f1744',
      secondary: '#5e3c6b',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh'
           
          }}
        >
          <Header />
          <Navbar />

          

          <Container maxWidth="lg" sx={{ pt: 4, pb: 6 , marginTop: 4}}>
            <Routes>
              <Route path="/" element={<Listagem />} />
              <Route path="/cadastro" element={<Formulario />} />
              <Route path="/editar/:id" element={<Formulario />} />
              <Route path="/detalhes/:id" element={<Detalhes />} />
            </Routes>
          </Container>

          {/* Rodapé com nome da aluna e descrição do projeto para atender aos requisitos do trabalho */}
          <Box component="footer" sx={{ py: 3, textAlign: 'center',  }}>
            
              <h4> © 2026 Emily Pontes Fontana. All Rights Reserved</h4>
              <br />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;


