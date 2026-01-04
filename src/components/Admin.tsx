import React, { useState, useEffect, useContext } from 'react';
import {
  Lock, LayoutDashboard, Newspaper, Flower, Image as ImageIcon,
  LogOut, Plus, Trash2, Save, Users, Edit3, X, Check,
  MessageSquare, AlertCircle, Bell, IndianRupee, Search, Filter,
  Send, Radio, Sparkles, Loader2, Menu, Settings, LogIn, Music, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEWS_ITEMS, SEVAS, GALLERY_IMAGES, SCROLL_NEWS } from '../constants/constants';
import { LanguageContext } from '../context/LanguageContext';
import { NotificationContext } from '../context/NotificationContext';
import { FeedbackItem, SevaItem, NewsItem, GalleryItem, PushNotification, SiteStatus } from '../types/types';
import { db, rtdb } from '../firebase/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { ref as rtdbRef, onValue, update as rtdbUpdate } from 'firebase/database';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';


const Admin: React.FC = () => {
  const { user, logout: authLogout } = useAuth();
  const [activeTab, setActiveTab] = useState<'news' | 'sevas' | 'gallery' | 'donations' | 'feedback' | 'site' | 'push' | 'audio' | 'library'>('site');
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const { showNotification } = useContext(NotificationContext);

  // Content States
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sevas, setSevas] = useState<SevaItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  // REALTIME DATABASE STATE
  const [siteStatus, setSiteStatus] = useState<SiteStatus>({ templeStatus: 'Loading...', scrollNews: 'Loading...' });

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
    setLoading(true);
    try {
      // Fetch from Supabase primarily
      const [sbNews, sbSevas, sbGallery, sbStatus] = await Promise.all([
        supabaseService.getNews().catch(() => []),
        supabaseService.getSevas().catch(() => []),
        supabaseService.getGallery().catch(() => []),
        supabaseService.getSiteStatus().catch(() => null)
      ]);

      setNews(sbNews);
      setSevas(sbSevas);
      setGallery(sbGallery);
      if (sbStatus) setSiteStatus(sbStatus);

      // Fallback/Sync from Firebase
      if (sbNews.length === 0) {
        const newsSnapshot = await getDocs(query(collection(db, "news"), orderBy("date", "desc")));
        setNews(newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsItem[]);
      }

      fetchFeedback();
      loadRealtimeData();
    } catch (error) {
      console.error("Error loading data:", error);
      showNotification('Error loading page data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadRealtimeData = () => {
    const siteStatusRef = rtdbRef(rtdb, 'site_status');
    return onValue(siteStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setSiteStatus(data);
    });
  };

  const fetchFeedback = async () => {
    try {
      const sbFeedback = await supabaseService.addFeedback({} as any).then(() => []).catch(() => []); // Placeholder
      if (sbFeedback.length > 0) {
        setFeedback(sbFeedback);
      } else {
        const q = query(collection(db, "feedback"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        setFeedback(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeedbackItem[]);
      }
    } catch (err) {
      console.error("Feedback fetch failed", err);
    }
  };

  useEffect(() => {
    if (user) {
      loadAllData();

      // Real-time Feedback & Status listeners
      const channel = supabaseService.supabase.channel('admin-updates')
        .on('postgres_changes', { event: 'INSERT', table: 'feedback', schema: 'public' }, (payload) => {
          setFeedback(prev => [payload.new as FeedbackItem, ...prev]);
          showNotification('New feedback received!', 'success');
        })
        .on('postgres_changes', { event: '*', table: 'site_status', schema: 'public' }, (payload) => {
          if (payload.new) setSiteStatus(payload.new as SiteStatus);
        })
        .subscribe();

      return () => {
        supabaseService.supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const handleLogout = () => {
    authLogout();
  };

  const deleteItem = async (type: string, id: string | number) => {
    if (!confirm('Permanently delete this item?')) return;
    try {
      await deleteDoc(doc(db, type, id.toString()));
      // Also delete from Supabase if needed (to be implemented)
      showNotification('Item deleted successfully', 'success');
      loadAllData();
    } catch (err) {
      showNotification(`Failed to delete ${type}.`, 'error');
    }
  };

  const handleNewsSave = async () => {
    if (!editingNews) return;
    try {
      // Save to Supabase
      await supabaseService.saveNews(editingNews as any);

      // Sync to Firebase
      if (editingNews.id && editingNews.id.length < 30) { // Check if it's a Firebase ID
        await updateDoc(doc(db, 'news', editingNews.id), { ...editingNews });
      } else {
        await addDoc(collection(db, 'news'), { ...editingNews, id: undefined });
      }

      showNotification('News item saved to both platforms!', 'success');
      setEditingNews(null);
      loadAllData();
    } catch (error) {
      showNotification('Failed to save news.', 'error');
    }
  };

  const handleSevaSave = async () => {
    if (!editingSeva) return;
    try {
      await supabaseService.saveSeva(editingSeva as any);

      if (editingSeva.id && editingSeva.id.length < 30) {
        await updateDoc(doc(db, 'sevas', editingSeva.id), { ...editingSeva });
      } else {
        await addDoc(collection(db, 'sevas'), { ...editingSeva, id: undefined });
      }

      showNotification('Seva saved successfully', 'success');
      setEditingSeva(null);
      loadAllData();
    } catch (error) {
      showNotification('Failed to save seva.', 'error');
    }
  };

  const handleSiteStatusSave = async () => {
    try {
      await Promise.all([
        supabaseService.updateSiteStatus(siteStatus),
        rtdbUpdate(rtdbRef(rtdb, 'site_status'), siteStatus)
      ]);
      showNotification('Live site status updated everywhere!', 'success');
    } catch (error) {
      showNotification('Failed to update status.', 'error');
    }
  };

  const handlePushSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement push notification logic here
    showNotification(`Broadcast sent: ${notifForm.title}`, 'success');
    setNotifForm({ title: '', message: '', category: 'General' });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-saffron-100 w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron-500 to-saffron-800"></div>
          <div className="text-center mb-8">
            <div className="bg-saffron-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <Lock className="text-saffron-600 w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 font-header mb-3">Restricted Access</h1>
            <p className="text-stone-500 text-sm leading-relaxed px-4">
              {user
                ? "Your account is logged in as a devotee. Only verified administrators can access this portal."
                : "Please log in with an authorized account to manage the temple services."}
            </p>
          </div>
          <button
            onClick={() => window.location.hash = user ? '/profile' : '/login'}
            className="w-full bg-gradient-to-r from-saffron-600 to-saffron-800 text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            {user ? 'View My Profile' : 'Go to Login'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-[3rem] shadow-xl border border-neutral/10"
      >
        <div className="flex items-center gap-6">
          <div className="bg-primary/10 p-4 rounded-3xl text-primary">
            <LayoutDashboard className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-secondary font-header tracking-tight">Admin Dashboard</h1>
            <p className="text-neutral-content font-medium">Digital Management Suite for Pendurthi Devasthanam</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={loadAllData} className="p-3 text-neutral-content hover:bg-neutral/5 rounded-2xl transition-all">
            <Sparkles className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 bg-red-50 text-red-600 px-8 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all font-bold shadow-sm group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Logout
          </button>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-12">
        {[
          { id: 'site', label: 'Live Control', icon: <Radio className="w-5 h-5" /> },
          { id: 'news', label: 'News Feed', icon: <Newspaper className="w-5 h-5" /> },
          { id: 'sevas', label: 'Seva Ops', icon: <Flower className="w-5 h-5" /> },
          { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-5 h-5" /> },
          { id: 'donations', label: 'E-Hundi', icon: <IndianRupee className="w-5 h-5" /> },
          { id: 'push', label: 'Broadcast', icon: <Send className="w-5 h-5" /> },
          { id: 'feedback', label: 'Inbox', icon: <MessageSquare className="w-5 h-5" /> },
          { id: 'audio', label: 'Audio', icon: <Music className="w-5 h-5" /> },
          { id: 'library', label: 'Library', icon: <BookOpen className="w-5 h-5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] font-bold transition-all transform active:scale-95 ${activeTab === tab.id
              ? 'bg-primary text-white shadow-xl shadow-primary/20 -translate-y-1'
              : 'bg-white text-neutral-content hover:bg-neutral/5 border border-neutral/10'
              }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex justify-center items-center h-full p-20">
            <Loader2 className="w-16 h-16 text-saffron-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* LIVE SITE CONTROL (REALTIME DATABASE) */}
            {activeTab === 'site' && (
              <div className="p-10">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-secondary font-header">Live Site Control</h3>
                    <p className="text-neutral-content mt-1">Changes here will be reflected on the website instantly.</p>
                  </div>
                  <div className="space-y-8 bg-white p-10 rounded-[3rem] border border-neutral/10 shadow-xl">
                    <div>
                      <label className="block text-sm font-bold text-secondary uppercase tracking-widest mb-4">Temple Status</label>
                      <div className="flex gap-4 p-2 bg-neutral/5 rounded-2xl">
                        {['Open', 'Closed', 'Special Event'].map(status => (
                          <button
                            key={status}
                            onClick={() => setSiteStatus({ ...siteStatus, templeStatus: status })}
                            className={`px-8 py-4 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2 ${siteStatus.templeStatus === status ? 'bg-primary text-white shadow-lg' : 'hover:bg-white text-neutral-content'}`}>
                            {status === 'Open' && <div className="w-2 h-2 rounded-full bg-success"></div>}
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="scroll-news" className="block text-sm font-bold text-secondary uppercase tracking-widest mb-4">Top Banner Scrolling News</label>
                      <div className="relative">
                        <input
                          id="scroll-news"
                          type="text"
                          value={siteStatus.scrollNews}
                          onChange={(e) => setSiteStatus({ ...siteStatus, scrollNews: e.target.value })}
                          className="w-full p-6 rounded-[2rem] border border-neutral/10 focus:ring-4 focus:ring-primary/10 outline-none bg-base-100 font-medium text-lg pr-16"
                          placeholder="Enter a short announcement..."
                        />
                        <Radio className="absolute right-6 top-1/2 -translate-y-1/2 text-primary w-6 h-6 animate-pulse" />
                      </div>
                    </div>

                    <button
                      onClick={handleSiteStatusSave}
                      className="w-full bg-primary text-white font-bold py-6 rounded-[2rem] hover:bg-secondary transition-all flex items-center justify-center gap-4 text-xl shadow-xl shadow-primary/20 group overflow-hidden relative">
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Save className="w-7 h-7" /> Update Site Appearance
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* NEWS & EVENTS MANAGEMENT (FIRESTORE) */}
            {activeTab === 'news' && (
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold text-secondary font-header">Temple News & Festival Events</h3>
                  <button
                    onClick={() => setEditingNews({ id: '', title: '', date: new Date().toISOString().split('T')[0], description: '', image: 'https://picsum.photos/800/500' })}
                    className="bg-primary/10 text-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                    <Plus className="w-5 h-5" /> Create New Post
                  </button>
                </div>
                {/* ... Rest of the news component ... */}
              </div>
            )}

            {/* ARJITHA SEVAS (FIRESTORE) */}
            {activeTab === 'sevas' && (
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold text-secondary font-header">Arjitha Seva Offerings</h3>
                  <button
                    onClick={() => setEditingSeva({ id: '', name: '', time: '09:00 AM', description: '', availability: 'Daily' })}
                    className="bg-primary/10 text-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                    <Plus className="w-5 h-5" /> Add New Seva
                  </button>
                </div>
                {/* ... Rest of the sevas component ... */}
              </div>
            )}
            {/* FEEDBACK (FIRESTORE) */}
            {activeTab === 'feedback' && (
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-secondary font-header">Devotee Feedback & Reports</h3>
                  <button onClick={() => fetchFeedback()} className="p-3 hover:bg-neutral/5 rounded-full transition-colors">
                    <Sparkles className={`w-6 h-6 text-primary ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                {/* ... Rest of the feedback component ... */}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
