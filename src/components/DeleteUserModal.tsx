import React from 'react';

interface DeleteUserModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;