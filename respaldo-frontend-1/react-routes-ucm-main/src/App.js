import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Menu } from './components/Menu';
import { AuthProvider } from './auth/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { InfoPage } from './pages/InfoPage';
import { RegisterPage } from './pages/RegisterPage';
import { ManageCoffeesPage } from './pages/ManageCoffeesPage';
import { CoffeeListPage } from './pages/CoffeeListPage';
import { AcercaPage } from './pages/AcercaPage';
import {UserListPage} from './pages/UserListPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/coffees" element={<CoffeeListPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/acerca" element={<AcercaPage />} />
          <Route path="/manage-coffee" element={<PrivateRoute><ManageCoffeesPage /></PrivateRoute>} />
          <Route path="/listuser" element={<PrivateRoute><UserListPage/></PrivateRoute>} />
          <Route path="*" element={<p>Ups, no existe la ruta</p>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
