
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import supabase from '../utils/supabase';
import { User, Mail, Lock, LogIn, Sparkles, ArrowRight, Github, Chrome } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<'firebase' | 'supabase'>('supabase');

  const auth = getAuth();

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase login successful!');
    } catch (error: any) {
      setError(`Firebase: ${error.message}`);
    }
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log('Supabase login successful!');
    } catch (error: any) {
      setError(`Supabase: ${error.message}`);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) setError(error.message);
  };

  const LotusIcon = () => (
    <svg viewBox="0 0 100 100" className="w-24 h-24 fill-saffron-500 animate-pulse opacity-40">
      <path d="M50 20 C60 0 80 0 80 30 C80 50 50 80 50 80 C50 80 20 50 20 30 C20 0 40 0 50 20" />
      <path d="M50 40 C70 30 90 40 90 60 C90 80 50 90 50 90 C50 90 10 80 10 60 C10 40 30 30 50 40" />
      <path d="M50 30 C30 20 10 30 10 50 C10 70 50 80 50 80 C50 80 90 70 90 50 C90 30 70 20 50 30" />
    </svg>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
        <LotusIcon />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-saffron-100 w-full max-w-md relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-saffron-500 via-gold-500 to-saffron-500"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-saffron-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
            <User className="text-saffron-600 w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800 font-header">
            {language === 'en' ? 'Devotee Login' : 'భక్తుల లాగిన్'}
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {language === 'en' ? 'Access your Seva bookings and history' : 'మీ సేవలు మరియు వివరాల కోసం లాగిన్ అవ్వండి'}
          </p>
        </div>

        <div className="flex p-1 bg-stone-100 rounded-2xl mb-8">
          <button
            onClick={() => setActiveProvider('supabase')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeProvider === 'supabase' ? 'bg-white text-saffron-600 shadow-md' : 'text-stone-500'}`}
          >
            Supabase
          </button>
          <button
            onClick={() => setActiveProvider('firebase')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeProvider === 'firebase' ? 'bg-white text-saffron-600 shadow-md' : 'text-stone-500'}`}
          >
            Firebase
          </button>
        </div>

        <form onSubmit={activeProvider === 'supabase' ? handleSupabaseLogin : handleFirebaseLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1 ml-1">{t('feedback.email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none transition-all"
                placeholder="devotee@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm italic bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <div className="flex items-center justify-between text-xs font-bold text-saffron-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-stone-300 text-saffron-600 focus:ring-saffron-500" />
              Remember Me
            </label>
            <button type="button" className="hover:underline">Forgot Password?</button>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all flex items-center justify-center gap-2 group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              {language === 'en' ? `Sign In (${activeProvider})` : `లాగిన్ (${activeProvider})`}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-stone-400 font-bold">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={signInWithGoogle} className="flex items-center justify-center gap-2 p-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-all font-bold text-sm">
            <Chrome className="w-5 h-5 text-red-500" /> Google
          </button>
          <button onClick={signInWithGithub} className="flex items-center justify-center gap-2 p-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-all font-bold text-sm">
            <Github className="w-5 h-5 text-stone-800" /> GitHub
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">
            {language === 'en' ? "New devotee?" : "కొత్త భక్తులా?"}
            <button className="ml-2 text-saffron-600 font-bold hover:underline flex items-center gap-1 mx-auto mt-2">
              {language === 'en' ? 'Create an Account' : 'ఖాతాను సృష్టించండి'} <ArrowRight className="w-4 h-4" />
            </button>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-gold-500">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Divine Experience Awaits</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
