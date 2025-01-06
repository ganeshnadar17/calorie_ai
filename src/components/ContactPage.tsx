import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message. We will get back to you soon!'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-5">Contact Us</h1>
          
          {/* Contact Information */}
          <div className="row mb-5">
            <div className="col-md-4">
              <div className="d-flex align-items-center mb-4">
                <Mail className="text-primary me-3" size={24} />
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">support@calorieai.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center mb-4">
                <Phone className="text-primary me-3" size={24} />
                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="mb-0">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center mb-4">
                <MapPin className="text-primary me-3" size={24} />
                <div>
                  <h5 className="mb-1">Location</h5>
                  <p className="mb-0">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {submitStatus.type && (
                <div
                  className={`alert alert-${
                    submitStatus.type === 'success' ? 'success' : 'danger'
                  } mb-4`}
                  role="alert"
                >
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 