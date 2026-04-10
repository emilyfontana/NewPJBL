import { AppBar, Toolbar, Typography, Box } from '@mui/material';

//parte visual
//appbar faixa horizontal 
//toolbar linha itens na barra com o espaçamento 
//box é uma div 
//Typography - para textros possui escalas visuais 
// Cabeçalho principal do sistema, exibindo título e identificação da aluna.
export default function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={6} sx={{ borderBottom: '2px solid rgba(255,255,255,0.12)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
            Sistema de Cadastro
          </Typography>
          
        </Box>

      </Toolbar>
    </AppBar>
  );
}


