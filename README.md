# MKSafeNet - Tower Defense Game

A mobile-friendly tower defense game built with React, TypeScript, and Phaser 3. Features bilingual support (Macedonian and Albanian) with quiz-based gameplay.

- Node.js (v18 or higher)
- npm or bun package manager

## Quick Setup & Startup

### 1. Cloning
Clone the project in your desired directory (e.g. with absolute path `/your/desired/dir`):

#### HTTPS
```bash
git clone https://github.com/ScipioDS/is-react-web.git
```
Or alternatively with SSH:

#### SSH
```bash
git clone git@github.com:ScipioDS/is-react-web.git
```

### 2. Go to the project's root
```bash
cd is-react-web
# or absolutely
cd /your/desired/dir/is-react-web
```

### 3. Install dependencies
```bash
npm i
# or
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:8080`

## Build for Production

Create an optimized production build:
```bash
npm run build
```

The compiled files will be in the `dist/` folder.

## Prepare for Deployment

To deploy to a web server:

1. Build the project using `npm run build`
2. Copy all contents from the `dist/` folder to your web server's public directory
3. Ensure your web server is configured to serve the `index.html` file for all routes

That's it! The game is now ready to play on desktop and mobile devices.
