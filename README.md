# AbeloHost - Product Catalog

A Next.js web application with user authentication and product catalog using the DummyJSON API.

## Features

- 🔐 User authentication with JWT
- 📦 Product catalog display (12 products)
- 🎨 Responsive design with SCSS modules
- ⚡ Fast and optimized with Next.js App Router
- 🐳 Docker support

## Tech Stack

- **TypeScript** - Type safety
- **Next.js 14** - React framework with App Router
- **Zustand** - State management
- **Axios** - HTTP client
- **SCSS Modules** - Component-scoped styling
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Stylelint** - CSS linting

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run lint:style` - Run Stylelint

## Docker

### Build Docker image:

```bash
docker build -t abelohost .
```

### Run Docker container:

```bash
docker run -p 3000:3000 abelohost
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── login/             # Login page
├── components/            # React components
│   ├── Header/           # Header component
│   ├── Footer/           # Footer component
│   ├── LoginForm/        # Login form
│   ├── ProductsList/     # Products list
│   ├── ProductCard/      # Product card
│   └── LoadingSpinner/   # Loading indicator
├── lib/                  # Utility functions
│   ├── api.ts           # Axios client
│   ├── auth.ts          # Authentication service
│   └── products.ts      # Products service
├── store/               # Zustand stores
│   └── authStore.ts    # Authentication store
├── types/               # TypeScript types
│   └── index.ts        # Type definitions
└── styles/              # Global styles
    └── globals.scss    # Global SCSS
```

## API

This application uses the [DummyJSON API](https://dummyjson.com/):

- Authentication: `/auth/login`
- Products: `/products`

## Features Details

### Authentication

- Login with username and password
- Form validation (minimum 3 characters)
- JWT token storage
- Automatic redirect after login

### Products

- Display 12 products in a responsive grid
- Product cards show: image, title, category, price
- "Add to cart" button (UI only) for authenticated users

### Header

- Login link for unauthenticated users
- User name and logout button for authenticated users

### Footer

- Current year
- User email (if authenticated)

## License

MIT
