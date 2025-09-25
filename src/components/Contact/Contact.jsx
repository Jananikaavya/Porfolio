import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_wbl6c2t",   // replace with EmailJS service ID
        "template_gglyo9k",  // replace with EmailJS template ID
        form.current,
        "09-zPDUC0V_j4Xr6a"  // replace with EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Your message has been sent successfully!");
          setLoading(false);
          form.current.reset();
          setTimeout(() => setStatus(""), 4000);
        },
        (error) => {
          setStatus("❌ Failed to send. Please try again!");
          setLoading(false);
          console.error(error.text);
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-header">
        <h2>Let’s Build Something Great 🚀</h2>
        <p>
          Whether it’s a project idea, collaboration, or just a friendly hello, 
          I’d love to hear from you!
        </p>
      </div>

      <div className="contact-wrapper">
        {/* Left Side - Info */}
        <div className="contact-info">
          <h3>📬 Contact Information</h3>
          <p><strong>Email:</strong> yourname@example.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Chennai, India</p>

          <div className="social-links">
            <a href="https://github.com/jananikaavya" target="_blank" rel="noreferrer">🌐 GitHub</a>
            <a href="https://www.linkedin.com/in/janucodegirl/" target="_blank" rel="noreferrer">💼 LinkedIn</a>
            <a href="https://x.com/JananiKaavya" target="_blank" rel="noreferrer">🐦 Twitter</a>
          </div>
        </div>

        {/* Right Side - Form */}
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="input-group">
            <label>Your Full Name</label>
            <input type="text" name="user_name" placeholder="Enter your name" required />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="user_email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Your Message</label>
            <textarea name="message" rows="5" placeholder="Type your message here..." required></textarea>
          </div>
          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Sending..." : "✨ Send Message"}
          </button>
        </form>
      </div>

      {status && <p className="status-msg">{status}</p>}
    </section>
  );
};

export default Contact;
