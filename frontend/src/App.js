import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Listagem from './Listagem';
import Formulario from './Formulario';
import Detalhes from './Detalhes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h2>DevSystem</h2>
          <nav>
            <Link to="/">Listagem</Link>
            <Link to="/cadastro" className="btn btn-edit">Novo Usuário</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Listagem />} />
            <Route path="/cadastro" element={<Formulario />} />
            <Route path="/editar/:id" element={<Formulario />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Routes>
        </main>

        <footer>
          <p>Sistema Desenvolvido por: <strong>Emily Fontana</strong> | PJBL2 2025</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;