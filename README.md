# SiteSpark AI

**From Prompt to Website.**

SiteSpark AI is an AI-powered website generation platform that transforms simple text descriptions into beautiful, fully functional websites in seconds. Inspired by modern AI development tools, it provides a seamless experience for creating, editing, and exporting websites using natural language.

## Features

- **AI-Powered Generation**: Transform your ideas into complete websites using advanced AI technology
- **Live Preview**: See your website come to life in real-time with desktop and mobile view modes
- **Iterative Editing**: Refine your website with follow-up prompts using natural language
- **Code Export**: Download production-ready HTML, CSS, and JavaScript code
- **Project Management**: Save, load, and manage multiple projects
- **Responsive Design**: Every generated website is fully responsive
- **Modern UI**: Professional dark theme with violet/indigo accent colors

## Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Google Gemini API** - AI generation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** (comes with Node.js)
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## Environment Configuration

The project uses a single `.env` file in the project root directory for all configuration. This file is excluded from Git for security.

Create or edit the `.env` file in the project root:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username@localhost:5432/sitespark

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Client Configuration
VITE_API_URL=http://localhost:5000
```

**Important**: Replace `username` and `your_gemini_api_key_here` with your actual values.

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Site-Builder
```

### 2. Install Dependencies

Install all dependencies using the root package.json:

```bash
npm run install:all
```

Or install separately:

```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

### 3. Database Setup

Create a PostgreSQL database named `sitespark`:

```sql
CREATE DATABASE sitespark;
```

Initialize the database schema:

```bash
npm run init-db
```

This will create the necessary tables for storing projects.

## Running the Application

### Start the Backend

In the `server` directory:

```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### Start the Frontend

In a new terminal, navigate to the `client` directory:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

**Note**: Both frontend and backend read environment variables from the single `.env` file in the project root directory. The backend loads it explicitly, and Vite is configured to look in the parent directory.

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## Usage

### Creating a New Website

1. On the landing page, enter a description of the website you want to build
   - Example: "Create a modern portfolio website for a software developer with a hero section, skills, projects, and contact form"

2. Click "Generate Website" or press Enter

3. Wait for the AI to generate your website (this may take 30-60 seconds)

4. View the generated website in the preview panel

### Editing Your Website

1. In the builder workspace, use the conversation panel on the left
2. Enter a follow-up prompt to make changes
   - Example: "Change the color scheme to dark blue and add a testimonials section"
3. Click "Generate" to apply the changes

### Viewing Code

1. Click the "Code" button in the top navigation
2. Switch between HTML, CSS, and JavaScript tabs
3. Copy code using the "Copy" button

### Exporting Your Website

1. Click the "Export" button in the top navigation
2. This will download three files: `index.html`, `styles.css`, and `script.js`
3. Open `index.html` in a browser to view your website offline

### Saving Projects

1. Click the "Save" button in the top navigation
2. The project will be saved to the database
3. Access saved projects from the "My Projects" page

### Managing Projects

1. Navigate to "My Projects" from the footer
2. View all your saved projects
3. Open a project to continue editing
4. Delete projects you no longer need

## API Endpoints

### Generate Website
- **POST** `/api/generate`
- Body: `{ prompt: string, existingCode?: object }`
- Response: `{ success: boolean, html: string, css: string, javascript: string }`

### Projects
- **POST** `/api/projects` - Create a new project
- **GET** `/api/projects` - List all projects
- **GET** `/api/projects/:id` - Get a specific project
- **PUT** `/api/projects/:id` - Update a project
- **DELETE** `/api/projects/:id` - Delete a project

## Troubleshooting

### Database Connection Issues

If you see "connection refused" or "database does not exist":

1. Ensure PostgreSQL is running
2. Verify the database name in `DATABASE_URL` matches your actual database
3. Check your username and password are correct
4. Run `npm run init-db` to recreate tables

### API Key Issues

If you see "Invalid API key" or authentication errors:

1. Verify your Gemini API key is correct in `.env`
2. Ensure your API key has credits/usage available
3. Check that you're using the correct model name

### CORS Errors

If you see CORS errors in the browser console:

1. Verify `FRONTEND_URL` in server `.env` matches your frontend URL
2. Ensure both frontend and backend are running
3. Check that the port numbers are correct

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure Node.js version is 18 or higher

### Frontend Not Connecting to Backend

1. Check that `VITE_API_URL` in client `.env` is correct
2. Verify the backend is running on the specified port
3. Check browser console for specific error messages

## Project Structure

```
Site-Builder/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── sections/       # Landing page sections
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (AI service)
│   │   ├── db/             # Database configuration
│   │   └── index.js        # Server entry point
│   └── package.json
└── README.md
```

## Security Notes

- **API Keys**: Never commit `.env` files or expose API keys in frontend code. The Gemini API key is only used on the server.
- **Generated Code**: All generated code runs in a sandboxed iframe for security
- **Database**: Use parameterized queries to prevent SQL injection
- **CORS**: CORS is configured to only allow requests from your frontend URL
- **Environment Configuration**: The project uses a single `.env` file in the root directory, which is excluded from Git via `.gitignore`

## License

MIT License - Built by Suhana Mirasab Pendhari

## Support

For issues, questions, or contributions, please refer to the project repository.
