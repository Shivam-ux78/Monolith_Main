# 3D Freelance Agency

A premium, immersive 3D agency website engineered for high-performance digital experiences. This project features a cutting-edge "cyberpunk" aesthetic, interactive WebGL scenes, and a robust backend integration.

![Project Preview]

## 🚀 Overview

This platform is designed to showcase premium web development and 3D design services. It leverages spatial computations and immersive user interfaces to elevate brand presence beyond traditional 2D boundaries.

### Key Features

*   **Immersive 3D Hero**: Interactive volumetric backgrounds driven by React Three Fiber.
*   **Structural Pipeline**: A 5-stage visualized process using custom 3D canvases.
*   **Premium UI**: Sleek dark-mode aesthetic with glassmorphism, neon accents, and smooth Framer Motion transitions.
*   **Secure Lead Management**: Integrated PocketBase backend for secure data transmission and lead tracking.
*   **Defense in Depth**: Frontend input sanitation, rate limiting, and secure communication protocols.
*   **Dynamic Portfolio**: High-fidelity showcases of digital ecosystems and structural layouts.

## 🛠 Tech Stack

*   **Frontend**: React 19, Vite, TypeScript
*   **Styling**: Tailwind CSS, Vanilla CSS (GlobalStyles.css)
*   **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
*   **Animations**: Framer Motion
*   **Backend**: PocketBase
*   **Routing**: React Router 7

## 📂 Project Structure

```text
├── backend/            # PocketBase executable and database
├── public/             # Static assets and textures
├── src/
│   ├── components/     # UI and 3D Scene components
│   ├── lib/            # PocketBase client and utilities
│   ├── pages/          # Main application pages (Home, Contact, Portfolio)
│   ├── App.tsx         # Main Routing and Layout
│   └── GlobalStyles.css # Global design tokens and animations
└── vite.config.ts      # Vite configuration
```

## ⚙️ Getting Started

### Prerequisites

*   Node.js (v18+)
*   PocketBase (Executable included in `backend/`)

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Backend**:
    Navigate to the `backend/` directory and run the PocketBase executable:
    ```bash
    ./pocketbase serve
    ```
4.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    VITE_POCKETBASE_URL=http://127.0.0.1:8090
    ```
5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🔒 Security Measures

*   **Input Sanitation**: All user inputs are sanitized to prevent XSS and injection attacks.
*   **Rate Limiting**: Contact form submissions are throttled at the browser level to prevent spam.
*   **Data Integrity**: Type-safe database interactions using TypeScript and PocketBase SDK.

## 📜 License

This project is licensed under the ISC License.
