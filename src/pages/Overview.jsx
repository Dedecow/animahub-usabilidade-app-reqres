import React from 'react';

export default function Overview({
  users,
  loading,
  error,
  activities,
  onNavigate,
}) {
  const recentActivities = activities.slice(0, 4);

  return (
    <section className="admin-dashboard" id="overview" aria-labelledby="admin-title">
      <div className="welcome-row">
        <div>
          <h1 id="admin-title">
            Painel administrativo <span aria-hidden="true">✦</span>
          </h1>
          <p className="subtitle">
            Acompanhe as informações do diretório acadêmico.
          </p>
        </div>

        <div className="live-chip">
          <span className="status-pulse" aria-hidden="true" />
          {loading
            ? 'Carregando dados'
            : error
              ? 'Falha na sincronização'
              : 'Dados carregados'}
        </div>
      </div>

      {error && (
        <div className="error-state" role="alert">
          Não foi possível carregar os estudantes: {error}
        </div>
      )}

      <div
        className="metrics-row"
        role="region"
        aria-label="Indicadores administrativos"
      >
        <article className="metric-card metric-primary">
          <div className="metric-icon" aria-hidden="true">
            ◎
          </div>
          <div>
            <span>Estudantes carregados</span>
            <strong>{loading ? '—' : users.length}</strong>
            <small>Registros disponíveis nesta consulta</small>
          </div>
        </article>

        <article className="metric-card">
          <div className="metric-icon purple" aria-hidden="true">
            ↻
          </div>
          <div>
            <span>Atividades registradas</span>
            <strong>{activities.length}</strong>
            <small>Eventos apresentados na central</small>
          </div>
        </article>

        <article className="metric-card">
          <div className="metric-icon orange" aria-hidden="true">
            ✓
          </div>
          <div>
            <span>Estado da consulta</span>
            <strong>{loading ? '...' : error ? 'Erro' : 'OK'}</strong>
            <small>
              {loading
                ? 'Consultando a API'
                : error
                  ? 'Verifique a conexão'
                  : 'Consulta concluída'}
            </small>
          </div>
        </article>
      </div>

      <div className="admin-summary-grid">
        <section className="panel admin-summary">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">GESTÃO ACADÊMICA</span>
              <h2>Resumo do sistema</h2>
            </div>
          </div>

          <p className="panel-description">
            Consulte os estudantes e acompanhe as movimentações registradas
            na aplicação.
          </p>

          <div className="admin-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => onNavigate('students')}
            >
              Gerenciar estudantes →
            </button>

            <button
              className="text-button"
              type="button"
              onClick={() => onNavigate('activity')}
            >
              Ver central de atividades →
            </button>
          </div>
        </section>

        <section className="panel admin-summary">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">MOVIMENTAÇÕES RECENTES</span>
              <h2>Últimas atividades</h2>
            </div>
          </div>

          {recentActivities.length > 0 ? (
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <article className="activity-item" key={activity.id}>
                  <span className="activity-icon" aria-hidden="true">
                    {activity.icon}
                  </span>

                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.detail}</p>
                  </div>

                  <time>{activity.time}</time>
                </article>
              ))}
            </div>
          ) : (
            <p className="panel-description">
              Nenhuma atividade registrada.
            </p>
          )}

          <div className="activity-footer">
            <span>Consulte o histórico disponível</span>
            <button
              type="button"
              onClick={() => onNavigate('activity')}
            >
              Ver todas →
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}