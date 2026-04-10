import { AppBar, Toolbar, Box } from '@mui/material';



//appbar faixa horizontal 
//toolbar linha itens na barra com o espaçamento 
//box é uma div 


  
//parte visual


// Barra de informação com o nome do aluno e descrição do projeto.
export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={3} //sombra
      sx={{
        bgcolor: '#ffffff',
        borderBottom: 2,
        borderColor: 'rgba(218, 162, 241, 0.35)',
        color: 'text.secondary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <h5>Feito por: Emily Pontes Fontana - Projeto experiência criativa</h5>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

