import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2Icon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'>(
    'idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const { error } = await supabase.
      from('contact_messages').
      insert([formData]);
      if (error) throw error;
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setStatus('error');
      setErrorMessage(
        err.message ||
        'An error occurred while sending your message. Please try again.'
      );
    }
  };
  if (status === 'success') {
    return (
      <div className="bg-metro-surface border border-metro-gold p-8 text-center">
        <CheckCircleIcon className="w-16 h-16 text-metro-gold mx-auto mb-4" />
        <h3 className="font-playfair text-2xl text-white mb-2">
          Message Received
        </h3>
        <p className="text-metro-muted">
          Thank you for reaching out to Metro Law Firm. One of our attorneys
          will review your inquiry and contact you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 px-6 py-2 border border-metro-border text-white hover:border-metro-gold transition-colors text-sm tracking-wider uppercase">

          Send Another Message
        </button>
      </div>);

  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' &&
      <div className="bg-red-950/30 border border-red-900 p-4 flex items-start gap-3">
          <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-200 text-sm">{errorMessage}</p>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs tracking-widest uppercase text-metro-muted mb-2">

            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors"
            placeholder="John Doe" />

        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs tracking-widest uppercase text-metro-muted mb-2">

            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors"
            placeholder="john@example.com" />

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs tracking-widest uppercase text-metro-muted mb-2">

            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors"
            placeholder="(555) 123-4567" />

        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-xs tracking-widest uppercase text-metro-muted mb-2">

            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors appearance-none">

            <option value="" disabled>
              Select a topic
            </option>
            <option value="Consultation Request">Consultation Request</option>
            <option value="Collection Lawsuit">Collection Lawsuit</option>
            <option value="Family Law">Family Law</option>
            <option value="Business Dispute">Business Dispute</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-widest uppercase text-metro-muted mb-2">

          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors resize-none"
          placeholder="Please provide brief details about your legal matter..." />

      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-metro-gold text-metro-black font-medium tracking-wider uppercase py-4 hover:bg-metro-gold-hover transition-colors disabled:opacity-70 flex items-center justify-center gap-2">

        {status === 'submitting' ?
        <>
            <Loader2Icon className="w-5 h-5 animate-spin" />
            Sending...
          </> :

        'Request Consultation'
        }
      </button>
      <p className="text-xs text-metro-muted text-center mt-4">
        Submitting this form does not create an attorney-client relationship.
        Please do not include sensitive or confidential information.
      </p>
    </form>);

}