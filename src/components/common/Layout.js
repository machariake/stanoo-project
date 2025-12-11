import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

import ChristmasPlugin from './ChristmasPlugin';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <ChristmasPlugin />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;