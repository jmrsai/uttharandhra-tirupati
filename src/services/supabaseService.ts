
import supabase from '../utils/supabase';
import { NewsItem, SevaItem, GalleryItem, FeedbackItem, SiteStatus, AudioItem, BookItem } from '../types/types';

export const supabaseService = {
    // Database Operations
    async getNews() {
        const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
        if (error) throw error;
        return data as NewsItem[];
    },

    async saveNews(news: Omit<NewsItem, 'id'> & { id?: string }) {
        if (news.id) {
            const { data, error } = await supabase.from('news').update(news).eq('id', news.id).select();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase.from('news').insert([news]).select();
            if (error) throw error;
            return data;
        }
    },

    async getSevas() {
        const { data, error } = await supabase.from('sevas').select('*').order('name');
        if (error) throw error;
        return data as SevaItem[];
    },

    async saveSeva(seva: Omit<SevaItem, 'id'> & { id?: string }) {
        if (seva.id) {
            const { data, error } = await supabase.from('sevas').update(seva).eq('id', seva.id).select();
            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase.from('sevas').insert([seva]).select();
            if (error) throw error;
            return data;
        }
    },

    async getGallery() {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as GalleryItem[];
    },

    async getSiteStatus() {
        const { data, error } = await supabase.from('site_status').select('*').eq('id', 1).single();
        if (error && error.code !== 'PGRST116') throw error; // Ignore not found
        return data as SiteStatus;
    },

    async updateSiteStatus(status: SiteStatus) {
        const { data, error } = await supabase.from('site_status').upsert({ id: 1, ...status }).select();
        if (error) throw error;
        return data;
    },

    async addFeedback(feedback: Omit<FeedbackItem, 'id'>) {
        const { data, error } = await supabase.from('feedback').insert([feedback]).select();
        if (error) throw error;
        return data;
    },

    async getAudioTracks(language: string) {
        const { data, error } = await supabase.from('audio').select('*').eq('language', language).order('title');
        if (error) throw error;
        return data as AudioItem[];
    },

    async getBooks() {
        const { data, error } = await supabase.from('books').select('*').order('title');
        if (error) throw error;
        return data as BookItem[];
    },

    // Storage Operations
    async uploadMedia(bucket: string, file: File, path: string) {
        const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
            cacheControl: '3600',
            upsert: true
        });
        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
        return publicUrl;
    }
};
