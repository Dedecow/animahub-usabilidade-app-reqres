import React from 'react';
import UserHub from '../features/users/UserHub';

export default function StudentsPage({
  users,
  loading,
  error,
  addUser,
  updateUser,
  deleteUser,
  onActivity,
}) {
  return (
    <section id="students" aria-label="Estudantes">
      <UserHub
        users={users}
        loading={loading}
        error={error}
        addUser={addUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
        onActivity={onActivity}
      />
    </section>
  );
}
