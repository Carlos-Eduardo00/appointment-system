import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Input from '../components/Input.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { loginAdmin } from '../services/authService.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Usuário e senha são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginAdmin({ username, password });
      login(response.data);
      const redirectTo = location.state?.from || '/admin/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page admin-login-page">
      <div className="admin-login-card card">
        <h1>Área Administrativa</h1>
        <p className="lead">Informe suas credenciais para acessar o painel.</p>

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <Input
            id="username"
            label="Usuário"
            required
            value={username}
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
          />

          <Input
            id="password"
            label="Senha"
            required
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <ErrorMessage message={error} />

          <Button type="submit" loading={loading}>
            Entrar
          </Button>
        </form>
      </div>
    </section>
  );
}
