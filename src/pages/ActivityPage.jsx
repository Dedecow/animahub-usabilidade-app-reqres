import React, { useState } from 'react';

export default function ActivityPage({ activities, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'create', label: 'Cadastros' },
    { key: 'update', label: 'Atualizações' },
    { key: 'delete', label: 'Exclusões' },
    { key: 'sync', label: 'Sincronizações' },
  ];
  const filteredItems =
    filter === 'all'
      ? activities
      : activities.filter((item) => item.type === filter);
  const activeFilterLabel = filters.find((item) => item.key === filter).label;

  return (
    <section
      className="activity-center"
      id="activity"
      aria-labelledby="activity-title"
    >
      <div className="activity-heading">
        <div>
          <span className="panel-kicker">CENTRAL DE ATIVIDADES</span>
          <h2 id="activity-title">O que está acontecendo</h2>
          <p>
            Acompanhe as movimentações recentes da sua comunidade acadêmica.
          </p>
        </div>
        <span className="activity-live">
          <i aria-hidden="true" />
          Atualizado em tempo real
        </span>
      </div>
      <div
        className="activity-toolbar"
        role="group"
        aria-label="Filtrar atividades"
      >
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={filter === item.key}
            className={filter === item.key ? 'selected' : ''}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Exibindo {filteredItems.length}{' '}
        {filteredItems.length === 1 ? 'atividade' : 'atividades'} para o filtro{' '}
        {activeFilterLabel}.
      </p>
      <div className="activity-list">
        {filteredItems.map((item) => (
          <article
            className={`activity-item activity-${item.type}`}
            key={item.id}
          >
            <span className="activity-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
            <span className="activity-time">{item.time}</span>
          </article>
        ))}
      </div>
      {!filteredItems.length && (
        <div className="activity-empty">
          Nenhuma atividade nesta categoria.
        </div>
      )}
      <div className="activity-footer">
        <span>Exibindo as últimas movimentações</span>
        <button type="button" onClick={() => onNavigate('students')}>
          Ir para estudantes <b aria-hidden="true">→</b>
        </button>
      </div>
    </section>
  );
}
