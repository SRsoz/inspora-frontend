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
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 font-playfair text-center">
          Users
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.username}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>


                <p className="text-sm text-gray-600 break-all">{user.email}</p>
              </div>


              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm"
                  onClick={() =>
                    onEdit({
                      id: user._id,
                      username: user.username,
                      email: user.email,
                      role: user.role,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium text-sm"
                  onClick={() => setDeleteUserId(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>


        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}


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