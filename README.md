# Pokémon Evolution Method Finder

A web application for exploring Pokémon evolution methods and discovering which Pokémon species evolve using each trigger mechanism.

## Problem & Audience

**The Problem**: Pokémon evolution mechanics can be complex, with various triggers like leveling up, using evolutionary stones, trading, and more. Players and researchers often need a quick way to explore which Pokémon use specific evolution methods and understand their requirements.

**Who It's For**:

- Pokémon game players researching evolution methods
- Pokédex enthusiasts and researchers
- Developers learning React with external APIs
- Anyone curious about Pokémon evolution mechanics

## Features

- **Browse Evolution Triggers**: View a curated list of all available evolution triggers (level up, trade, stone evolution, etc.)
- **Species Lookup**: Instantly see which Pokémon species evolve using a selected trigger
- **Evolution Chain Details**: Click on any species to view its requirements for evolution
- **Real-Time Data**: All information synced with the official PokéAPI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Running

1. Navigate to the project directory:

```bash
cd Evolution-Method-Finder
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## API & Endpoints Used

This project uses the **[PokéAPI](https://pokeapi.co/)** (v2), a free, public REST API for Pokémon data.

### Endpoints:

| Endpoint                                               | Purpose                                                                            | Why Used                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `GET /evolution-trigger?limit={limit}&offset={offset}` | Lists all available evolution triggers with pagination                             | Provides the foundational list of all evolution methods in the Pokémon ecosystem |
| `GET /evolution-trigger/{id\|name}`                    | Retrieves details for a specific trigger, including all associated Pokémon species | Links a particular evolution trigger to all Pokémon that use it                  |
| `GET /pokemon-species/{name}`                          | Gets species metadata including evolution chain URL                                | Allows retrieval of evolution chain data for visualization                       |
| Evolution Chain URL (dynamic)                          | Fetches the complete evolution chain from the evolution_chain URL in species data  | Used to show the information needed for evolutions                               |

## Known Limitations & Gotchas

### Current Limitations

1. **No Trigger Search**: There's no search functionality to find specific evolution triggers by name.
   - _Workaround_: Consider adding a filter/search component.

2. **Basic Error Handling**: Error messages are generic ("Error loading data") without specific failure reasons.
   - _Workaround_: Enhanced error messages and retry logic could improve UX.

3. **Network Dependency**: All data is fetched from the external PokéAPI. No offline functionality or local caching beyond React Query's default cache.
   - _Note_: Ensure a stable internet connection for full functionality.

4. **Browser Cache Only**: Evolution data is cached only in the browser's memory during the session. Closing and reopening clears the cache.

### Technical Gotchas

- **CORS**: The PokéAPI has CORS enabled, but be aware if running in restricted environments
- **Rate Limiting**: While PokéAPI doesn't enforce strict rate limits, excessive requests may be throttled
- **Large Evolution Chains**: Some Pokémon have complex multi-stage evolutions that may take time to render

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Data Fetching**: TanStack React Query (React Query)
- **Styling**: CSS
- **Linting**: ESLint

## Development

- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Preview Build**: `npm run preview`

## License

See LICENSE file in the repository root.
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
