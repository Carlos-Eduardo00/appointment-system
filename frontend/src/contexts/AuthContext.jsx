import { createContext, useContext, useMemo, useState } from 'react';

const TOKEN_KEY = 'admin_token';
const USERNAME_KEY = 'admin_username';

const AuthContext = createContext(null);

function readStoredAuth() {
  return {
    token: localStorage.getItem(TOKEN_KEY) || '',
    username: localStorage.getItem(USERNAME_KEY) || '',
  };
}

export function AuthProvider({ children }) {
  const storedAuth = readStoredAuth();
  const [token, setToken] = useState(storedAuth.token);
  const [username, setUsername] = useState(storedAuth.username);

  const value = useMemo(() => {
    function login(authData) {
      setToken(authData.token);
      setUsername(authData.username);
      localStorage.setItem(TOKEN_KEY, authData.token);
      localStorage.setItem(USERNAME_KEY, authData.username);
    }

    function logout() {
      setToken('');
      setUsername('');
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USERNAME_KEY);
    }

    return {
      token,
      username,
      isAuthenticated: Boolean(token),
      login,
      logout,
    };
  }, [token, username]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
