import React, { useState } from 'react';
import { deleteUser } from '../context/api';
import DeleteUserModal from './DeleteUserModal';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: User[];
  onEdit: (user: { id: string; username: string; email: string; role: string }) => void;
  fetchUsers: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, fetchUsers }) => {
  const [loading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setDeleteUserId(null);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading && users.length === 0) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 font-playfair text-center">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Username</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition font-medium"
                      onClick={() => onEdit({ id: user._id, username: user.username, email: user.email, role: user.role })}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition font-medium"
                      onClick={() => setDeleteUserId(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deleteUserId && (
          <DeleteUserModal
            onConfirm={() => handleDelete(deleteUserId)}
            onCancel={() => setDeleteUserId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;