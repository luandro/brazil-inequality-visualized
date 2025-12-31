<div align="center">

  <!-- <img src="public/og-image.png" alt="Brazil Inequality Visualized Logo" width="120" height="120"> -->

  # Brazil Inequality Visualized

  **Understanding poverty, wealth, and social policy through interactive data visualization**

  [![Live Demo](https://img.shields.io/badge/🔗-Live_Demo-brightgreen)](https://yourusername.github.io/brazil-inequality-visualized/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vite.dev/)

  **[English](#) • [Português](#)**

</div>

---

## 📖 Overview

**Brazil Inequality Visualized** is an interactive web application that explores Brazil's socioeconomic landscape through validated, official data. Every statistic is sourced from Brazilian government statistics and international organizations, providing a comprehensive view of poverty, wealth concentration, labor markets, and social policy impacts.

## 🖼️ Screenshots

<!-- Add screenshots here when available
![Reality Dashboard](docs/screenshots/dashboard.png)
*[Reality Dashboard: Key inequality metrics at a glance]*

![Wealth Concentration](docs/screenshots/wealth.png)
*[Wealth Concentration: Distribution across population segments]*

![Policy Simulator](docs/screenshots/simulator.png)
*[Policy Simulator: Model hypothetical wealth tax scenarios]*
-->

### 🎯 Key Features

- **📊 Reality Dashboard** - Comprehensive inequality metrics with official data validation
- **💰 Wealth Concentration Analysis** - Multi-millionaire and billionaire population estimates
- **👥 Labor Market Insights** - Employment, informality, and working poor statistics
- **🎮 Policy Simulator** - Model hypothetical wealth tax scenarios (educational)
- **🌍 Regional & Racial Breakdowns** - Poverty distribution across Brazil's regions and racial groups
- **🔍 Data Explorer** - Full dataset transparency with source verification
- **🌐 Bilingual Support** - English and Portuguese (Brazil) localization

### 🎨 Built With

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-000000?style=for-the-badge&logo=recharts&logoColor=white)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/brazil-inequality-visualized.git
cd brazil-inequality-visualized

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
brazil-inequality-visualized/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── ui/            # shadcn/ui primitives
│   ├── context/          # React context providers
│   ├── data/             # Datasets and data utilities
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization (en, pt-BR)
│   ├── lib/              # Utility functions
│   ├── pages/            # Page-level components
│   ├── App.tsx           # Main app with routes
│   └── main.tsx          # Application entry point
├── docs/                 # Project documentation
├── .github/              # GitHub Actions workflows
└── package.json          # Dependencies and scripts
```

---

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run build:dev` | Build in development mode for debugging |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across the repository |
| `npm run generate-logos` | Generate logo assets |
| `npm run optimize-images` | Optimize images in public/ |

---

## 🌐 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Setup:**
1. Enable GitHub Pages: Settings → Pages → Source: GitHub Actions
2. Configure permissions: Settings → Actions → General → Read and write permissions
3. Push to `main` branch - deployment happens automatically

**Custom Domain:**
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

### Alternative Hosting

The app works with any static hosting provider:
- **Netlify** - Automatic Vite detection
- **Vercel** - Zero configuration
- **AWS S3 + CloudFront** - Custom error responses for SPA routing

---

## 📊 Data Sources

All statistics are validated against official sources:

- **IBGE** (Brazilian Institute of Geography and Statistics) - Census, PNAD
- **World Bank** - International poverty lines, Gini coefficients
- **IPEA** - Institute of Applied Economic Research
- **Brazilian Government** - Official social program statistics

For complete source catalog and methodology, see the [Methodology](/methodology) section in the app.

---

## 🧪 Development

### Code Style

- **TypeScript** with strict mode enabled
- **ESLint** with React hooks and React Refresh rules
- **2-space indentation** (Prettier compatible)
- **Absolute imports** using `@/` alias

### Localization

Adding new translations:
1. Edit `src/i18n/en.json` and `src/i18n/pt-BR.json`
2. Use `useTranslation()` hook in components
3. Follow existing key structure

See [docs/i18n-guide.md](docs/i18n-guide.md) for detailed conventions.

### Adding New Pages

1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation entries in both language files
4. Update `src/i18n/en.json` and `src/i18n/pt-BR.json`

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Issues** - Use GitHub Issues with clear descriptions and reproduction steps
2. **Suggest Features** - Share your ideas for new visualizations or data sources
3. **Submit Pull Requests** - Fork the repo, create a feature branch, and submit a PR
4. **Improve Documentation** - Enhance guides, fix typos, add examples

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev
npm run lint

# Commit and push
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature

# Open pull request on GitHub
```

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Brazilian Government** - For making official statistics publicly available
- **IBGE** - For comprehensive demographic and economic data
- **World Bank** - For international poverty metrics and methodology
- **shadcn/ui** - For beautiful, accessible UI components
- **Vite & React Teams** - For amazing developer tooling

---

## 📞 Contact & Support

- 🐛 **Found a bug?** [Open an issue](https://github.com/yourusername/brazil-inequality-visualized/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/yourusername/brazil-inequality-visualized/discussions)
- 📧 **Questions?** Open a GitHub Discussion with the `question` label

---

## 🗺️ Roadmap

- [ ] Add more historical time-series data
- [ ] Implement export functionality for charts
- [ ] Add more social policy simulators
- [ ] Expand regional breakdowns
- [ ] Mobile app version (React Native)

---

<div align="center">

  **Built with ❤️ to promote data-driven understanding of inequality**

  [⬆ Back to Top](#brazil-inequality-visualized)

</div>
