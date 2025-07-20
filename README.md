# resumeApp
# 📱 Professional Resume Mobile App

A premium, interactive mobile resume application built with React Native and Expo, featuring a sophisticated UI design and comprehensive professional portfolio showcase.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌟 Features

### 📋 Professional Sections
- **Professional Summary** - Interactive overview with edit functionality and skill highlighting
- **Education** - Timeline-based education history with expandable details and achievement highlights
- **Professional Experience** - Interactive experience cards with company branding and skill tags
- **Projects** - Portfolio showcase with technology stacks, live demos, and GitHub integration
- **Publications** - Academic publications with citation tracking and research metrics
- **Certifications** - Categorized certification management with verification status
- **Technical Skills** - Comprehensive skill categorization with certification tracking and filtering

### 🎨 Premium UI/UX
- **Modern Design** - Clean, professional interface with premium card layouts
- **Interactive Elements** - Expandable cards, hover effects, and smooth animations
- **Responsive Layout** - Optimized for all screen sizes and orientations
- **Professional Typography** - SF Pro Display/Roboto font families with proper hierarchy
- **Color-Coded Categories** - Visual organization with consistent color schemes
- **Platform-Specific Styling** - iOS and Android optimized components

### 🚀 Advanced Functionality
- **Category Filtering** - Filter content by categories, types, and status
- **Dual View Modes** - Switch between overview and detailed views
- **Progressive Disclosure** - Show/hide detailed information on demand
- **Real-time Statistics** - Dynamic metrics and achievement counters
- **Interactive Timelines** - Visual career and education progression
- **Verification Badges** - Professional certification and achievement indicators

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 51+
- **Language**: TypeScript/JavaScript
- **Navigation**: Expo Router (File-based routing)
- **Icons**: @expo/vector-icons (MaterialIcons, Ionicons)
- **Styling**: StyleSheet with Platform-specific optimizations
- **State Management**: React Hooks (useState, useEffect)
- **Animations**: React Native Animated API
- **UI Components**: Custom premium components with professional styling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/sujalkamanna/resumeApp
cd resumeApp
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Install Expo CLI** (if not already installed)
```bash
npm install -g @expo/cli
```

4. **Install required packages**
```bash
npx expo install @expo/vector-icons
npx expo install expo-linking
npx expo install expo-router
```

5. **Start the development server**
```bash
npx expo start
```

6. **Run on device/simulator**
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android

# Web
npx expo start --web
```

## 📁 Project Structure

```
resume_app/
├── app/                          # Main application directory
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Professional Summary
|   |   ├── 1_name_soial.tsx      # Social Profiles and name
│   │   ├── 2_education.tsx       # Education Section
│   │   ├── 3_experience.tsx      # Professional Experience (4_pe.tsx)
│   │   ├── 4_projects.tsx        # Projects Portfolio
│   │   ├── 5_publications.tsx    # Research Publications (6_publications.tsx)
│   │   ├── 6_certifications.tsx  # Certifications (7_certifications.tsx)
│   │   └── 7_skills.tsx          # Technical Skills (8_skills.tsx)
│   ├── _layout.tsx               # Root layout with tab navigation
│   └── +not-found.tsx            # 404 page
├── assets/                       # Static assets
│   ├── images/
│   └── icons/
├── components/                   # Reusable components (if any)
├── constants/                    # App constants
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🎯 Key Components

### Professional Summary (`index.tsx`)
- Interactive edit mode with save/cancel functionality
- Skill highlighting with bold keywords
- Professional signature with verification badge
- Expandable content with smooth animations
- Key skills tags with professional styling

### Education Timeline (`2_education.tsx`)
- Visual timeline with connecting lines and nodes
- Institution-specific icons and color coding
- Expandable cards with achievement highlights
- Academic performance indicators and metrics
- Summary statistics for qualifications

### Professional Experience (`4_pe.tsx`)
- Company-specific branding and timeline nodes
- Interactive expand/collapse functionality
- Skill tags with overflow handling
- Type badges (Internship, Full-time, Contract)
- Achievement highlights in expanded view
- Career progression timeline

### Projects Portfolio (`4_projects.tsx`)
- Category-based filtering (Web, Data, Mobile, Desktop)
- Technology stack visualization with tags
- Live demo and GitHub integration buttons
- Featured project highlighting with special badges
- Project statistics dashboard
- Interactive action buttons

### Publications (`6_publications.tsx`)
- Academic publication management with types
- Citation tracking and research metrics
- DOI integration and verification status
- Impact level indicators (High, Medium, Low)
- Keywords system with professional tagging
- Research statistics (H-Index, Citations, Published count)

### Certifications (`7_certifications.tsx`)
- Category-based organization (Technical, Analytics, Management, Soft Skills)
- Verification status tracking with badges
- Provider-specific branding and icons
- Grid/List view toggle functionality
- Certification statistics overview

### Technical Skills (`8_skills.tsx`)
- Multi-category skill organization with color coding
- Certification status tracking with verification badges
- Interactive filtering by category
- Overview/Detailed view modes
- Professional skill metrics and statistics

## 📱 Platform Support

- ✅ **iOS** - Native iOS app with SF Pro fonts and iOS-specific styling
- ✅ **Android** - Native Android app with Material Design elements
- ✅ **Web** - Progressive Web App with responsive design
- ✅ **Cross-Platform** - Shared codebase with platform-specific optimizations

## 🎨 Design System

### Color Palette
- **Primary**: #6366F1 (Indigo) - Main brand color
- **Secondary**: #10B981 (Emerald) - Success and verification
- **Accent**: #F59E0B (Amber) - Warnings and highlights
- **Technical**: #3B82F6 (Blue) - Programming and technical skills
- **Analytics**: #10B981 (Green) - Data and analytics
- **Management**: #8B5CF6 (Purple) - Leadership and management
- **Soft Skills**: #EF4444 (Red) - Communication and interpersonal

### Typography Hierarchy
- **Display**: 20px, Bold - Section titles
- **Heading**: 16-18px, SemiBold - Card titles
- **Body**: 14-15px, Regular - Main content
- **Caption**: 11-13px, Medium - Metadata and labels
- **Monospace**: Credential IDs and technical identifiers

### Component Styling
- **Card Radius**: 16-24px for premium feel
- **Shadows**: Platform-specific elevation and shadows
- **Spacing**: 8px grid system for consistency
- **Borders**: Subtle 1px borders with rounded corners
- **Icons**: 16-22px for optimal visibility

## 🔧 Configuration

### App Configuration (`app.json`)
```json
{
  "expo": {
    "name": "Professional Resume",
    "slug": "resumApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    }
  }
}
```

### TypeScript Configuration
The project uses TypeScript for type safety with interfaces for:
- `EducationEntry` - Education data structure
- `Experience` - Professional experience data
- `ProjectEntry` - Project portfolio data
- `PublicationEntry` - Academic publications
- `CertificationEntry` - Certification data
- `Skill` and `SkillCategory` - Skills organization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices with proper type definitions
- Use consistent naming conventions (PascalCase for components)
- Maintain the 8px spacing grid system
- Test on both iOS and Android platforms
- Follow the established color scheme and typography
- Add proper error handling for external links

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sujalkamanna/resumeApp/blob/main/LICENSE) file for details.

## 👨‍💻 Author

**Sujal Kamanna**
- Python Developer with expertise in Data Analysis and scalable web development
- Skilled in Power BI visualization and Agile methodologies
- GitHub: [@Sujal Kamanna](https://github.com/sujalkamanna)
- LinkedIn: [@Sujal Kamanna](https://linkedin.com/in/sujalkamanna)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform and tools
- [React Native](https://reactnative.dev/) for cross-platform capabilities
- [Material Design](https://material.io/) for design inspiration and icons
- [SF Pro](https://developer.apple.com/fonts/) for iOS typography
- [@expo/vector-icons](https://icons.expo.fyi/) for comprehensive icon library

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/resume-app)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/resume-app)
![GitHub issues](https://img.shields.io/github/issues/yourusername/resume-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/resume-app)

## 🔮 Future Enhancements

- [ ] **Dark Theme** - Complete dark mode implementation
- [ ] **PDF Export** - Generate and share PDF resume
- [ ] **Multi-language Support** - Internationalization (i18n)
- [ ] **Analytics Dashboard** - Track profile views and interactions
- [ ] **Social Media Integration** - Share achievements and updates
- [ ] **Real-time Sync** - Cloud synchronization of data
- [ ] **AI-powered Suggestions** - Content optimization recommendations
- [ ] **Voice Navigation** - Accessibility improvements
- [ ] **Offline Mode** - Local data caching and offline functionality
- [ ] **Performance Optimizations** - Lazy loading and code splitting

## 🐛 Known Issues

- Some MaterialIcons names may need verification for cross-platform compatibility
- Web deployment may require additional configuration for routing
- Large skill lists may need pagination for better performance

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/sujalkamanna/resumeApp/issues) page
2. Create a new issue with detailed description
3. Contact the author directly

---

<div align="center">
  <p>Made with ❤️ using React Native and Expo</p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p>🚀 Perfect for showcasing your professional journey!</p>
</div>