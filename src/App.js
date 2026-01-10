import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import Blog from './components/pages/Blog';
import NotFound from './components/pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';
import WhatsAppWidget from './components/common/WhatsAppWidget';
import TawkToWidget from './components/common/TawkToWidget';
import CookieConsent from './components/common/CookieConsent';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import BlogPost from './components/pages/BlogPost';
import Projects from './components/pages/Projects';
import Resources from './components/pages/Resources';
import Training from './components/pages/Training';
import QuoteCalculator from './components/pages/QuoteCalculator'; // Import

/* Admin Components */
import AdminDashboard from './components/admin/AdminDashboard';
import PostForm from './components/admin/PostForm';
import ServiceForm from './components/admin/ServiceForm';
import TestimonialForm from './components/admin/TestimonialForm';
import TeamForm from './components/admin/TeamForm';
import ProjectForm from './components/admin/ProjectForm';
import ResourcesManager from './components/admin/ResourcesManager';
import ResourceForm from './components/admin/ResourceForm';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';

import './styles/global.css';

import { ToastProvider } from './context/ToastContext';
import { SettingsProvider } from './context/SettingsContext';
import { HelmetProvider } from 'react-helmet-async';

import PublicLayout from './components/common/PublicLayout';

function App() {
  return (
    <ToastProvider>
      <SettingsProvider>
        <HelmetProvider>
          <Router>
            <ScrollToTop /> {/* Adds scroll recovery on route change & the button */}
            <WhatsAppWidget /> {/* Floating WhatsApp Button */}
            <TawkToWidget /> {/* Tawk.to Live Chat Widget */}
            <CookieConsent /> {/* Cookie Consent Banner */}

            <Routes>
              {/* Public Routes - Wrapped in PublicLayout (Header/Footer) */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/training" element={<Training />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/quote" element={<QuoteCalculator />} />
              </Route>

              {/* Catch-all Route for 404 - Wrapped in PublicLayout */}
              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />

              {/* Admin Routes - Standalone (No Header/Footer) */}
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

              <Route path="/admin/projects/create" element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects/edit/:id" element={
                <ProtectedRoute>
                  <ProjectForm />
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

              <Route path="/admin/resources" element={
                <ProtectedRoute>
                  <ResourcesManager />
                </ProtectedRoute>
              } />
              <Route path="/admin/resources/create" element={
                <ProtectedRoute>
                  <ResourceForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/resources/edit/:id" element={
                <ProtectedRoute>
                  <ResourceForm />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </HelmetProvider>
      </SettingsProvider>
    </ToastProvider>
  );
}

export default App;
