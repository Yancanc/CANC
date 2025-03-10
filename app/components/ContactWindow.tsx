"use client";

import React from "react";

const ContactWindow: React.FC = () => {
  return (
    <div className="contact-content">
      <div className="section">
        <div className="section-title">Informações de Contato</div>
        <div className="contact-card">
          <div className="contact-header">
            <h3>Yan Cancella Barros Pereira</h3>
            <p className="contact-title">Desenvolvedor Full Stack - Pleno</p>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-text">
                <strong>Email:</strong>
                <p>yan.cancella@outlook.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🔗</div>
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
              <div className="contact-icon">📍</div>
              <div className="contact-text">
                <strong>Localização:</strong>
                <p>Vitória, Espírito Santo - Brasil</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">💻</div>
              <div className="contact-text">
                <strong>GitHub:</strong>
                <p>
                  <a
                    href="https://github.com/yancancella"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue"
                  >
                    github.com/yancancella
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Disponibilidade</div>
        <div className="contact-form">
          <p className="contact-note">
            Atualmente estou disponível para novos projetos e oportunidades de
            trabalho. Sinta-se à vontade para entrar em contato comigo através
            dos canais acima para discutir possibilidades de colaboração.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
