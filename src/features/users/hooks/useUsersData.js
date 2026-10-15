import { useState, useEffect } from 'react';
import * as userService from '../../../services/userService';

export function useUsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
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
      // O Reqres simula a criação, mas não guarda no backend. Adicionamos localmente para refletir na interface.
      setUsers((prev) => [{ ...userData, id: newUser.id, avatar: 'https://reqres.in/img/faces/1-image.jpg' }, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await userService.updateUser(id, userData);
      setUsers((prev) => prev.map(u => (u.id === id ? { ...u, ...userData } : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error, addUser, updateUser, deleteUser };
}
