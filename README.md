# SHIVAM ITCS - SaaS Admin Dashboard

A modern, interactive SaaS Admin Dashboard built with cutting-edge web technologies. This is a comprehensive static demo application designed for UI/UX presentations with stunning animations, responsive design, and a cohesive design system.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

## 🎯 Overview

This project is a fully-featured, production-ready SaaS Admin Dashboard showcasing modern web development practices. It features three main pages (Dashboard, User Management, Reports & Settings) with extensive animations, interactive components, and a beautiful UI/UX design.



---

## ✨ Key Features

### 🎨 Modern UI/UX Design
- **Fully Responsive**: Mobile-first approach, optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Seamless theme switching with smooth transitions and localStorage persistence
- **Clean Layout**: Professional spacing, typography, and card-based layouts
- **Accessibility**: WCAG-compliant design with proper contrast ratios and keyboard navigation
- **Custom Branding**: SHIVAM ITCS branding with custom favicon and header

### 🎭 Advanced Animations
- **Framer Motion**: Sidebar toggle, card transitions, modal animations, page transitions, hover effects
- **GSAP (GreenSock)**: 
  - Animated KPI counters with easing functions
  - Chart entry animations with ScrollTrigger
  - Progress bar animations
  - 3D tilt effects on cards
  - Magnetic button interactions
  - Text reveal animations
- **Lottie Animations**: 
  - Loading spinners
  - Success checkmarks
  - Celebration animations
  - Notification bells
  - Data visualization icons
- **CSS Animations**: Scroll-triggered animations using Intersection Observer API
- **Custom Animations**: Spark effects, shimmer borders, gradient shifts

### 📊 Dashboard Pages

#### 1. Dashboard Overview
- **KPI Cards**: 
  - Active Users, Revenue, Churn Rate, System Performance
  - Animated counters with GSAP
  - 3D hover effects with tilt and glow
  - Lottie icon integrations
- **Interactive Charts**:
  - Line charts (Revenue Trend, Conversion Rate)
  - Bar charts (User Activity)
  - Pie charts (User Status Distribution)
  - Mountain/Area charts (Revenue Growth, User Growth, Engagement Metrics)
  - All with GSAP entrance animations
- **Quick Actions**: 
  - Magnetic button interactions
  - Spark effects on click
  - 3D hover transformations
- **Activity Feed**: 
  - Real-time activity timeline
  - Framer Motion card transitions
  - Staggered animations
- **Progress Cards**: 
  - Monthly Goal, Storage Used, API Calls
  - Animated progress bars with GSAP
- **Gadget Cards**: 
  - Response Time, Uptime, Active Sessions, Conversion Rate
  - API Requests, Database Size, CPU Usage, Emails Sent
  - Trend indicators and Lottie animations
- **Animated Text**: 
  - Word-by-word reveal animations
  - Special character animations (vertical flip on 'i')
  - Scroll-triggered text reveals

#### 2. User Management
- **Outstanding Stats Card**: 
  - Gradient background with animated blur circles
  - Total Users, Active Users, Admins, Pending Users
  - Lottie dashboard animation with pulsing ring
  - Shimmer effect overlay
- **User Cards Grid**: 
  - Beautiful card-based layout (replaced table)
  - Avatar with status indicators
  - Role and status badges
  - Last login information
  - Action buttons (View, Edit, Delete)
  - Hover effects with gradient overlays
  - Staggered entrance animations
- **Search & Filter**: 
  - Real-time search functionality
  - Filter options
- **User Modal**: 
  - Enhanced modal with backdrop blur
  - Add/Edit/View modes
  - Magnetic button interactions
  - Smooth enter/exit animations

#### 3. Reports & Settings
- **Comprehensive Analytics**: 
  - Multiple chart types
  - Usage statistics
  - Engagement metrics
  - Revenue/churn visualization
- **Settings Panel**: 
  - Feature toggles
  - System monitoring
  - Security audit logs
  - Role-based access controls
  - API key management
  - Branding customization
- **Empty States**: 
  - Lottie animations for empty states
  - Success confirmations
  - Onboarding hints

---

## 🛠️ Technology Stack

### Core Framework & Build Tools
- **React 18.2.0**: Latest React with hooks, context API, and concurrent features
- **Vite 5.0.8**: Next-generation frontend build tool with HMR (Hot Module Replacement)
- **TypeScript 5.2.2**: Type-safe JavaScript with advanced type checking
- **ESLint 8.55.0**: Code linting and quality assurance

### Styling & UI Framework
- **TailwindCSS 3.3.6**: Utility-first CSS framework
  - Custom color palette
  - Dark mode support
  - Responsive utilities
  - Custom animations
- **PostCSS 8.4.32**: CSS processing with autoprefixer
- **Autoprefixer 10.4.16**: Automatic vendor prefixing

### Animation Libraries
- **Framer Motion 10.16.16**: Production-ready motion library for React
  - Layout animations
  - Gesture handling
  - AnimatePresence for exit animations
  - Variants for complex animations
- **GSAP 3.12.2**: Professional-grade animation library
  - ScrollTrigger plugin for scroll-based animations
  - Timeline control
  - Easing functions
  - 3D transformations
  - QuickTo for smooth animations

### Charting & Data Visualization
- **Recharts 2.10.3**: Composable charting library built with React
  - Line charts
  - Bar charts
  - Area charts
  - Pie charts
  - Responsive containers
  - Custom tooltips and legends

### Routing
- **React Router DOM 6.20.0**: Declarative routing for React
  - BrowserRouter
  - Route configuration
  - Navigation hooks

### Icon Library
- **Lucide React 0.294.0**: Beautiful, customizable icon library
  - 1000+ icons
  - Tree-shakeable
  - TypeScript support
  - Customizable size and color

### Animation Assets
- **Lottie React 2.4.0**: Render After Effects animations as JSON
  - Loading animations
  - Success animations
  - Celebration animations
  - Notification animations
  - Chart/data visualizations
- **LottieFiles Integration**: 
  - Loading spinner: `lf20_jcikwtux`
  - Success check: `lf20_Sta1XK`
  - Celebration: `lf20_m3p2wudf`
  - Notification: `lf20_qp1spzqv`
  - And more...

### Utility Libraries
- **clsx 2.0.0**: Utility for constructing className strings conditionally

### Development Dependencies
- **@vitejs/plugin-react 4.2.1**: Vite plugin for React
- **@typescript-eslint/eslint-plugin 6.14.0**: TypeScript ESLint rules
- **@typescript-eslint/parser 6.14.0**: TypeScript parser for ESLint
- **eslint-plugin-react-hooks 4.6.0**: React Hooks linting rules
- **eslint-plugin-react-refresh 0.4.5**: React Fast Refresh linting
- **@types/node 20.10.0**: TypeScript definitions for Node.js
- **@types/react 18.2.43**: TypeScript definitions for React
- **@types/react-dom 18.2.17**: TypeScript definitions for React DOM

---

## 📦 UI Assets & Components

### Custom Components
1. **Layout Components**:
   - `Layout.tsx`: Main layout wrapper with sidebar and top nav
   - `Sidebar.tsx`: Collapsible sidebar with mobile drawer
   - `TopNav.tsx`: Top navigation bar with theme toggle

2. **Card Components**:
   - `EnhancedKPICard.tsx`: KPI cards with 3D effects, glow, and counters
   - `StatCard.tsx`: Generic statistic cards with trends
   - `ProgressCard.tsx`: Progress bars with animated counters
   - `GadgetCard.tsx`: Versatile metric cards with Lottie
   - `ChartCard.tsx`: Wrapper for chart components
   - `QuickActionCard.tsx`: Interactive action buttons with spark effects

3. **Chart Components**:
   - `AnimatedChart.tsx`: Recharts wrapper with GSAP animations
   - `MountainChart.tsx`: Custom area charts with gradients

4. **Animation Components**:
   - `AnimatedText.tsx`: Word-by-word text reveal animations
   - `AnimatedHeading.tsx`: Special character animations
   - `AnimatedSection.tsx`: Section-based scroll animations
   - `LottieAnimation.tsx`: Lottie animation wrapper with GSAP
   - `SparkEffect.tsx`: Click spark effects
   - `MagneticButton.tsx`: Magnetic hover effects
   - `MagneticIcon.tsx`: Icon magnetic effects

5. **Modal & UI Components**:
   - `EnhancedModal.tsx`: Modal with backdrop blur
   - `UserModal.tsx`: User management modal
   - `ActivityFeed.tsx`: Activity timeline component
   - `EmptyState.tsx`: Empty state with Lottie
   - `NotificationToast.tsx`: Toast notifications
   - `NotificationProvider.tsx`: Notification context

6. **Utility Components**:
   - `PageTransition.tsx`: Page transition animations
   - `ScrollTriggerCard.tsx`: Scroll-triggered card animations
   - `AnimatedTableRow.tsx`: Table row animations
   - `AnimatedSVGIcon.tsx`: SVG path animations
   - `SVGIconPaths.tsx`: SVG path definitions

### Context & Hooks
- `ThemeContext.tsx`: Theme management with localStorage
- `useScrollAnimation.ts`: Custom hook for scroll animations

### Data Files
- `lottieAnimations.ts`: LottieFiles animation URLs configuration

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (or yarn/pnpm)
- **Git**: For version control

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd saas-admin-dashboard-react-vite
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Build for Production

```bash
npm run build
```

The optimized production files will be in the `dist` directory, ready for deployment.

---

## 📁 Project Structure

```
saas-admin-dashboard-react-vite/
├── public/                    # Static assets
│   └── vite.svg              # Default Vite logo
├── src/
│   ├── components/           # Reusable React components
│   │   ├── ActivityFeed.tsx
│   │   ├── AnimatedChart.tsx
│   │   ├── AnimatedHeading.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── AnimatedSVGIcon.tsx
│   │   ├── AnimatedTableRow.tsx
│   │   ├── AnimatedText.tsx
│   │   ├── ChartCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── EnhancedKPICard.tsx
│   │   ├── EnhancedModal.tsx
│   │   ├── GadgetCard.tsx
│   │   ├── KPICard.tsx
│   │   ├── Layout.tsx
│   │   ├── LottieAnimation.tsx
│   │   ├── LottieLoader.tsx
│   │   ├── LottieSuccess.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── MagneticIcon.tsx
│   │   ├── MountainChart.tsx
│   │   ├── NotificationProvider.tsx
│   │   ├── NotificationToast.tsx
│   │   ├── PageTransition.tsx
│   │   ├── ProgressCard.tsx
│   │   ├── QuickActionCard.tsx
│   │   ├── ScrollTriggerCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SparkEffect.tsx
│   │   ├── StatCard.tsx
│   │   ├── SVGIconPaths.tsx
│   │   ├── TopNav.tsx
│   │   └── UserModal.tsx
│   ├── contexts/              # React Context providers
│   │   └── ThemeContext.tsx
│   ├── data/                  # Static data and configurations
│   │   └── lottieAnimations.ts
│   ├── hooks/                 # Custom React hooks
│   │   └── useScrollAnimation.ts
│   ├── pages/                 # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ReportsSettings.tsx
│   │   └── UserManagement.tsx
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles and Tailwind directives
│   └── vite-env.d.ts          # Vite type definitions
├── .gitignore                 # Git ignore rules
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # TypeScript config for Node
└── vite.config.ts             # Vite configuration
```

---

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        600: '#0284c7',
        // ... more shades
      }
    }
  }
}
```

### Lottie Animations

Update `src/data/lottieAnimations.ts` to use custom Lottie animations:

1. Visit [LottieFiles](https://lottiefiles.com/)
2. Search for animations
3. Copy the JSON URL
4. Update the URLs in `lottieAnimations.ts`

### Data

All data is currently static and defined in component files. To connect to an API:

1. Create API service files in `src/services/`
2. Replace mock data with API calls
3. Add loading states and error handling

---

## 🔧 Key Implementation Details

### Theme Management
- Uses React Context API for global theme state
- Persists theme preference in localStorage
- Smooth transitions between light/dark modes
- All components support both themes

### Animation Strategy
- **Initial Load**: GSAP and Framer Motion for entrance animations
- **Scroll Animations**: GSAP ScrollTrigger + CSS animations with Intersection Observer
- **Hover Effects**: Framer Motion whileHover/whileTap props
- **Complex Animations**: GSAP timelines for coordinated animations

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Sidebar transforms to drawer on mobile
- Grid layouts adapt to screen size

### Performance Optimizations
- Code splitting with React.lazy (can be added)
- Tree-shaking for unused code
- Optimized bundle size with Vite
- Lazy loading for Lottie animations
- Memoization for expensive calculations

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👥 Credits

**Developed by**: SHIVAM ITCS  
**Website**: [shivamitcs.in](https://shivamitcs.in)  
**Favicon**: [shivamitcs.in/favicon.ico](https://shivamitcs.in/favicon.ico)

---

## 📌 Important Notes

### Static Demo Application
This is a **static demo application** designed for UI/UX presentations. It does not include:
- Backend functionality
- Real API calls
- Database connections
- Authentication/Authorization
- Real-time data updates

All data is placeholder/mock data. To make it production-ready, you'll need to:
1. Set up a backend API
2. Implement authentication
3. Connect to a database
4. Replace mock data with real API calls
5. Add error handling and loading states

### Animation Performance
- Animations are optimized for modern browsers
- Some animations may be disabled on low-end devices for better performance
- GSAP ScrollTrigger requires proper cleanup to prevent memory leaks

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please contact SHIVAM ITCS.

---

**Built with ❤️ using React, TypeScript, Vite, TailwindCSS, Framer Motion, GSAP, and Lottie**
