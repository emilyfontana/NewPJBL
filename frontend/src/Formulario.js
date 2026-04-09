import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Formulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [u, setU] = useState({ nome: '', email: '', anoNascimento: '', genero: '', cpf: '' });

  useEffect(() => {
    if(id) fetch(`http://localhost:3001/usuarios/${id}`).then(r => r.json()).then(setU);
  }, [id]);

  const save = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/usuarios${id ? '/'+id : ''}`, {
      method: id ? 'PUT' : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(u)
    }).then(() => navigate('/'));
  };

  return (
    <form onSubmit={save}>
      <h3>{id ? 'Editar Usuário' : 'Novo Cadastro'}</h3>
      <input placeholder="Nome Completo" value={u.nome} onChange={e => setU({...u, nome: e.target.value})} required />
      <input placeholder="E-mail" type="email" value={u.email} onChange={e => setU({...u, email: e.target.value})} required />
      <input placeholder="Ano de Nascimento" type="number" value={u.anoNascimento} onChange={e => setU({...u, anoNascimento: e.target.value})} required />
      <input placeholder="Gênero" value={u.genero} onChange={e => setU({...u, genero: e.target.value})} required />
      <input placeholder="CPF" value={u.cpf} onChange={e => setU({...u, cpf: e.target.value})} required />
      <button type="submit" className="btn btn-edit" style={{width: '100%', marginTop: '10px'}}>Salvar Dados</button>
    </form>
  );
}