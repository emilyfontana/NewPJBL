import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Detalhes() {
  const { id } = useParams();
  const [u, setU] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/usuarios/${id}`).then(r => r.json()).then(setU);
  }, [id]);

  if(!u) return <p>Carregando...</p>;

  return (
    <div style={{background: 'white', padding: '2rem', borderRadius: '8px'}}>
      <h3>Perfil do Usuário</h3>
      <p><strong>Nome:</strong> {u.nome}</p>
      <p><strong>Email:</strong> {u.email}</p>
      <p><strong>Ano:</strong> {u.anoNascimento}</p>
      <p><strong>Gênero:</strong> {u.genero}</p>
      <p><strong>CPF:</strong> {u.cpf}</p>
      <Link to="/" className="btn btn-view">Voltar para Lista</Link>
    </div>
  );
}