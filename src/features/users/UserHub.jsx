import React, { useState } from 'react';
import { useUsersData } from './hooks/useUsersData';

export default function UserHub() {
  const { users, loading, error, addUser, updateUser, deleteUser } = useUsersData();
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [activeAvatar, setActiveAvatar] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(''); // Estado para feedback de ações

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateUser(editingId, formData);
      showFeedback('Estudante atualizado com sucesso.');
      setEditingId(null);
    } else {
      await addUser(formData);
      showFeedback('Novo estudante adicionado.');
    }
    setFormData({ first_name: '', last_name: '', email: '' });
  };

  const handleEdit = (user) => {
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    setEditingId(user.id);
    document.getElementById('first_name').focus(); // Usabilidade: Foca no input ao editar
  };

  return (
    <div style={{ display: 'flex', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
      
      <section style={{ width: '320px' }} aria-labelledby="form-title">
        <h2 id="form-title">{editingId ? 'Editar Estudante' : 'Adicionar Estudante'}</h2>
        
        {/* Região ao vivo para leitores de ecrã anunciarem sucessos ou erros */}
        <div aria-live="polite" style={{ minHeight: '24px', color: 'green', fontWeight: 'bold' }}>
          {feedbackMsg}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="first_name" style={{ display: 'block', marginBottom: '5px' }}>Nome</label>
            <input id="first_name" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div>
            <label htmlFor="last_name" style={{ display: 'block', marginBottom: '5px' }}>Sobrenome</label>
            <input id="last_name" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>E-mail</label>
            <input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '10px', flex: 1, cursor: 'pointer', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px' }}>
              {editingId ? 'Guardar Alterações' : 'Adicionar'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ first_name: '', last_name: '', email: '' }); }} style={{ padding: '10px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {activeAvatar && (
          <aside style={{ marginTop: '30px', textAlign: 'center' }} aria-hidden="true">
            <img src={activeAvatar} alt="" style={{ borderRadius: '50%', width: '120px', border: '3px solid #0056b3' }} />
          </aside>
        )}
      </section>

      <section style={{ flex: 1, minWidth: '300px' }} aria-labelledby="list-title">
        <h2 id="list-title">Lista de Estudantes</h2>
        
        {loading && <p aria-live="polite">A carregar registos...</p>}
        {error && <p aria-live="assertive" style={{ color: 'red' }}>Erro ao carregar: {error}</p>}

        {!loading && !error && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {users.map((user) => (
              <li 
                key={user.id} 
                onMouseEnter={() => setActiveAvatar(user.avatar)}
                onFocus={() => setActiveAvatar(user.avatar)} // Acessibilidade para navegação por teclado
                tabIndex="0" // Torna o item focável
                style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderBottom: '1px solid #ddd' }}
              >
                <img src={user.avatar} alt={`Fotografia de ${user.first_name}`} style={{ width: '50px', borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <strong>{user.first_name} {user.last_name}</strong> <br/>
                  <span style={{ color: '#555' }}>{user.email}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleEdit(user)} 
                    aria-label={`Editar dados de ${user.first_name}`}
                    style={{ cursor: 'pointer', padding: '6px 12px' }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm(`Tem a certeza que deseja excluir ${user.first_name}?`)) {
                        deleteUser(user.id);
                        showFeedback(`${user.first_name} foi removido.`);
                      }
                    }} 
                    aria-label={`Excluir ${user.first_name} do sistema`}
                    style={{ cursor: 'pointer', padding: '6px 12px', color: '#fff', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px' }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
