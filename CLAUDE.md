# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Production build (tsc + vite build)
npm run preview  # Preview production build locally
npm run lint     # ESLint checking
npm run format   # Format code with Prettier
```

## Architecture

### State Management (Zustand)
Global state is managed via `src/store/useAppStore.ts` using Zustand with `persist` middleware. Only `favorites` is persisted to localStorage under key `convhub-storage`.

Key state:
- `favorites: string[]` - Array of favorited tool IDs
- `selectedCategory: ToolCategory | 'all'` - Current category filter
- `searchQuery: string` - Current search input

### Search (Fuse.js)
Search is implemented in `src/hooks/useSearch.ts`. Uses Fuse.js with fuzzy matching on:
- name, nameZh, description, descriptionZh, tags, tagsZh

Important: Uses `useRef` for debounce timer management to avoid stale closures. Debounce is 300ms.

### Internationalization (i18next)
I18n config in `src/i18n/index.ts`. Translation files:
- `src/i18n/zh.json` - Chinese
- `src/i18n/en.json` - English

Language detection order: localStorage → navigator. Fallback: Chinese.

### Design System
- Dark theme: Background `#0a0a0f`
- Glassmorphism: `backdrop-filter: blur(20px)` with `rgba(255,255,255,0.05)` background
- Theme accent: Indigo `#6366f1` → Purple `#8b5cf6` gradient
- Large border-radius: 12-24px

### Data Model
```typescript
type ToolCategory = 'image' | 'document' | 'video' | 'audio' | 'compression' | 'dev';

interface Tool {
  id: string;
  name: string;        // English name
  nameZh: string;      // Chinese name
  description: string;
  descriptionZh: string;
  category: ToolCategory;
  tags: string[];      // English tags
  tagsZh: string[];    // Chinese tags
  url: string;
  favicon: string;     // Google Favicon API URL
  isPopular: boolean;
}
```

Tools are defined in `src/data/tools.ts`.

## Component Patterns

### GlassCard (`src/components/common/GlassCard.tsx`)
Base glassmorphism container component. Props:
- `hover?: boolean` - Enables scale hover effect
- `as?: 'div' | 'button' | 'a'` - HTML element type

### Hooks
- `useSearch()` - Returns `{ query, setQuery, handleSearch, results, isSearching }`
- `useFavorites()` - Returns `{ favorites, toggleFavorite, isFavorite }`
- `useCategory()` - Returns `{ selectedCategory, setSelectedCategory }`
- `useLanguage()` - Returns `{ currentLanguage, toggleLanguage }`

## Favicon Strategy
Uses Google Favicon API: `https://www.google.com/s2/favicons?domain={domain}&sz=64`
Fallback handling in ToolCard with Globe icon on error.

## Key Files
- `src/pages/HomePage.tsx` - Main page composition
- `src/components/features/ToolGrid.tsx` - Tool card grid with animation
- `src/components/features/CategoryNav.tsx` - Category filter tabs
- `tailwind.config.js` - Theme colors and glass utility

## Development Guidelines

This project uses Chinese rules (`~/.claude/rules/zh/`) for Claude Code. Key rules:
- **coding-style.md**: Immutability (always create new objects, never mutate)
- **development-workflow.md**: Research → Plan → TDD → Code Review → Commit
- **agents.md**: Use planner for complex tasks, code-reviewer after writing code
- **patterns.md**: Repository pattern, consistent API response wrapper
