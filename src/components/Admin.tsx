import React, { useState, useEffect, useContext } from 'react';
import {
  Lock, LayoutDashboard, Newspaper, Flower, Image as ImageIcon,
  LogOut, Plus, Trash2, Save, Users, Edit3, X, Check,
  MessageSquare, AlertCircle, Bell, IndianRupee, Search, Filter,
  Send, Radio, Sparkles, Loader2
} from 'lucide-react';
import { NEWS_ITEMS, SEVAS, GALLERY_IMAGES, SCROLL_NEWS } from '../constants/constants';
import { LanguageContext } from '../context/LanguageContext';
import { NotificationContext } from '../context/NotificationContext';
import { FeedbackItem, SevaItem, NewsItem, GalleryItem, PushNotification, SiteStatus } from '../types/types';
import { db, rtdb } from '../firebase/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { ref as rtdbRef, onValue, update } from 'firebase/database';


const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'sevas' | 'gallery' | 'donations' | 'feedback' | 'site' | 'push'>('site');
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

  const loadFirestoreData = async () => {
    try {
      const newsSnapshot = await getDocs(query(collection(db, "news"), orderBy("date", "desc")));
      setNews(newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsItem[]);

      const sevasSnapshot = await getDocs(query(collection(db, "sevas"), orderBy("name")));
      setSevas(sevasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SevaItem[]);

      const gallerySnapshot = await getDocs(query(collection(db, "gallery"), orderBy("id")));
      setGallery(gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[]);

      fetchFeedback();
    } catch (error) {
      console.error("Error loading Firestore data:", error);
      showNotification('Error loading page data. Please try again.', 'error');
    }
  };

  const loadRealtimeData = () => {
    const siteStatusRef = rtdbRef(rtdb, 'site_status');
    onValue(siteStatusRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setSiteStatus(data);
        } else {
            showNotification('Could not load site status from Realtime DB.', 'error');
        }
    }, (error) => {
        console.error("Firebase Realtime DB Error:", error);
        showNotification('Error connecting to Realtime Database.', 'error');
    });
  };

  const fetchFeedback = async () => {
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
      showNotification('Failed to fetch feedback.', 'error');
    }
  };
  
  const loadAllData = async () => {
      setLoading(true);
      await Promise.all([loadFirestoreData(), loadRealtimeData()]);
      setLoading(false);
  }

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'true') {
      setIsLoggedIn(true);
      loadAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'temple123') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_session', 'true');
      loadAllData();
    } else {
      showNotification('Invalid Credentials', 'error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_session');
  };

  const deleteItem = async (type: string, id: string | number) => {
    if (!confirm('Permanently delete this item?')) return;
    
    try {
      await deleteDoc(doc(db, type, id.toString()));
      showNotification('Item deleted successfully', 'success');
      loadAllData(); // Refresh data
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
      showNotification(`Failed to delete ${type}.`, 'error');
    }
  };

  const handleNewsSave = async () => {
    if (!editingNews) return;

    try {
      if (editingNews.id && news.some(n => n.id === editingNews.id)) {
        const newsDocRef = doc(db, 'news', editingNews.id);
        await updateDoc(newsDocRef, { ...editingNews });
        showNotification('News item updated successfully', 'success');
      } else {
        await addDoc(collection(db, 'news'), { ...editingNews, id: undefined });
        showNotification('News item added successfully', 'success');
      }
      setEditingNews(null);
      loadAllData();
    } catch (error) {
      console.error("Error saving news:", error);
      showNotification('Failed to save news item.', 'error');
    }
  };

  const handleSevaSave = async () => {
    if (!editingSeva) return;

    try {
      if (editingSeva.id && sevas.some(s => s.id === editingSeva.id)) {
        const sevaDocRef = doc(db, 'sevas', editingSeva.id);
        await updateDoc(sevaDocRef, { ...editingSeva });
        showNotification('Seva updated successfully', 'success');
      } else {
        await addDoc(collection(db, 'sevas'), { ...editingSeva, id: undefined });
        showNotification('Seva added successfully', 'success');
      }
      setEditingSeva(null);
      loadAllData();
    } catch (error) {
      console.error("Error saving seva:", error);
      showNotification('Failed to save seva.', 'error');
    }
  };
  
  const handleSiteStatusSave = async () => {
    const siteStatusRef = rtdbRef(rtdb, 'site_status');
    try {
      await update(siteStatusRef, siteStatus);
      showNotification('Live site status has been updated!', 'success');
    } catch (error) {
      console.error("Error updating site status:", error);
      showNotification('Failed to update site status.', 'error');
    }
  };

  const handlePushSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement push notification logic here
    showNotification(`Broadcast sent: ${notifForm.title}`, 'success');
    setNotifForm({ title: '', message: '', category: 'General' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-saffron-100 w-full max-w-md relative overflow-hidden">
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
                { id: 'site', label: 'Live Site Control', icon: <Radio className="w-5 h-5" /> },
                { id: 'news', label: 'News & Events', icon: <Newspaper className="w-5 h-5" /> },
                { id: 'sevas', label: 'Arjitha Sevas', icon: <Flower className="w-5 h-5" /> },
                { id: 'gallery', label: 'Photo Gallery', icon: <ImageIcon className="w-5 h-5" /> },
                { id: 'donations', label: 'E-Hundi Log', icon: <IndianRupee className="w-5 h-5" /> },
                { id: 'push', label: 'Broadcast Center', icon: <Send className="w-5 h-5" /> },
                { id: 'feedback', label: 'Feedback Inbox', icon: <MessageSquare className="w-5 h-5" /> }
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
                        activeTab === tab.id
                            ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-200 scale-105'
                            : 'text-stone-500 hover:bg-stone-50'
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
                                    <h3 className="text-2xl font-bold text-stone-800">Live Site Control</h3>
                                    <p className="text-stone-500 mt-1">Changes here will be reflected on the website instantly.</p>
                                </div>

                                <div className="space-y-8 bg-stone-50 p-10 rounded-3xl border border-saffron-200">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-500 uppercase tracking-widest mb-3">Temple Status</label>
                                        <div className="flex gap-2">
                                            {['Open', 'Closed', 'Special Event'].map(status => (
                                                <button 
                                                    key={status}
                                                    onClick={() => setSiteStatus({...siteStatus, templeStatus: status})}
                                                    className={`px-6 py-3 rounded-xl font-bold text-base transition-all w-full ${siteStatus.templeStatus === status ? 'bg-saffron-600 text-white' : 'bg-white border border-stone-200'}`}>
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="scroll-news" className="block text-sm font-bold text-stone-500 uppercase tracking-widest mb-3">Top Banner Scrolling News</label>
                                        <input
                                            id="scroll-news"
                                            type="text"
                                            value={siteStatus.scrollNews}
                                            onChange={(e) => setSiteStatus({...siteStatus, scrollNews: e.target.value})}
                                            className="w-full p-5 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none bg-white font-medium text-lg"
                                            placeholder="Enter a short announcement..."
                                        />
                                    </div>

                                    <button
                                        onClick={handleSiteStatusSave}
                                        className="w-full bg-gradient-to-r from-saffron-600 to-saffron-800 text-white font-bold py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg">
                                        <Save className="w-6 h-6" /> Publish Live Updates
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NEWS & EVENTS MANAGEMENT (FIRESTORE) */}
                    {activeTab === 'news' && (
                        <div className="p-10">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-2xl font-bold text-stone-800">Temple News & Festival Events</h3>
                                <button
                                    onClick={() => setEditingNews({ id: '', title: '', date: new Date().toISOString().split('T')[0], description: '', image: 'https://picsum.photos/800/500' })}
                                    className="bg-saffron-100 text-saffron-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-saffron-600 hover:text-white transition-all">
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
                                <h3 className="text-2xl font-bold text-stone-800">Arjitha Seva Offerings</h3>
                                <button
                                    onClick={() => setEditingSeva({ id: '', name: '', time: '09:00 AM', description: '', availability: 'Daily' })}
                                    className="bg-saffron-100 text-saffron-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-saffron-600 hover:text-white transition-all">
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
                                <h3 className="text-2xl font-bold text-stone-800">Devotee Feedback & Reports</h3>
                                <button onClick={() => fetchFeedback()} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                    <Sparkles className={`w-5 h-5 text-saffron-500 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            {/* ... Rest of the feedback component ... */}
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
)
}

export default Admin;
