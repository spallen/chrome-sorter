# YouTube Watchlist Sorter

A Chrome extension built with Next.js 16, React 19, Tailwind CSS, and shadcn/ui components that allows you to efficiently manage, sort, filter, and organize your YouTube watchlist.

## Features

- **Search & Filter**: Search your watchlist by video title or channel name
- **Advanced Sorting**: Sort videos by:
  - Date added to watchlist
  - Video publish date
  - Video title (alphabetically)
  - Channel name (alphabetically)
- **Bulk Selection**: Select multiple videos at once
- **Playlist Management**: Move selected videos to different playlists
- **Clean Watchlist**: Option to remove videos from watchlist after moving them
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type-Safe**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: React 19
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Language**: TypeScript 5.3
- **Code Quality**: ESLint & Prettier

## Project Structure

```
chrome-sorter/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main page component
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   └── label.tsx
│   ├── watchlist-manager.tsx   # Main watchlist manager component
│   ├── video-list.tsx          # Video list display component
│   └── playlist-selector.tsx   # Playlist selection component
├── lib/                         # Utility functions
│   └── utils.ts                # Class name utilities
├── types/                       # TypeScript type definitions
│   └── watchlist.ts            # Watchlist-related types
├── public/                      # Static assets
│   ├── manifest.json           # Chrome extension manifest
│   ├── background.js           # Extension background script
│   ├── content.js              # Extension content script
│   └── icons/                  # Extension icons
├── scripts/                     # Build scripts
│   └── build-extension.sh      # Extension build script
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                 # Prettier configuration
└── package.json                # Project dependencies

```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Google Chrome browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chrome-sorter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app in development mode.

## Building the Chrome Extension

### Build for Production

1. Build the Next.js application:
```bash
npm run build
```

2. Run the extension build script:
```bash
./scripts/build-extension.sh
```

This will create an `extension` directory with all the necessary files for the Chrome extension.

### Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top-right corner)
3. Click "Load unpacked"
4. Select the `extension` directory from your project

### Extension Icons

Before loading the extension, you should add icon files to `public/icons/`:
- `icon16.png` - 16x16 pixels
- `icon32.png` - 32x32 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run linting and formatting before committing:
```bash
npm run lint
npm run format
```

## How It Works

### Chrome Extension Architecture

1. **Manifest V3**: Uses the latest Chrome extension manifest version
2. **Background Service Worker** (`background.js`): Handles extension lifecycle and API calls
3. **Content Script** (`content.js`): Interacts with YouTube pages to extract watchlist data
4. **Popup UI**: Next.js app serves as the extension popup interface

### Key Features Implementation

#### Search & Filter
- Real-time search filtering by title and channel
- Debounced input for performance
- Case-insensitive matching

#### Sorting
- Multiple sort criteria (added date, publish date, title, channel)
- Ascending/descending order toggle
- Efficient sorting with useMemo hook

#### Bulk Operations
- Select all/deselect all functionality
- Individual video selection with checkboxes
- Visual feedback for selected items

#### Playlist Management
- Select target playlist from dropdown
- Move videos with optional removal from watchlist
- Batch operations for efficiency

## Future Enhancements

- [ ] Integration with YouTube Data API
- [ ] Export watchlist to CSV/JSON
- [ ] Custom filter presets
- [ ] Dark mode toggle
- [ ] Video preview on hover
- [ ] Duplicate video detection
- [ ] Watch history integration
- [ ] Keyboard shortcuts
- [ ] Undo/redo operations
- [ ] Tags and custom categorization

## Technologies & Libraries

### Core Dependencies
- `next` ^16.0.1 - React framework
- `react` ^19.0.0 - UI library
- `react-dom` ^19.0.0 - React DOM renderer
- `tailwindcss` ^3.4.1 - Utility-first CSS
- `typescript` ^5.3.3 - Type safety

### UI Components
- `@radix-ui/react-*` - Unstyled, accessible UI primitives
- `lucide-react` ^0.344.0 - Icon library
- `class-variance-authority` ^0.7.0 - Component variants
- `clsx` ^2.1.0 - Class name utilities
- `tailwind-merge` ^2.2.1 - Tailwind class merging

### Development Tools
- `eslint` ^8.56.0 - Code linting
- `prettier` ^3.2.5 - Code formatting
- `@types/chrome` ^0.0.260 - Chrome API types

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
