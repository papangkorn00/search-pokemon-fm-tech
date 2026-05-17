# Pokémon Explorer (search-pokemon-fm-tech)

## 1. Implemented Functional Requirements

### Search Input Component
- **Search by Name:** Allows users to search for Pokémon by name.
- **URL Query Parameter:** Reads and reflects the search value from a URL query parameter.

### Result Component
- **Data Display:** Displays all available information for the searched Pokémon.
- **"Not Found" State:** Shows a “not found” state when no Pokémon matches the search query.
- **Detailed Pokémon View:**
  - **Attacks:** Lists the Pokémon's attacks.
  - **Evolutions:** Displays the evolutionary chain of the Pokémon.
- **Interactive Evolutions:**
  - Clicking an evolution’s name updates the search query parameter in the URL.
  - Displays the selected evolution’s result.

## 2. Optional Requirements

- **GraphQL & Caching:** Used Apollo Client for data fetching and caching (Server and Client-side) via `src/app/ApolloWrapper.tsx` and `src/app/ApolloClient.ts`. This replaces manual `fetch` calls and handles state.
- **Search History:** Added a search history feature that uses `localStorage` to save recently searched Pokémon.
- **Unit Testing:** Wrote tests using **Jest**. Includes mock data for Pokémon (Bulbasaur, Charmander, Squirtle) and checks if they map to the correct elemental types.

## 3. Folder Structure

```text
search-pokemon-fm-tech/
├── __tests__/         # Unit tests (Jest)
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router (Pages, Layout, Apollo Provider)
│   ├── components/    # Reusable UI components
│   │   ├── pokemon/   # Pokémon result components
│   │   ├── search/    # Search input components
│   │   └── ui/        # Shared UI components (Tailwind)
│   └── types/         # TypeScript definitions
├── jest.config.ts     # Jest configuration
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

---

### Getting Started Locally

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
