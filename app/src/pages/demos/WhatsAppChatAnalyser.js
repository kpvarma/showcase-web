import React from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../components-old/Header';
import Sidebar from '../components-old/Sidebar';
import Footer from '../components-old/Footer';

function WhatsAppChatAnalysier() {
  return (
    <div className="app-container">
        <Header />
        <Sidebar />
        <main className="main-content">
            WhatsApp Chat Analysier Content
        </main>
        <Footer />
    </div>
  );
}

export default WhatsAppChatAnalysier;
