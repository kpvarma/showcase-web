import React from 'react';
import '../stylesheets/footer.css';

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-container">
      <div className="footer-logo">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="footer-links">
        <a href="#about">About Me</a>
        <a href="#support">Support</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </div>
      <div className="footer-social">
        <a href="#facebook" className="social-link">Facebook</a>
        <a href="#twitter" className="social-link">Twitter</a>
        <a href="#instagram" className="social-link">Instagram</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Your App Name. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;