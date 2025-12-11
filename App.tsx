import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/Cart';
import { StoreProvider } from './context/StoreContext';
import DiscountBar from './components/DiscountBar';
import SpinWheel from './components/SpinWheel';
import { ToastContainer } from 'react-toastify'; // Mocking toast behavior if strictly needed, but will use alert for simplicity

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <DiscountBar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<div className="container mx-auto p-10 text-center">About Page Content Placeholder</div>} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
        <SpinWheel />
      </Router>
    </StoreProvider>
  );
};

export default App;