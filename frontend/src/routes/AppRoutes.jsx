import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import AdminLogin from '../pages/AdminLogin.jsx';
import BookingForm from '../pages/BookingForm.jsx';
import Confirmation from '../pages/Confirmation.jsx';
import Home from '../pages/Home.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agendamento" element={<BookingForm />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
