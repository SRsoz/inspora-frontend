import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import AdminRoute from '../components/AdminRoute';
import { getAllUsers } from '../context/api';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; username: string; email: string; role: string } | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminRoute requireAdmin>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 gap-8">
          <UserForm selectedUser={selectedUser} onClose={() => { setSelectedUser(null); fetchUsers(); }} />
          <UserList users={users} onEdit={setSelectedUser} fetchUsers={fetchUsers} />
        </main>
    </AdminRoute>
  );
};

export default AdminDashboard;