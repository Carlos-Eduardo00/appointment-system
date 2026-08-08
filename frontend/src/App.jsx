import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BookingProvider } from './contexts/BookingContext.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <div className="app-shell">
            <header className="app-header">
              <div className="container header-content">
                <Link to="/" className="brand">
                  Agendamentos
                </Link>
                <nav className="header-nav">
                  <Link to="/agendamento" className="header-nav-btn">
                    Agendar
                  </Link>
                  <Link to="/admin" className="header-nav-btn">
                    Admin
                  </Link>
                </nav>
              </div>
            </header>

            <main className="app-main container">
              <AppRoutes />
            </main>

            <footer className="app-footer">
              <div className="container">
                <p>Sistema de Agendamentos</p>
              </div>
            </footer>
          </div>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
