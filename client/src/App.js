import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Cultures from './pages/Cultures';
import CultureDetail from './pages/CultureDetail';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/CartDrawer';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile'; // Added import for Profile
// import PrivateRoute from './components/PrivateRoute'; // Not used in the provided snippet, keeping commented as per instruction
// import { useCart } from './context/CartContext'; // Not used in the final structure, keeping commented as per instruction

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-primary text-white font-sans">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Marketplace />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/culture" element={<Cultures />} />
              <Route path="/culture/:slug" element={<CultureDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} /> {/* Added Route for Profile */}
            </Routes>
            <Chatbot />
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;