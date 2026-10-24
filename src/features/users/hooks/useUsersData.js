import { useState, useEffect } from 'react';
import * as userService from '../../../services/userService';

export function useUsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await userService.fetchUsers(1);
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const newUser = await userService.createUser(userData);
      // Gera um avatar seguro usando as iniciais do nome do estudante.
      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(`${userData.first_name} ${userData.last_name}`)}&background=7450cf&color=fff&size=128`;

      setUsers((prev) => [
        {
          ...userData,
          id: newUser.id,
          avatar: fallbackAvatar,
        },
        ...prev,
      ]);
      return true;
    } catch (err) {
      console.error('Falha ao adicionar:', err);
      return false;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await userService.updateUser(id, userData);
      setUsers((prev) => prev.map(u => (u.id === id ? { ...u, ...userData } : u)));
      return true;
    } catch (err) {
      console.error('Falha ao atualizar:', err);
      return false;
    }
  };

  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter(u => u.id !== id));
      return true;
    } catch (err) {
      console.error('Falha ao remover:', err);
      return false;
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error, addUser, updateUser, deleteUser };
}
