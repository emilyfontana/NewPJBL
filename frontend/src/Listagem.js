import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Listagem() {
  const [users, setUsers] = useState([]);
  
  const load = () => {
    fetch('http://localhost:3001/usuarios').then(r => r.json()).then(setUsers);
  };

  useEffect(() => load(), []);

  const del = (id) => {
    if(window.confirm("Excluir usuário?")) {
      fetch(`http://localhost:3001/usuarios/${id}`, { method: 'DELETE' }).then(load);
    }
  };

  return (
    <div>
      <h3>Gerenciamento de Usuários</h3>
      <table>
        <thead><tr><th>Nome</th><th>Email</th><th>CPF</th><th>Ações</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.cpf}</td>
              <td>
                <Link to={`/detalhes/${u.id}`} className="btn btn-view">Ver</Link>
                <Link to={`/editar/${u.id}`} className="btn btn-edit">Editar</Link>
                <button onClick={() => del(u.id)} className="btn btn-del">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}