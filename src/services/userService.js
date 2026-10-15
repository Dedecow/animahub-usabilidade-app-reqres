/**
 * Serviço responsável por interagir com a API Reqres (https://reqres.in/)
 * UC: Usabilidade, desenvolvimento web, mobile e jogos — Universidade Ânima
 */

const BASE_URL = 'https://reqres.in/api';

/**
 * Busca a lista de utilizadores com suporte a paginação.
 * @param {number} page - Número da página desejada (padrão: 1)
 * @returns {Promise<Object>} Objeto contendo os dados, paginação e metadados da API
 */
export async function fetchUsers(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Falha ao buscar utilizadores na API Reqres:', error);
    throw error;
  }
}

/**
 * Busca um único utilizador pelo ID.
 * Útil para simular o cenário de sucesso ou o erro 404 (utilizador não encontrado).
 * @param {number|string} id - ID do utilizador
 * @returns {Promise<Object>} Dados do utilizador
 */
export async function fetchUserById(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    
    if (response.status === 404) {
      throw new Error('Utilizador não encontrado (404)');
    }

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Retorna apenas o objeto do utilizador
  } catch (error) {
    console.error(`Falha ao buscar o utilizador com ID ${id}:`, error);
    throw error;
  }
}

export async function createUser(userData) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Erro ao criar');
  return await response.json();
}

export async function updateUser(id, userData) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Erro ao atualizar');
  return await response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao excluir');
  return true;
}
