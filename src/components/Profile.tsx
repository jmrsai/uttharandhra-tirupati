import React, { useState, useEffect } from 'react';
import { User, Camera, Save, Loader2, LogOut, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabaseService } from '../services/supabaseService';
import { useNotifications } from '../context/NotificationContext';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const { showNotification } = useNotifications();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const data = await supabaseService.getProfile(user.id);
            if (data) {
                setProfile(data);
                setFullName(data.full_name || '');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await supabaseService.updateProfile(user.id, {
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });
            showNotification('Profile updated successfully!', 'success');
            fetchProfile();
        } catch (error: any) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = e.target.files[0];
            const publicUrl = await supabaseService.uploadProfilePicture(user.id, file);

            await supabaseService.updateProfile(user.id, {
                avatar_url: publicUrl,
                updated_at: new Date().toISOString(),
            });

            showNotification('Avatar updated!', 'success');
            fetchProfile();
        } catch (error: any) {
            showNotification(error.message, 'error');
        } finally {
            setUploading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100"
            >
                <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 h-48 relative">
                    <button
                        onClick={logout}
                        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white p-3 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 font-bold text-sm"
                    >
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                </div>

                <div className="px-10 pb-12 relative">
                    <div className="relative -mt-24 mb-8 inline-block">
                        <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white bg-stone-100 shadow-xl overflow-hidden relative group">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                    <User size={60} />
                                </div>
                            )}

                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-bold gap-2">
                                <Camera size={24} />
                                <span>Change Photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </label>

                            {uploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-saffron-600" />
                                </div>
                            )}
                        </div>
                        {profile?.role === 'admin' && (
                            <div className="absolute -bottom-2 -right-2 bg-saffron-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                <ShieldCheck size={20} />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800 font-header mb-1">{profile?.full_name || 'Anonymous Devotee'}</h2>
                            <p className="text-stone-500 flex items-center gap-2 mb-8">
                                <Mail size={16} /> {user.email}
                            </p>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">Display Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-saffron-500 outline-none transition-all font-medium"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-saffron-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-saffron-700 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                    Save Profile Changes
                                </button>
                            </form>
                        </div>

                        <div className="bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100">
                            <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                                <ShieldCheck className="text-saffron-600" /> Account Security
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white p-5 rounded-2xl border border-stone-200 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-stone-400">Member Since</p>
                                            <p className="text-sm font-bold text-stone-700">{new Date(user.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-stone-200 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-stone-400">Account Type</p>
                                            <p className="text-sm font-bold text-stone-700 uppercase tracking-wider">{profile?.role || 'Devotee'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-saffron-50 rounded-2xl border border-saffron-100">
                                <p className="text-xs text-saffron-700 leading-relaxed italic">
                                    Your profile information is secured with 256-bit encryption and protected by our Row Level Security policies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
