/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertCircle, Edit2, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});

  const contactOptions = [
    {
      id: 'email',
      icon: <Mail className="text-red-500" size={20} />,
      label: 'Email Inquiries',
      value: 'injammokshagna@gmail.com',
      href: 'mailto:injammokshagna@gmail.com'
    },
    {
      id: 'phone',
      icon: <Phone className="text-violet-500" size={20} />,
      label: 'Phone Connection',
      value: '+91 9392728189',
      href: 'tel:+919392728189'
    },
    {
      id: 'github',
      icon: <Github className="text-slate-700 dark:text-slate-300" size={20} />,
      label: 'GitHub Profile',
      value: 'github.com/Moksha-25',
      href: 'https://github.com/Moksha-25'
    },
    {
      id: 'linkedin',
      icon: <Linkedin className="text-violet-600" size={20} />,
      label: 'LinkedIn Address',
      value: 'Injam Mokshagna',
      href: 'https://www.linkedin.com/in/injam-mokshagna'
    }
  ];

  // Live validation helpers
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isMessageValid = message.trim().length >= 10;

  const showNameError = touched.name && !isNameValid;
  const showEmailError = touched.email && !isEmailValid;
  const showMessageError = touched.message && !isMessageValid;

  const logToTerminal = (text: string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('add-terminal-log', {
        detail: `[${new Date().toLocaleTimeString()}] ${text}`
      });
      window.dispatchEvent(event);
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    // Validate all inputs before submitting
    if (!name || !email || !message) {
      setSubmissionStatus('error');
      setErrorMessage('Please fill out all fields before attempting to submit.');
      logToTerminal('⚠️ FORM REJECTED: Missing required fields.');
      return;
    }

    if (!isEmailValid) {
      setSubmissionStatus('error');
      setErrorMessage('Please provide a valid email address.');
      logToTerminal('⚠️ FORM REJECTED: Invalid email format.');
      return;
    }

    if (!isMessageValid) {
      setSubmissionStatus('error');
      setErrorMessage('Your message must be at least 10 characters long.');
      logToTerminal('⚠️ FORM REJECTED: Message is too short.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setErrorMessage('');

    logToTerminal(`📬 EMAILJS: Commencing mail dispatch for "${name}"...`);

    try {
      const result = await emailjs.send(
        'service_xunrlu7',
        'template_2qub91s',
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          message: message,
          name: name,
          email: email,
        },
        'dUD9NK7MCqG5UwvJy'
      );

      if (result.status === 200 || result.text === 'OK') {
        setIsSubmitting(false);
        setSubmissionStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTouched({});
        logToTerminal('📬 SUCCESS: Mail delivered to EmailJS relay (200 OK)!');
      } else {
        console.error('EmailJS response details:', result);
        setIsSubmitting(false);
        setSubmissionStatus('error');
        setErrorMessage(`EmailJS returned status: ${result.status} (${result.text}). Please verify public_key, service_id and template_id settings.`);
        logToTerminal(`❌ MAIL FAILURE: Server responded with status ${result.status} (${result.text})`);
      }
    } catch (error: any) {
      console.error('EmailJS send error:', error);
      setIsSubmitting(false);
      setSubmissionStatus('error');
      setErrorMessage(`EmailJS Send Error: ${error?.text || error?.message || 'Please check public_key, service_id, template_id settings and try again.'}`);
      logToTerminal(`❌ CONNECTION/API ERROR: ${error?.text || error?.message || 'Network unreachable'}`);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 mb-2">
            Get in touch
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Contact Me
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-red-500 rounded mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Quick Connection Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                Contact Information
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Have an exciting project idea, looking for a data scientist intern, or just want to discuss Python engineering? Feel free to reach out anytime. I am usually responsive in business hours!
              </p>
            </div>

            <div className="space-y-4">
              {contactOptions.map((opt) => (
                <a
                  id={`contact-card-${opt.id}`}
                  key={opt.id}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-xs hover:border-violet-400 dark:hover:border-violet-900 transition-all duration-300 group transform hover:translate-x-1"
                >
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-violet-50 dark:group-hover:bg-violet-950/45 transition-colors">
                    {opt.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      {opt.label}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 text-sm sm:text-base break-all">
                      {opt.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Messaging Form block */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                Send me a physical message
              </h4>
            </div>

            {submissionStatus === 'success' && (
              <div id="contact-success-notification" className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-start space-x-3 text-sm">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                <div>
                  <span className="font-bold">Message Delivered!</span>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Your message was successfully dispatched via EmailJS! I will connect with you via email shortly.
                  </p>
                </div>
              </div>
            )}

            {submissionStatus === 'error' && (
              <div id="contact-error-notification" className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900/60 text-rose-850 dark:text-rose-300 flex items-start space-x-3 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
                <div>
                  <span className="font-bold">Execution Error!</span>
                  <p className="mt-0.5 text-xs">
                    {errorMessage || 'Please fill out all the input fields correctly before submitting.'}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  {touched.name && (
                    isNameValid ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                        <Check size={11} /> Valid
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-rose-600">Min 2 letters required</span>
                    )
                  )}
                </div>
                <input
                  id="contact-name-input"
                  type="text"
                  placeholder="Injam Mokshagna"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (touched.name && e.target.value.trim().length >= 2) {
                      setErrorMessage('');
                    }
                  }}
                  onBlur={() => handleBlur('name')}
                  className={`w-full text-sm font-medium border rounded-xl px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-black dark:text-white outline-none transition-all ${
                    showNameError 
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20' 
                      : touched.name && isNameValid
                      ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-violet-500'
                  }`}
                />
              </div>

              {/* Email input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email Address
                  </label>
                  {touched.email && (
                    isEmailValid ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                        <Check size={11} /> Valid
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-rose-600">Enter a valid email</span>
                    )
                  )}
                </div>
                <input
                  id="contact-email-input"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim())) {
                      setErrorMessage('');
                    }
                  }}
                  onBlur={() => handleBlur('email')}
                  className={`w-full text-sm font-medium border rounded-xl px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-black dark:text-white outline-none transition-all ${
                    showEmailError 
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20' 
                      : touched.email && isEmailValid
                      ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-violet-500'
                  }`}
                />
              </div>

              {/* Message input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Your Message
                  </label>
                  {touched.message && (
                    isMessageValid ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                        <Check size={11} /> Perfect Length
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-rose-600">Min 10 letters required ({message.trim().length}/10)</span>
                    )
                  )}
                </div>
                <textarea
                  id="contact-message-input"
                  rows={4}
                  placeholder="Describe details regarding project scope, internship listings, etc..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (touched.message && e.target.value.trim().length >= 10) {
                      setErrorMessage('');
                    }
                  }}
                  onBlur={() => handleBlur('message')}
                  className={`w-full text-sm font-medium border rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-800 text-black dark:text-white outline-none transition-all resize-none ${
                    showMessageError 
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20' 
                      : touched.message && isMessageValid
                      ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-violet-500'
                  }`}
                />
              </div>

              {/* Submit button */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-red-500 hover:from-violet-600 hover:to-red-600 text-white font-bold flex items-center justify-center space-x-2 shadow hover:shadow-lg hover:shadow-violet-500/10 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Routing Mail...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
