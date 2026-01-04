
import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FeedbackItem } from '../types/types';
import { db, logEvent } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { supabaseService } from '../services/supabaseService';

const Feedback: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Suggestion' as 'Suggestion' | 'Issue',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Dual write to Firebase and Supabase
      const fbPromise = addDoc(collection(db, "feedback"), {
        ...formData,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0]
      });

      const sbPromise = supabaseService.addFeedback({
        ...formData,
        rating: 5, // Default rating as not in form yet
        created_at: new Date().toISOString()
      });

      await Promise.all([fbPromise, sbPromise]);

      logEvent('feedback_submitted', {
        type: formData.type
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', type: 'Suggestion', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-base-100 rounded-3xl shadow-2xl border border-neutral/20 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-primary p-10 text-white flex flex-col justify-center">
            <MessageSquare className="w-16 h-16 mb-6 opacity-80" />
            <h1 className="text-3xl font-bold font-header mb-4">{t('feedback.title')}</h1>
            <p className="text-neutral-content leading-relaxed">
              {t('feedback.subtitle')}
            </p>
          </div>

          <div className="md:w-2/3 p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-success/20 p-4 rounded-full mb-6">
                  <CheckCircle2 className="w-16 h-16 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-secondary mb-2">{t('feedback.success')}</h2>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Submit another feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">{t('feedback.name')}</label>
                    <input
                      required
                      disabled={loading}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-neutral/30 bg-white focus:ring-2 focus:ring-accent outline-none transition-all disabled:opacity-50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">{t('feedback.email')}</label>
                    <input
                      required
                      disabled={loading}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-neutral/30 bg-white focus:ring-2 focus:ring-accent outline-none transition-all disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">{t('feedback.type')}</label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        disabled={loading}
                        type="radio"
                        name="type"
                        className="sr-only peer"
                        checked={formData.type === 'Suggestion'}
                        onChange={() => setFormData({ ...formData, type: 'Suggestion' })}
                      />
                      <div className="p-3 text-center rounded-xl border border-neutral/30 peer-checked:bg-accent/20 peer-checked:border-accent peer-checked:text-accent font-bold transition-all">
                        {t('feedback.type_suggestion')}
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        disabled={loading}
                        type="radio"
                        name="type"
                        className="sr-only peer"
                        checked={formData.type === 'Issue'}
                        onChange={() => setFormData({ ...formData, type: 'Issue' })}
                      />
                      <div className="p-3 text-center rounded-xl border border-neutral/30 peer-checked:bg-error/20 peer-checked:border-error peer-checked:text-error font-bold transition-all">
                        {t('feedback.type_issue')}
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">{t('feedback.message')}</label>
                  <textarea
                    required
                    disabled={loading}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-neutral/30 bg-white focus:ring-2 focus:ring-accent outline-none transition-all resize-none disabled:opacity-50"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-lg flex items-center justify-center gap-2 group disabled:bg-neutral/50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      {t('feedback.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
