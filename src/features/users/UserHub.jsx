import React, { useMemo, useRef, useState } from 'react';
import { useUsersData } from './hooks/useUsersData';

const emptyForm = { first_name: '', last_name: '', email: '' };

export default function UserHub({ onActivity }) {
  const { users, loading, error, addUser, updateUser, deleteUser } = useUsersData();
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('recentes');
  const [page, setPage] = useState(1);
  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);
  const pageSize = 4;

  const filteredUsers = useMemo(() => {
    const result = users.filter((user) => {
      const matchesSearch = `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || user.id > 0;
      return matchesSearch && matchesStatus;
    });
    return [...result].sort((a, b) => sortOrder === 'nome' ? `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`) : b.id - a.id);
  }, [users, search, sortOrder, statusFilter]);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const visibleUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  const showFeedback = (message) => {
    setFeedbackMsg(message);
    window.setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      const updated = await updateUser(editingId, formData);
      if (updated) onActivity({ type: 'update', title: 'Perfil atualizado', detail: `Os dados de ${formData.first_name} ${formData.last_name} foram atualizados` });
      showFeedback('Perfil atualizado com sucesso');
    } else {
      const created = await addUser(formData);
      if (created) onActivity({ type: 'create', title: 'Novo estudante cadastrado', detail: `${formData.first_name} ${formData.last_name} entrou na base acadêmica` });
      showFeedback('Novo estudante adicionado');
    }
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleEdit = (user) => {
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    setEditingId(user.id);
    document.getElementById('first_name').focus();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const updateSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const chooseFilter = (value) => {
    setStatusFilter(value);
    setFilterOpen(false);
    filterButtonRef.current?.focus();
    setPage(1);
    showFeedback(value === 'Ativos' ? 'Exibindo estudantes ativos' : 'Exibindo todos os estudantes');
  };

  const chooseSort = (value) => {
    setSortOrder(value);
    setSortOpen(false);
    sortButtonRef.current?.focus();
    setPage(1);
  };

  return (
    <div className="dashboard-grid">
      <div className="metrics-row" role="region" aria-label="Resumo de estudantes">
        <article className="metric-card metric-primary"><div className="metric-icon" aria-hidden="true">◎</div><div><span>Total de estudantes</span><strong>{users.length + 74}</strong><small><b>↑ 12.8%</b> desde o último mês</small></div><div className="sparkline" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div></article>
        <article className="metric-card"><div className="metric-icon purple" aria-hidden="true">◌</div><div><span>Ativos este mês</span><strong>{users.length + 61}</strong><small><b>↑ 8.4%</b> de engajamento</small></div><div className="metric-ring" role="img" aria-label="82 por cento">82<span aria-hidden="true">%</span></div></article>
        <article className="metric-card"><div className="metric-icon orange" aria-hidden="true">◒</div><div><span>Novos cadastros</span><strong>24</strong><small><b>↑ 4.2%</b> nos últimos 30 dias</small></div><div className="metric-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div></article>
      </div>

      <div className="workspace-grid" id="students">
        <section className="panel form-panel">
          <div className="panel-heading"><div><span className="panel-kicker">{editingId ? 'MODO DE EDIÇÃO' : 'NOVO REGISTRO'}</span><h2>{editingId ? 'Editar estudante' : 'Adicionar estudante'}</h2></div><span className="form-step">01 <i /> 02</span></div>
          <p className="panel-description">Crie um perfil para acompanhar a jornada acadêmica.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="first_name">Nome<input id="first_name" autoComplete="given-name" required value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value })} placeholder="Ex: Beatriz" /></label>
            <label htmlFor="last_name">Sobrenome<input id="last_name" autoComplete="family-name" required value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value })} placeholder="Ex: Almeida" /></label>
            <label htmlFor="email">E-mail<input id="email" type="email" autoComplete="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="nome@universidade.com" /></label>
            <div className="form-actions"><button className="primary-button" type="submit"><span aria-hidden="true">＋</span>{editingId ? 'Salvar alterações' : 'Adicionar estudante'}</button>{editingId && <button className="text-button" type="button" onClick={cancelEdit}>Cancelar</button>}</div>
          </form>
          <div className="form-footer"><span className="shield-icon" aria-hidden="true">◇</span><span>Seus dados estão protegidos<br /><b>Sincronização segura habilitada</b></span></div>
        </section>

        <section className="panel list-panel">
          <div className="list-header"><div><span className="panel-kicker">DIRETÓRIO ACADÊMICO</span><h2>Estudantes <em>{filteredUsers.length}</em></h2></div><div className="menu-wrap"><button className="filter-button" type="button" ref={filterButtonRef} onClick={() => setFilterOpen(!filterOpen)} aria-expanded={filterOpen} aria-controls={filterOpen ? 'student-filter-options' : undefined}>Filtrar: {statusFilter} <span aria-hidden="true">⌄</span></button>{filterOpen && <div className="floating-menu" id="student-filter-options" role="group" aria-label="Filtro de estudantes" onKeyDown={(event) => { if (event.key === 'Escape') { setFilterOpen(false); filterButtonRef.current?.focus(); } }}><button type="button" onClick={() => chooseFilter('Todos')}>Todos os estudantes</button><button type="button" onClick={() => chooseFilter('Ativos')}>Ativos agora</button></div>}</div></div>
          <div className="search-box"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="student-search">Buscar estudantes por nome ou e-mail</label><input id="student-search" type="search" value={search} onChange={updateSearch} placeholder="Buscar por nome ou e-mail..." /></div>
          <div className="list-meta"><span>{visibleUsers.length} de {filteredUsers.length} perfis encontrados</span><div className="menu-wrap"><button type="button" ref={sortButtonRef} onClick={() => setSortOpen(!sortOpen)} aria-label="Ordenar estudantes" aria-expanded={sortOpen} aria-controls={sortOpen ? 'student-sort-options' : undefined}>{sortOrder === 'nome' ? 'Nome' : 'Mais recentes'} <span aria-hidden="true">⌄</span></button>{sortOpen && <div className="floating-menu sort-menu" id="student-sort-options" role="group" aria-label="Ordenação dos estudantes" onKeyDown={(event) => { if (event.key === 'Escape') { setSortOpen(false); sortButtonRef.current?.focus(); } }}><button type="button" onClick={() => chooseSort('recentes')}>Mais recentes</button><button type="button" onClick={() => chooseSort('nome')}>Ordem alfabética</button></div>}</div></div>
          {feedbackMsg && <div className="feedback" aria-live="polite"><span aria-hidden="true">✓</span>{feedbackMsg}</div>}
          {loading && <div className="loading-state" role="status"><span className="loader" aria-hidden="true" />Carregando estudantes</div>}
          {error && <div className="error-state" role="alert">Não foi possível carregar os dados: {error}</div>}
          {!loading && !error && <div className="student-list">{visibleUsers.map((user, index) => <article className="student-row" key={user.id} style={{ '--delay': `${index * 60}ms` }}>
            <img src={user.avatar} alt={`Fotografia de ${user.first_name} ${user.last_name}`} />
            <div className="student-details"><strong>{user.first_name} {user.last_name}</strong><span>{user.email}</span></div>
            <span className="active-label"><i aria-hidden="true" />Ativo</span>
            <div className="row-actions"><button onClick={() => handleEdit(user)} aria-label={`Editar dados de ${user.first_name}`}>Editar</button><button className="delete-button" onClick={() => {             if (window.confirm(`Deseja remover ${user.first_name}?`)) { deleteUser(user.id).then((deleted) => { if (deleted) onActivity({ type: 'delete', title: 'Estudante removido', detail: `${user.first_name} ${user.last_name} foi removido do diretório acadêmico` }); }); showFeedback(`${user.first_name} foi removido`); } }} aria-label={`Excluir ${user.first_name}`}>Excluir</button></div>
          </article>)}</div>}
          {!loading && !error && !visibleUsers.length && <div className="empty-state" role="status">Nenhum estudante encontrado.</div>}
          <div className="list-footer" aria-live="polite"><span>Mostrando {visibleUsers.length ? (page - 1) * pageSize + 1 : 0} a {Math.min(page * pageSize, filteredUsers.length)} de {filteredUsers.length} estudantes</span><nav aria-label="Paginação de estudantes"><button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Página anterior">‹</button>{Array.from({ length: totalPages }, (_, index) => <button type="button" key={index + 1} onClick={() => setPage(index + 1)} className={page === index + 1 ? 'current-page' : ''} aria-current={page === index + 1 ? 'page' : undefined} aria-label={`Página ${index + 1}`}>{index + 1}</button>)}<button type="button" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} aria-label="Próxima página">›</button></nav></div>
        </section>
      </div>
    </div>
  );
}
