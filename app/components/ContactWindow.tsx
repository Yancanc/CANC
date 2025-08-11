"use client";

import React from "react";
import { useLocale } from "../context/Locale";

const ContactWindow: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="contact-content">
      <div className="section">
        <div className="contact-card">
          <div className="contact-header">
            <h3>Yan Cancella Barros Pereira</h3>
            <p className="contact-title">{t("contact.role")}</p>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-text">
                <strong>{t("label.email")}</strong>
                <p>yan.cancella@outlook.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-text">
                <strong>{t("label.linkedin")}</strong>
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
                <strong>{t("label.location")}</strong>
                <p>{t("contact.locationValue")}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-text">
                <strong>{t("label.github")}</strong>
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
