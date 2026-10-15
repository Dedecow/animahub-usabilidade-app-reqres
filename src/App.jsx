import React, { useEffect, useState } from 'react';
import { DemoModeProvider } from './context/DemoModeContext';
import UserHub from './features/users/UserHub';
import './App.css';

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span className="brand-orbit brand-orbit-one" />
      <span className="brand-orbit brand-orbit-two" />
      <span className="brand-core">A</span>
    </div>
  );
}

const initialActivityItems = [
  { id: 'seed-create', type: 'create', title: 'Novo estudante cadastrado', detail: 'Tracey Ramos entrou na base acadêmica', time: 'Hoje, 09:42', icon: '+' },
  { id: 'seed-update', type: 'update', title: 'Perfil atualizado', detail: 'Os dados de Charles Morris foram atualizados', time: 'Hoje, 08:16', icon: '↗' },
  { id: 'seed-sync', type: 'sync', title: 'Sincronização concluída', detail: '6 perfis foram sincronizados com a Reqres API', time: 'Ontem, 17:30', icon: '↻' },
  { id: 'seed-delete', type: 'delete', title: 'Estudante removido', detail: 'Um perfil foi removido do diretório acadêmico', time: 'Ontem, 14:08', icon: '−' },
];

function ActivityCenter({ activities, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(() => Date.now());
  const filters = [{ key: 'all', label: 'Todas' }, { key: 'create', label: 'Cadastros' }, { key: 'update', label: 'Atualizações' }, { key: 'sync', label: 'Sincronizações' }];
  const filteredItems = filter === 'all' ? activities : activities.filter((item) => item.type === filter);

  useEffect(() => {
    const interval = window.setInterval(() => setLastUpdated(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="activity-center" id="activity">
      <div className="activity-heading">
        <div><span className="panel-kicker">CENTRAL DE ATIVIDADES</span><h2>O que está acontecendo</h2><p>Acompanhe as movimentações recentes da sua comunidade acadêmica.</p></div>
        <span className="activity-live"><i />{lastUpdated ? 'Atualizado em tempo real' : 'Atualizado agora'}</span>
      </div>
      <div className="activity-toolbar">{filters.map((item) => <button key={item.key} className={filter === item.key ? 'selected' : ''} onClick={() => setFilter(item.key)}>{item.label}</button>)}</div>
      <div className="activity-list">{filteredItems.map((item) => <article className={`activity-item activity-${item.type}`} key={item.id}><span className="activity-icon">{item.icon}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div><time>{item.time}</time></article>)}</div>
      {!filteredItems.length && <div className="activity-empty">Nenhuma atividade nesta categoria.</div>}
      <div className="activity-footer"><span>Exibindo as últimas movimentações</span><button onClick={() => onNavigate('students')}>Ir para estudantes <b>→</b></button></div>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [notice, setNotice] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activities, setActivities] = useState(initialActivityItems);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2500);
  };

  const registerActivity = (activity) => {
    setActivities((current) => [{ ...activity, id: `${activity.type}-${Date.now()}`, time: 'Agora', icon: activity.type === 'create' ? '+' : activity.type === 'update' ? '↗' : '−' }, ...current]);
  };

  return (
    <DemoModeProvider>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <BrandMark />
            <div>
              <strong>Anima<span>Hub</span></strong>
              <small>Student intelligence</small>
            </div>
          </div>

          <nav className="main-nav" aria-label="Navegação principal">
            <a className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`} href="#overview" onClick={() => setActiveSection('overview')}><span className="nav-icon">◈</span>Visão geral</a>
            <a className={`nav-item ${activeSection === 'students' ? 'active' : ''}`} href="#students" onClick={() => setActiveSection('students')}><span className="nav-icon">◎</span>Estudantes</a>
            <a className={`nav-item ${activeSection === 'activity' ? 'active' : ''}`} href="#activity" onClick={(event) => { event.preventDefault(); setActiveSection('activity'); }}><span className="nav-icon">◒</span>Atividade</a>
          </nav>

          <div className="sidebar-bottom">
            <div className="status-card">
              <span className="status-pulse" />
              <div><strong>Base conectada</strong><small>Reqres API online</small></div>
            </div>
            <div className="user-badge"><span>ES</span><div><strong>Estudantes</strong><small>Administrador</small></div><b>•••</b></div>
          </div>
        </aside>

        <main className="content-area">
          <header className="topbar">
            <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>Visão geral</strong></div>
            <div className="top-actions">
              <div className="notification-wrap">
                <button className={`icon-button ${notificationsOpen ? 'is-open' : ''}`} onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Abrir notificações" aria-expanded={notificationsOpen}>
                  <span className="bell-surface">
                    <svg className="bell-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
                  </span>
                </button>
                {notificationsOpen && <div className="notification-panel" role="status"><span className="notification-panel-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg></span><strong>Nenhuma notificação</strong><p>Você está em dia por aqui.</p></div>}
              </div>
              <button className="avatar-button" onClick={() => showNotice('Perfil de Estudantes')} aria-label="Abrir perfil">ES</button>
            </div>
          </header>
          <section className="page-content" id="overview">
            <div className="welcome-row">
              <div><h1>{activeSection === 'activity' ? 'Atividade' : 'Estudantes'} <span>✦</span></h1><p className="subtitle">{activeSection === 'activity' ? 'Acompanhe as movimentações da sua comunidade acadêmica.' : 'Acompanhe o pulso da sua comunidade acadêmica.'}</p></div>
              <div className="live-chip"><span className="status-pulse" />Dados sincronizados agora</div>
            </div>
            {activeSection === 'activity' ? <ActivityCenter activities={activities} onNavigate={setActiveSection} /> : <UserHub onActivity={registerActivity} />}
          </section>
          {notice && <div className="global-notice" role="status">{notice}</div>}
        </main>
      </div>
    </DemoModeProvider>
  );
}
