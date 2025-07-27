# React TypeScript Project

A modern, responsive website built with React, TypeScript, and Tailwind CSS.

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM
- **Icons**: React Icons
- **State Management**: React Context API
- **Deployment**: GitHub Actions

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

## 🌐 Deployment

This project uses GitHub Actions for automated deployment. The deployment workflow is configured in `.github/workflows/` and automatically builds and deploys the application when changes are pushed to the main branch.

### GitHub Actions Setup

The deployment process is handled automatically by GitHub Actions. When you push changes to the main branch:

1. **Automatic Build**: The workflow automatically builds the project
2. **Environment Variables**: Uses GitHub Secrets for production environment variables
3. **Deployment**: Automatically deploys to the configured hosting platform

### Required GitHub Secrets

For the deployment to work correctly, you need to set up the following secrets in your GitHub repository:

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following repository secrets:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📱 Features

- Multi-language support (French, English, and Arabic)
- Responsive design for all devices
- Interactive components with smooth animations
- Touch-friendly mobile interactions
- Modern UI with Tailwind CSS
- Apartment booking and availability system
- Image galleries and virtual tours

## 🎨 Customization

### Adding Content
Edit `src/data/appData.ts` to modify the application data and content.

### Adding Translations
Edit the locale files in `src/locales/` to add or modify translations:
- `src/locales/en.ts` - English translations
- `src/locales/fr.ts` - French translations
- `src/locales/ar.ts` - Arabic translations

### Styling
The project uses Tailwind CSS for styling. Custom styles can be added in `src/index.css` or by modifying the Tailwind configuration in `tailwind.config.ts`.

## 📄 License

This project is private and proprietary.
