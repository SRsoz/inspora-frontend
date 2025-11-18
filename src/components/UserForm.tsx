import React from 'react';
import AuthForm from './AuthForm';

interface UserFormProps {
  selectedUser: { _id: string; username: string; email: string; role: string } | null;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ selectedUser, onClose }) => {
  return (
    <div className="pt-20 w-full max-w-md">
      <AuthForm mode={selectedUser ? 'admin-edit' : 'admin-create'} selectedUser={selectedUser} onClose={onClose} />
    </div>
  );
};

export default UserForm;