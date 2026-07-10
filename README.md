# Spice Haven 🌶️ | Bombay Café & Kitchen

Spice Haven is a premium, full-stack web application designed to replicate the nostalgic culinary memories and grand hospitality of South Bombay cafés. It features a beautifully crafted, vintage-inspired frontend and a robust, secure backend.

## ✨ Features

- **Premium UI/UX:** A bespoke, vintage-themed design utilizing Tailwind CSS and Framer Motion for buttery-smooth micro-animations and page transitions.
- **Secure Authentication:** Full JWT-based user authentication system (Login/Register) using `bcrypt` for secure password hashing.
- **Persistent Database:** Integrated with **MongoDB Atlas** using Mongoose to reliably store user accounts, restaurant reviews, and booking ledgers.
- **Automated Reservations:** A seamless table booking system that requires authentication, pre-fills user data, and generates a personalized "Bronze Reservation Decree" upon success.
- **User Profiles:** A dedicated "My Bookings" dashboard where logged-in users can review all their past and upcoming dining reservations.
- **Anwar, The AI Sommelier:** An integrated Gemini AI assistant capable of recommending bespoke dishes based on mood/diet, designing full-course meal plans, and answering queries.

## 🛠️ Technology Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS, Lucide React (Icons), Motion (Animations)
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas, Mongoose
- **Security:** JSON Web Tokens (JWT), bcrypt
- **AI Integration:** Google Gemini API

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (Recommended) or npm

### 2. Environment Variables
Create a `.env` file in the root directory of the project and populate it with the following credentials:

```env
# Your MongoDB Atlas Connection String (Ensure special characters in password are URL-encoded)
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"

# A secure random string for signing JSON Web Tokens
JWT_SECRET="your_super_secret_jwt_key_here"

# Your Google AI Studio API Key for Anwar the AI Sommelier
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 3. Installation
Install the required dependencies for both frontend and backend:
```bash
pnpm install
```

### 4. Running the Application
Start the development server (which concurrently runs both the Vite frontend and Express backend using `tsx`):
```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

## 🎨 Design Philosophy
Spice Haven abandons generic aesthetics in favor of a rich, curated color palette (Brand Burgundy, Gold, Cream, Charcoal) and modern typography (Playfair Display, Inter, JetBrains Mono). Every interaction feels responsive, alive, and premium.

---
*Built with integrity, heritage spices, and live wood coals.*
