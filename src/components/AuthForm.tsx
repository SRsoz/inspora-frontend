import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { useAuth } from '../context/AuthContext';
import { createUser, updateUser } from '../context/api';
import api from '../context/api';

interface AuthFormProps {
  mode: 'login' | 'register' | 'admin-create' | 'admin-edit';
  selectedUser?: { id: string; username: string; email: string; role: string } | null;
  onClose?: () => void;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export default function AuthForm({ mode, selectedUser, onClose }: AuthFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginData | RegisterData>({
    username: selectedUser?.username || '',
    email: selectedUser?.email || '',
    password: '',
    role: selectedUser?.role || 'user',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/users/login' : '/users/register';
      const data = mode === 'login' ? { username: formData.username, password: formData.password } : formData;

      const response = await (mode === 'login' ? api.post(endpoint, data) :
                              mode === 'admin-edit' ? updateUser(selectedUser!.id, data as RegisterData) :
                              createUser(data as RegisterData));

      if (mode === 'login' && response.data.token) {
        login(response.data);
        navigate('/');
      } else if (mode === 'register') {
        navigate('/auth?mode=login');
      } else if (mode === 'admin-create' || mode === 'admin-edit') {
        if (onClose) onClose();
      }
    } catch (err: any) {
      console.error('AuthForm: Error:', err.message);
      setError(err.response?.data?.message || `Failed to ${mode}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '', role: 'user' });
    if (onClose) onClose();
  };

  return (
    <div className="p-10 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 font-playfair">
        {mode === 'login' ? 'Login to your account' :
         mode === 'register' ? 'Create an account' :
         mode === 'admin-create' ? 'Create New User' : 'Edit User'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-poppins">
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          />
          {(mode === 'register' || mode === 'admin-create' || mode === 'admin-edit') && (
            <InputField
              label="Email"
              name="email"
              type="email"
              value={'email' in formData ? formData.email : ''}
              onChange={handleChange}
            />
          )}
          <InputField
            label={mode === 'admin-edit' ? 'Password (Leave blank to keep unchanged)' : 'Password'}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={mode !== 'admin-edit'}
          />
          {(mode === 'admin-create' || mode === 'admin-edit') && (
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Role</label>
              <select
                name="role"
                value={'role' in formData ? formData.role : 'user'}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <div className="flex gap-4">
            {(mode === 'register' || mode === 'admin-create' || mode === 'admin-edit') && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition font-medium"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Loading...' :
               mode === 'login' ? 'LOGIN NOW' :
               mode === 'register' ? 'SIGN UP NOW' :
               mode === 'admin-create' ? 'CREATE USER' : 'UPDATE USER'}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        {mode !== 'admin-create' && mode !== 'admin-edit' && (
          <p className="text-sm text-center mt-4 font-poppins">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <span
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate('/auth?mode=register')}
                >
                  Sign Up!
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate('/auth?mode=login')}
                >
                  Login
                </span>
              </>
            )}
          </p>
        )}
      </div>
  );
}