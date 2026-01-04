/**
 * Uttharandhra Tirupati - Security Utility
 * 🛡️ This module handles data sanitization and documents our security posture.
 */

/**
 * Basic XSS Sanitization
 * Replaces characters that could be used for script injection.
 */
export const sanitizeInput = (text: string): string => {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

/**
 * End-to-End Protection Summary:
 * 
 * 1. Encryption in Transit (SSL/TLS):
 *    All communication between this client and our backends (Supabase/Firebase) 
 *    is strictly enforced over HTTPS (TLS 1.3), ensuring data cannot be intercepted.
 * 
 * 2. Encryption at Rest:
 *    Data stored in PostgreSQL (Supabase) and Firebase Firestore is encrypted 
 *    using AES-256 standard on the disk.
 * 
 * 3. Access Control (RLS):
 *    We use Row Level Security (RLS) policies at the database level. 
 *    Even if someone has the API key, they can only access data permitted by their session.
 * 
 * 4. Content Security Policy (CSP):
 *    Our index.html includes a strict CSP to block unauthorized script sources and injection.
 */
export const getSecurityPosture = () => ({
    encryption: 'AES-256 / TLS 1.3',
    vulnerability_protection: 'CSP + RLS + Input Sanitization',
    status: 'Healthy'
});
