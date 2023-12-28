
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import NoPage from './pages/NoPage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/Login/:userType" element={<LoginPage />} />
        <Route path="/Login" element={<HomePage />} />
        <Route path="/admin-dashboard/:adminId" element={<AdminDashboardPage />} />
        <Route path="/doctor-dashboard/:doctorId" element={<DoctorDashboardPage />} />
        <Route path="/patient-dashboard/:patientId" element={<PatientDashboardPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
