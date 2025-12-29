
import React, { useState, useEffect } from 'react';
import { 
  Lock, LayoutDashboard, Newspaper, Flower, Image as ImageIcon, 
  LogOut, Plus, Trash2, Save, Users, Edit3, X, Check, 
  MessageSquare, AlertCircle, Bell, IndianRupee, Search, Filter,
  Send, Radio, Sparkles, Loader2
} from 'lucide-react';
import { NEWS_ITEMS, SEVAS, GALLERY_IMAGES, SCROLL_NEWS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { FeedbackItem, SevaItem, NewsItem, GalleryItem, PushNotification } from '../types';
import { db } from '../firebase';
// Standardize Firestore modular imports to resolve "no exported member" errors
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'sevas' | 'gallery' | 'donations' | 'feedback' | 'site' | 'push'>('news');
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const { sendNotification } = useNotifications();

  // Content States
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sevas, setSevas] = useState<SevaItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [siteUpdates, setSiteUpdates] = useState<string[]>([]);
  
  // Notification Form State
  const [notifForm, setNotifForm] = useState({
    title: '',
    message: '',
    category: 'General' as PushNotification['category']
  });

  // Edit States
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingSeva, setEditingSeva] = useState<SevaItem | null>(null);

  const loadAllData = async () => {
    const storedNews = localStorage.getItem('temple_news');
    const storedSevas = localStorage.getItem('temple_sevas');
    const storedGallery = localStorage.getItem('temple_gallery');
    const storedUpdates = localStorage.getItem('temple_site_updates');

    setNews(storedNews ? JSON.parse(storedNews) : NEWS_ITEMS(language));
    setSevas(storedSevas ? JSON.parse(storedSevas) : SEVAS(language));
    setGallery(storedGallery ? JSON.parse(storedGallery) : GALLERY_IMAGES);
    setSiteUpdates(storedUpdates ? JSON.parse(storedUpdates) : SCROLL_NEWS(language));

    // Load Feedback from Firestore
    fetchFeedback();
  };

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "feedback"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const fbData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FeedbackItem[];
      setFeedback(fbData);
    } catch (err) {
      console.error("Failed to fetch feedback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    const session = localStorage.getItem('admin_session');
    if (session === 'true') setIsLoggedIn(true);

    const handleUpdate = () => loadAllData();
    window.addEventListener('storage_update', handleUpdate);
    return () => window.removeEventListener('storage_update', handleUpdate);
  }, [language]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'temple123') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_session', 'true');
    } else {
      alert('Invalid Credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_session');
  };

  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('storage_update'));
  };

  const deleteItem = async (type: string, id: string | number) => {
    if (!confirm('Permanently delete this item?')) return;
    
    if (type === 'news') {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      saveData('temple_news', updated);
    } else if (type === 'sevas') {
      const updated = sevas.filter(s => s.id !== id);
      setSevas(updated);
      saveData('temple_sevas', updated);
    } else if (type === 'gallery') {
      const updated = gallery.filter(g => g.id !== id);
      setGallery(updated);
      saveData('temple_gallery', updated);
    } else if (type === 'feedback') {
      try {
        await deleteDoc(doc(db, "feedback", id.toString()));
        setFeedback(feedback.filter(f => f.id !== id));
      } catch (err) {
        console.error("Error deleting feedback", err);
      }
    }
  };

  const handlePushSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendNotification(notifForm.title, notifForm.message, notifForm.category);
    alert('Broadcast Sent Successfully!');
    setNotifForm({ title: '', message: '', category: 'General' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-saffron-100 w-full max-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron-500 to-gold-500"></div>
          <div className="text-center mb-8">
            <div className="bg-saffron-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 transform rotate-12">
              <Lock className="text-saffron-600 w-10 h-10 -rotate-12" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 font-header">Admin Access</h1>
            <p className="text-stone-500 text-sm">Uttharandhra Tirupati Management Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none transition-all font-medium" 
                placeholder="Admin username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none transition-all font-medium" 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-saffron-600 to-saffron-800 text-white font-bold py-4 rounded-2xl hover:shadow-xl transition-all active:scale-95">
              Secure Login
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Default: admin / temple123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-stone-800 font-header flex items-center gap-3">
            <LayoutDashboard className="text-saffron-600 w-10 h-10" /> 
            Admin Control Center
          </h1>
          <p className="text-stone-500 font-medium ml-13">Digital Management Suite for Pendurthi Devasthanam</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-white text-red-600 border border-red-100 px-6 py-3 rounded-2xl hover:bg-red-50 transition-all font-bold shadow-sm">
          <LogOut className="w-5 h-5" /> Logout Session
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-10 bg-white p-3 rounded-3xl shadow-sm border border-stone-100">
        {[
          { id: 'news', label: 'News & Events', icon: <Newspaper className="w-5 h-5" /> },
          { id: 'sevas', label: 'Arjitha Sevas', icon: <Flower className="w-5 h-5" /> },
          { id: 'gallery', label: 'Photo Gallery', icon: <ImageIcon className="w-5 h-5" /> },
          { id: 'donations', label: 'E-Hundi Log', icon: <IndianRupee className="w-5 h-5" /> },
          { id: 'site', label: 'Site Updates', icon: <Bell className="w-5 h-5" /> },
          { id: 'push', label: 'Broadcast Center', icon: <Radio className="w-5 h-5" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-5 h-5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-200 scale-105' 
                : 'text-stone-500 hover:bg-stone-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden min-h-[500px]">
        {/* NEWS & EVENTS MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold text-stone-800">Temple News & Festival Events</h3>
              <button 
                onClick={() => setEditingNews({ id: Date.now(), title: '', date: new Date().toISOString().split('T')[0], description: '', image: 'https://picsum.photos/800/500' })}
                className="bg-saffron-100 text-saffron-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-saffron-600 hover:text-white transition-all"
              >
                <Plus className="w-5 h-5" /> Create New Post
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                {news.map((n) => (
                  <div key={n.id} className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${editingNews?.id === n.id ? 'bg-saffron-50 border-saffron-300 shadow-xl' : 'bg-stone-50 border-stone-100 group hover:shadow-md'}`}>
                    <div className="flex items-center gap-5">
                      <img src={n.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                      <div>
                        <h4 className="font-bold text-stone-800 text-lg">{n.title || 'Untitled Post'}</h4>
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">{n.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingNews(n)} className="p-3 text-stone-400 hover:text-saffron-600 hover:bg-white rounded-xl transition-all">
                        <Edit3 className="w-6 h-6" />
                      </button>
                      <button onClick={() => deleteItem('news', n.id)} className="p-3 text-stone-400 hover:text-red-600 hover:bg-white rounded-xl transition-all">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky top-0">
                {editingNews ? (
                  <div className="bg-stone-50 p-8 rounded-3xl border border-saffron-200 animate-in fade-in slide-in-from-right-8">
                    <div className="flex justify-between items-center mb-8">
                       <h4 className="text-xl font-bold text-saffron-800 flex items-center gap-2">
                         <Edit3 className="w-6 h-6" /> {editingNews.id > Date.now() - 10000 ? 'New Post' : 'Edit Post'}
                       </h4>
                       <button onClick={() => setEditingNews(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                         <X className="w-6 h-6" />
                       </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Article Title</label>
                        <input 
                          type="text"
                          value={editingNews.title}
                          onChange={(e) => setEditingNews({...editingNews, title: e.target.value})}
                          className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none bg-white font-bold text-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Publish Date</label>
                          <input 
                            type="date"
                            value={editingNews.date}
                            onChange={(e) => setEditingNews({...editingNews, date: e.target.value})}
                            className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none bg-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Banner Image URL</label>
                          <input 
                            type="text"
                            value={editingNews.image}
                            onChange={(e) => setEditingNews({...editingNews, image: e.target.value})}
                            className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none bg-white text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Description / Body Content</label>
                        <textarea 
                          rows={6}
                          value={editingNews.description}
                          onChange={(e) => setEditingNews({...editingNews, description: e.target.value})}
                          className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none bg-white resize-none leading-relaxed"
                        ></textarea>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const exists = news.find(n => n.id === editingNews.id);
                          const updated = exists 
                            ? news.map(n => n.id === editingNews.id ? editingNews : n)
                            : [editingNews, ...news];
                          setNews(updated);
                          saveData('temple_news', updated);
                          setEditingNews(null);
                        }}
                        className="w-full bg-gradient-to-r from-saffron-600 to-saffron-800 text-white font-bold py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                      >
                        <Check className="w-6 h-6" /> Save News Item
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-stone-300 flex-col gap-6 border-4 border-dashed border-stone-100 rounded-[2.5rem] p-20">
                     <Newspaper className="w-24 h-24 opacity-10" />
                     <p className="font-bold text-xl uppercase tracking-widest opacity-30">Select a post to manage</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PUSH BROADCAST CENTER */}
        {activeTab === 'push' && (
          <div className="p-10">
            <div className="max-w-3xl mx-auto">
              <div className="bg-saffron-600 p-8 rounded-[2rem] text-white shadow-2xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Radio className="w-40 h-40" />
                </div>
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3 relative z-10">
                  <Radio className="w-8 h-8 animate-pulse" /> Divine Broadcast Center
                </h3>
                <p className="text-saffron-50 font-medium relative z-10 leading-relaxed">
                  Send real-time spiritual alerts to all devotees currently using the app. These will appear as Divine Toasts and browser notifications.
                </p>
              </div>

              <form onSubmit={handlePushSubmit} className="space-y-6 bg-stone-50 p-8 rounded-[2rem] border border-stone-200 shadow-inner">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Alert Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['General', 'Festival', 'Seva', 'Timing'].map((cat) => (
                      <button 
                        key={cat}
                        type="button"
                        onClick={() => setNotifForm({...notifForm, category: cat as any})}
                        className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${
                          notifForm.category === cat 
                            ? 'bg-saffron-600 border-saffron-600 text-white shadow-lg' 
                            : 'bg-white border-stone-200 text-stone-600 hover:border-saffron-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Alert Title</label>
                  <input 
                    required
                    type="text"
                    value={notifForm.title}
                    onChange={(e) => setNotifForm({...notifForm, title: e.target.value})}
                    placeholder="e.g. Brahmotsavam Starting Today!"
                    className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Message Content</label>
                  <textarea 
                    required
                    rows={4}
                    value={notifForm.message}
                    onChange={(e) => setNotifForm({...notifForm, message: e.target.value})}
                    placeholder="Provide details about the divine event..."
                    className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none font-medium resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-saffron-600 to-saffron-800 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-saffron-200 flex items-center justify-center gap-3 text-lg group"
                  >
                    <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                    Broadcast to All Devotees
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ARJITHA SEVAS */}
        {activeTab === 'sevas' && (
          <div className="p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold text-stone-800">Arjitha Seva Offerings</h3>
              <button 
                onClick={() => setEditingSeva({ id: Date.now().toString(), name: '', time: '09:00 AM', description: '', availability: 'Daily' })}
                className="bg-saffron-100 text-saffron-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-saffron-600 hover:text-white transition-all"
              >
                <Plus className="w-5 h-5" /> Add New Seva
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                {sevas.map((s) => (
                  <div key={s.id} className={`p-6 rounded-3xl border transition-all ${editingSeva?.id === s.id ? 'bg-saffron-50 border-saffron-300' : 'bg-stone-50 border-stone-100'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-stone-800 text-xl">{s.name || 'Untitled Seva'}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs font-bold text-saffron-600 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-saffron-100">{s.time}</span>
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-stone-100">{s.availability}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingSeva(s)} className="p-2 text-stone-400 hover:text-saffron-600"><Edit3 className="w-5 h-5" /></button>
                        <button onClick={() => deleteItem('sevas', s.id)} className="p-2 text-stone-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {editingSeva ? (
                  <div className="bg-stone-50 p-8 rounded-3xl border border-saffron-200">
                    <h4 className="text-xl font-bold text-saffron-800 mb-6 flex items-center gap-2">
                       <Flower className="w-6 h-6" /> Seva Configuration
                    </h4>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Seva Name" 
                        value={editingSeva.name} 
                        onChange={e => setEditingSeva({...editingSeva, name: e.target.value})}
                        className="w-full p-4 rounded-xl border border-stone-200 font-bold"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="Time (e.g. 06:00 AM)" 
                          value={editingSeva.time} 
                          onChange={e => setEditingSeva({...editingSeva, time: e.target.value})}
                          className="w-full p-4 rounded-xl border border-stone-200"
                        />
                        <input 
                          type="text" 
                          placeholder="Availability (e.g. Daily)" 
                          value={editingSeva.availability} 
                          onChange={e => setEditingSeva({...editingSeva, availability: e.target.value})}
                          className="w-full p-4 rounded-xl border border-stone-200"
                        />
                      </div>
                      <textarea 
                        rows={4} 
                        placeholder="Seva Description..." 
                        value={editingSeva.description} 
                        onChange={e => setEditingSeva({...editingSeva, description: e.target.value})}
                        className="w-full p-4 rounded-xl border border-stone-200 resize-none"
                      />
                      <button 
                        onClick={() => {
                          const exists = sevas.find(s => s.id === editingSeva.id);
                          const updated = exists ? sevas.map(s => s.id === editingSeva.id ? editingSeva : s) : [...sevas, editingSeva];
                          setSevas(updated);
                          saveData('temple_sevas', updated);
                          setEditingSeva(null);
                        }}
                        className="w-full bg-saffron-600 text-white font-bold py-4 rounded-xl shadow-lg"
                      >
                        Update Seva Info
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center border-4 border-dashed border-stone-100 rounded-[2.5rem] p-20 opacity-20">
                     <Flower className="w-20 h-20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FEEDBACK (FIRESTORE CONNECTED) */}
        {activeTab === 'feedback' && (
          <div className="p-10">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-bold text-stone-800">Devotee Feedback & Reports</h3>
               <button onClick={fetchFeedback} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <Sparkles className={`w-5 h-5 text-saffron-500 ${loading ? 'animate-spin' : ''}`} />
               </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 text-saffron-600 animate-spin" />
              </div>
            ) : feedback.length === 0 ? (
              <div className="text-center py-20 bg-stone-50 rounded-[2.5rem] border border-dashed border-stone-200">
                <AlertCircle className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                <p className="text-stone-400 font-bold uppercase tracking-widest">No messages found in inbox</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {feedback.map((f) => (
                  <div key={f.id} className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 relative group transition-all hover:shadow-xl hover:bg-white">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${f.type === 'Issue' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {f.type}
                          </span>
                          <span className="text-xs text-stone-400 font-bold">{f.date}</span>
                        </div>
                        <h4 className="text-xl font-bold text-stone-800">{f.name}</h4>
                        <p className="text-saffron-600 font-bold text-sm">{f.email}</p>
                      </div>
                      <button 
                        onClick={() => deleteItem('feedback', f.id)}
                        className="p-4 text-stone-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all bg-white rounded-2xl shadow-sm"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-stone-600 text-lg italic leading-relaxed bg-white p-6 rounded-2xl shadow-inner border border-stone-50">
                      "{f.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
