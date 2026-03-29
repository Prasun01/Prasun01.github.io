# Prasun Mishra | The Canvas

A high-performance digital portfolio exploring the juxtaposition of structural architectural geometry and fluid organic chaos. Built with React, GSAP, and Unsplash API.

## Features
- **Dynamic Imagery**: Fetches high-resolution photography from the Unsplash API with category-based filtering (Portraits vs. Landscapes).
- **Premium UX**: Smooth scrolling powered by **Lenis** and cinematic transitions using **GSAP**.
- **Performance**: Optimized builds and minimal layout thrash with modern CSS and `will-change`.
- **Responsive Design**: Tailored experiences for desktop and mobile, with custom interactive cursor logic.
- **CI/CD Built-in**: Configured for automated deployment to **GitHub Pages**.

## Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock), Framer Motion
- **Performance**: Lenis (Smooth Scroll), Blurhash (Image placeholders)
- **API**: Unsplash API

## Getting Started

### 1. Prerequisites
- Node.js (v20+ recommended)
- Unsplash Developer Access Key

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Unsplash Access Key:
```env
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

### 4. Development
```bash
npm run dev
```

### 5. Deployment
The repository is set up with GitHub Actions. Simply push to the `main` branch to trigger a deploy. Ensure `VITE_UNSPLASH_ACCESS_KEY` is added to your GitHub Repository Secrets.

---
© 2026 Prasun Mishra.
