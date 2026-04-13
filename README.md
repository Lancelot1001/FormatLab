# FormatLab

A curated collection of popular online format conversion tools, beautifully organized.

![FormatLab](https://img.shields.io/badge/FormatLab-Tools-gold?style=for-the-badge)

## Features

- **30+ Tools** across 6 categories
- **Fuzzy Search** with instant results
- **Bilingual** - English and Chinese
- **Dark Theme** with glassmorphism design
- **Favorites** - Save your frequently used tools

## Categories

- Image - PNG, JPG, WebP, GIF compression and conversion
- Document - PDF merge, split, convert
- Video - MP4, AVI, MOV conversion
- Audio - MP3, WAV, FLAC conversion
- Compression - File compression tools
- Developer - JSON, Base64, QR code tools

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- Fuse.js (fuzzy search)
- i18next (internationalization)
- Framer Motion (animations)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI components
│   ├── features/     # Feature-specific components
│   └── layout/       # Layout components
├── data/             # Tool definitions
├── hooks/            # Custom React hooks
├── i18n/             # Translation files
├── pages/            # Page components
├── store/            # Zustand store
├── styles/           # Global styles
└── types/            # TypeScript types
```

## License

MIT
