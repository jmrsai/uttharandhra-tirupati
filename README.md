# 🛕 Uttharandhra Tirupati Portal

A modern, high-performance web portal for the Uttharandhra Tirupati Temple (Pendurthi), featuring real-time synchronization, secure devotee profiles, and a comprehensive administrative suite.

## 🚀 Features

### 💎 Devotee Experience
- **Real-time Home Screen**: Live temple status, dynamic news ticker, and daily panchangam.
- **Divine Media**: High-quality audio player for slokas/songs and a digital library for spiritual books.
- **Sevas & Gallery**: Detailed seva information and a masonry-style visual gallery with skeleton loading.
- **Personalized Profiles**: Secure login with profile picture (PFP) uploads and display name management.
- **Interactive Feedback**: Dual-submission system with real-time admin notifications.

### 🛡️ Security & Privacy
- **Content Security Policy (CSP)**: Strict protection against XSS and data injection.
- **Row Level Security (RLS)**: Fine-grained database access control ensuring data privacy.
- **Input Sanitization**: Multi-layer sanitization for all user-generated content.
- **RBAC**: Robust Role-Based Access Control for administrative functions.

### ⚙️ Administrative Suite
- **Live Dashboard**: Real-time control over temple status and scrolling announcements.
- **Content Management**: Effortless management of news, sevas, and media assets.
- **Admin Automation**: Secure terminal-based scripts for managing administrative accounts.

## 🛠️ Technology Stack

- **Frontend**: Vite + React 19 + TypeScript
- **Styling**: Vanilla CSS + Tailwind CSS (Optimized)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Backend Services**: 
  - **Supabase**: Primary Real-time Database, Auth, and Storage.
  - **Firebase**: Legacy Mirroring and Analytics.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_public_key
   SUPABASE_SERVICE_ROLE_KEY=your_secret_admin_key (Server-side only)
   ```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---
*Built with devotion for Uttharandhra Tirupati, Pendurthi.*
