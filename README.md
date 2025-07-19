# React TypeScript Project

A modern, responsive website built with React, TypeScript, and Tailwind CSS.

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM
- **Icons**: React Icons
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/org-oasis/residence.git
   cd residence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Supabase credentials
   # VITE_SUPABASE_URL=your_supabase_url_here
   # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
residence/
├── public/
│   └── assets/          # Images and static assets
├── src/
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── contexts/       # React contexts
│   ├── data/           # App data and configuration
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── locales/        # Translation files
│   └── pages/          # Page components
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## 🔐 Environment Variables

This project uses environment variables for sensitive configuration. The following variables are required:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

**Important**: Never commit your `.env` file to version control. The `.env.example` file is provided as a template.

**For Production**: When deploying to GitHub Pages, you'll need to set environment variables as GitHub Secrets (see deployment section below).

## 🌐 Deployment

### GitHub Pages

**Important**: Since this project uses environment variables, you need to set them up in your deployment process.

#### Method 1: Manual Deployment (Recommended)

1. **Set up environment variables for production**
   ```bash
   # Create a production .env file with your Supabase credentials
   cp .env.example .env.production
   # Edit .env.production with your actual credentials
   ```

2. **Build and deploy**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "Deploy from a branch"
   - Choose the `gh-pages` branch
   - Set the source to `/ (root)`

#### Method 2: GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📱 Features

- Multi-language support (French and English)
- Responsive design for all devices
- Interactive components with smooth animations
- Touch-friendly mobile interactions
- Modern UI with Tailwind CSS

## 🎨 Customization

### Adding Content
Edit `src/data/appData.ts` to modify the application data and content.

### Adding Translations
Edit the locale files in `src/locales/` to add or modify translations.

### Styling
The project uses Tailwind CSS for styling. Custom styles can be added in `src/index.css` or by modifying the Tailwind configuration in `tailwind.config.ts`.

## 📄 License

This project is private and proprietary.
