// Añade esto al inicio del archivo
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

// Exporta el componente como default
const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      {/* Tu formulario de login aquí */}
    </div>
  );
};

export default LoginPage; // ¡Esta línea es crucial!