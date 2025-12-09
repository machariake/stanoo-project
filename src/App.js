import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import Blog from './components/pages/Blog';
import NotFound from './components/pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';
import WhatsAppWidget from './components/common/WhatsAppWidget';
import CookieConsent from './components/common/CookieConsent';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import BlogPost from './components/pages/BlogPost';

/* Admin Components */
import AdminDashboard from './components/admin/AdminDashboard';
import PostForm from './components/admin/PostForm';
import ServiceForm from './components/admin/ServiceForm';
import TestimonialForm from './components/admin/TestimonialForm';
import TeamForm from './components/admin/TeamForm';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';

import './styles/global.css';

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop /> {/* Adds scroll recovery on route change & the button */}
        <WhatsAppWidget /> {/* Floating WhatsApp Button */}
        <CookieConsent /> {/* Cookie Consent Banner */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/admin/create" element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/edit/:id" element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            } />

            <Route path="/admin/services/create" element={
              <ProtectedRoute>
                <ServiceForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/services/edit/:id" element={
              <ProtectedRoute>
                <ServiceForm />
              </ProtectedRoute>
            } />

            <Route path="/admin/testimonials/create" element={
              <ProtectedRoute>
                <TestimonialForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/testimonials/edit/:id" element={
              <ProtectedRoute>
                <TestimonialForm />
              </ProtectedRoute>
            } />

            <Route path="/admin/team/create" element={
              <ProtectedRoute>
                <TeamForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/team/edit/:id" element={
              <ProtectedRoute>
                <TeamForm />
              </ProtectedRoute>
            } />

            {/* Catch-all Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}

export default App;
