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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
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

## 🌐 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "Deploy from a branch"
   - Choose the `gh-pages` branch or `main` branch with `/docs` folder
   - Set the source to the `dist` folder

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
