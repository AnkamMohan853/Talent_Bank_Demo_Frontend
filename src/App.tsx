import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import Vendor from './components/Vendor'
import Vendor_user from './components/Vendor_user';
import ArtDirector_users_all from './components/ArtDirector_users_all';
import ArtDirector_To_Vendor from './components/ArtDirector_To_Vendo';
import ArtDirector from './components/ArtDirector'
import { AuthProvider, useAuth } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <Routes>
             
  
  
            <Route path="/login" element={<Login />} />
            <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/Vendor" element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
            <Route path="/ArtDirector" element={<ProtectedRoute><ArtDirector/></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Vendor_user" element={<ProtectedRoute><Vendor_user /></ProtectedRoute>} />
            <Route path="/ArtDirector_users_all" element={<ProtectedRoute><ArtDirector_users_all /></ProtectedRoute>} />
            <Route path="/ArtDirector_To_Vendor" element={<ProtectedRoute><ArtDirector_To_Vendor /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default App;