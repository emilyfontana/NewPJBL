import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          EmySystem - Emily Fontana
        </Typography>

        <Button color="inherit" component={Link} to="/">Listagem</Button>
        <Button color="inherit" component={Link} to="/cadastro">Cadastrar</Button>
      </Toolbar>
    </AppBar>
  );
}