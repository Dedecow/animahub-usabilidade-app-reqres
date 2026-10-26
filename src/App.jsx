import React, { useEffect, useState } from 'react';
import { DemoModeProvider } from './context/DemoModeContext';
import Overview from './pages/Overview';
import StudentsPage from './pages/StudentsPage';
import ActivityPage from './pages/ActivityPage';
import { useUsersData } from './features/users/hooks/useUsersData';
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

export default function App() {
  const [isMobileDevice, setIsMobileDevice] = useState(() => (
    window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-width: 1024px)').matches
  ));
  const [activeSection, setActiveSection] = useState(() =>
    ['overview', 'students', 'activity'].includes(window.location.hash.slice(1))
      ? window.location.hash.slice(1)
      : 'overview'
  );
  const [notice, setNotice] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [activities, setActivities] = useState(initialActivityItems);
  const userData = useUsersData();
  const sectionNames = {
    overview: 'Visão geral',
    students: 'Estudantes',
    activity: 'Atividade'
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-width: 1024px)');
    const syncDeviceType = () => setIsMobileDevice(mobileQuery.matches);
    mobileQuery.addEventListener('change', syncDeviceType);
    return () => mobileQuery.removeEventListener('change', syncDeviceType);
  }, []);

  useEffect(() => {
    const syncSectionWithHash = () => {
      const section = window.location.hash.slice(1);
      if (['overview', 'students', 'activity'].includes(section)) {
        setActiveSection(section);
      }
    };

    window.addEventListener('hashchange', syncSectionWithHash);
    return () => window.removeEventListener('hashchange', syncSectionWithHash);
  }, []);

  const navigateToSection = (section) => {
    setActiveSection(section);
    if (window.location.hash !== `#${section}`) {
      window.history.replaceState(null, '', `#${section}`);
    }
  };

  const handleSectionNavigation = (event, section) => {
    event.preventDefault();
    navigateToSection(section);
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2500);
  };

  const registerActivity = (activity) => {
    setActivities((current) => [{ ...activity, id: `${activity.type}-${Date.now()}`, time: 'Agora', icon: activity.type === 'create' ? '+' : activity.type === 'update' ? '↗' : '−' }, ...current]);
  };

  return (
    <DemoModeProvider>
      <div className={`app-shell${readingMode ? ' reading-mode' : ''}`} data-device={isMobileDevice ? 'mobile' : 'desktop'}>
        <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
        <aside className="sidebar" aria-label="Barra lateral">
          <div className="brand">
            <BrandMark />
            <div>
              <strong>Anima<span>Hub</span></strong>
              <small>Student intelligence</small>
            </div>
          </div>

          <nav className="main-nav" aria-label="Navegação principal">
            <a className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`} href="#overview" aria-label="Visão geral" aria-current={activeSection === 'overview' ? 'page' : undefined} onClick={(event) => handleSectionNavigation(event, 'overview')}><span className="nav-icon" aria-hidden="true">◈</span>Visão geral</a>
            <a className={`nav-item ${activeSection === 'students' ? 'active' : ''}`} href="#students" aria-label="Estudantes" aria-current={activeSection === 'students' ? 'page' : undefined} onClick={(event) => handleSectionNavigation(event, 'students')}><span className="nav-icon" aria-hidden="true">◎</span>Estudantes</a>
            <a className={`nav-item ${activeSection === 'activity' ? 'active' : ''}`} href="#activity" aria-label="Atividade" aria-current={activeSection === 'activity' ? 'page' : undefined} onClick={(event) => handleSectionNavigation(event, 'activity')}><span className="nav-icon" aria-hidden="true">◒</span>Atividade</a>
          </nav>

          <div className="sidebar-bottom">
            <div className="status-card">
              <span className="status-pulse" aria-hidden="true" />
              <div><strong>Base conectada</strong><small>Reqres API online</small></div>
            </div>
            <div className="user-badge"><span aria-hidden="true">ES</span><div><strong>Estudantes</strong><small>Administrador</small></div><b aria-hidden="true">•••</b></div>
          </div>
        </aside>

        <main className="content-area" id="main-content" aria-label={sectionNames[activeSection]} tabIndex="-1">
          <header className="topbar">
            <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{sectionNames[activeSection]}</strong></div>            <div className="top-actions">
              <button className="reading-mode-toggle" type="button" aria-pressed={readingMode} onClick={() => setReadingMode((enabled) => !enabled)}>Modo de leitura</button>
              <div className="notification-wrap">
                <button className={`icon-button ${notificationsOpen ? 'is-open' : ''}`} type="button" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Abrir notificações" aria-expanded={notificationsOpen} aria-controls={notificationsOpen ? 'notification-panel' : undefined}>
                  <span className="bell-surface">
                    <svg className="bell-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
                  </span>
                </button>
                {notificationsOpen && <div className="notification-panel" id="notification-panel" role="status"><span className="notification-panel-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg></span><strong>Nenhuma notificação</strong><p>Você está em dia por aqui.</p></div>}
              </div>
              <button className="avatar-button" type="button" onClick={() => showNotice('Perfil de Estudantes')}><span aria-hidden="true">ES</span><span className="sr-only">Abrir perfil de Estudantes</span></button>
            </div>
          </header>
          <div className="page-content">
            {activeSection !=='overview' && (
            <div className="welcome-row">
              <div><h1 id="page-title">{activeSection === 'activity' ? 'Atividade' : 'Estudantes'} <span aria-hidden="true">✦</span></h1><p className="subtitle">{activeSection === 'activity' ? 'Acompanhe as movimentações da sua comunidade acadêmica.' : 'Acompanhe o pulso da sua comunidade acadêmica.'}</p></div>
              <div className="live-chip"><span className="status-pulse" aria-hidden="true" />Dados sincronizados agora</div>
            </div>
            )}
            {activeSection === 'overview' && (
  <Overview
    users={userData.users}
    loading={userData.loading}
    error={userData.error}
    activities={activities}
    onNavigate={navigateToSection}
  />
)}

{activeSection === 'students' && (
  <StudentsPage
    users={userData.users}
    loading={userData.loading}
    error={userData.error}
    addUser={userData.addUser}
    updateUser={userData.updateUser}
    deleteUser={userData.deleteUser}
    onActivity={registerActivity}
  />
)}

{activeSection === 'activity' && (
  <ActivityPage
    activities={activities}
    onNavigate={navigateToSection}
  />
)}
          </div>
          <div className={`global-notice${notice ? '' : ' sr-only'}`} role="status" aria-live="polite" aria-atomic="true">{notice}</div>
        </main>
      </div>
    </DemoModeProvider>
  );
}
