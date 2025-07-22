"use client";

import React from "react";

const ContactWindow: React.FC = () => {
  return (
    <div className="contact-content">
      <div className="section">
        <div className="contact-card">
          <div className="contact-header">
            <h3>Yan Cancella Barros Pereira</h3>
            <p className="contact-title">Desenvolvedor Full Stack - Pleno</p>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-text">
                <strong>Email:</strong>
                <p>yan.cancella@outlook.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-text">
                <strong>LinkedIn:</strong>
                <p>
                  <a
                    href="https://www.linkedin.com/in/yancanc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue"
                  >
                    www.linkedin.com/in/yancanc/
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-text">
                <strong>Localização:</strong>
                <p>Curitiba, Paraná - Brasil</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-text">
                <strong>GitHub:</strong>
                <p>
                  <a
                    href="https://github.com/Yancanc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue"
                  >
                    github.com/Yancanc
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
