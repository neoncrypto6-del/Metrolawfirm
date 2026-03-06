import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { LawyerDetailPage } from './pages/LawyerDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ServicePage } from './pages/ServicePage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
// Wrapper to handle layout and animations based on route
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen flex flex-col bg-metro-black text-metro-body font-inter selection:bg-metro-gold selection:text-metro-black">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:id" element={<LawyerDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdminRoute && <Footer />}
    </div>);

}
export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>);

}