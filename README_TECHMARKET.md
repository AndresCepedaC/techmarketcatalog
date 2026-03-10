# Tech Market — Technical Documentation (README_TECHMARKET.md)

## Project Overview
A premium technology product catalog featuring a neon tech aesthetic, Aura AI chatbot integration, and optimized for speed and conversion.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API (StoreContext)
- **AI Backend:** Groq API (Llama 3.2)

## Project Structure
- `src/main.jsx`: Main entry point.
- `src/components/layout/`: Header, Footer, Hero, TopBar.
- `src/components/ui/`: ProductCard, ProductGrid, Modal, Magnifier.
- `src/components/features/`: Chatbot.
- `src/context/`: Global state management.
- `public/data/products.js`: Product data source.

## Commands
- `npm run dev`: Start development server.
- `npm run build`: Build for production (outputs to `dist/`).
- `npm run preview`: Preview the production build.

## Configuration
- **API Key:** Set `VITE_GROQ_API_KEY` in `.env.local`.
- **WhatsApp:** Configure number in `fetchGroqIA` and components (currently `+57 300 505 4912`).
