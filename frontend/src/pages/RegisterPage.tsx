// Añade esto al inicio del archivo
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

// Exporta el componente
const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      {/* Tu formulario de registro aquí */}
    </div>
  );
};

export default RegisterPage; // Exportación necesaria