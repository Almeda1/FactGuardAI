# FactGuard — AI Misinformation Detector

FactGuard is a sophisticated full-stack application designed to combat misinformation by analyzing headlines and news articles using advanced AI models. It provides users with an immediate credibility assessment, highlighting potential bias, factual inaccuracies, and logical fallacies in a clean, journalistic interface.

## 🚨 Project Overview

FactGuard serves as a "digital news desk" where users can submit articles for verification. The system uses a multi-layered AI approach to cross-reference claims and analyze tone, returning a "Verdict" (Verified, Uncertain, or Fake) along with a confidence score and detailed breakdown.

### Key Features

-   **Multi-Model AI Analysis**: Robust backend that attempts analysis via multiple LLMs (Llama 3.3, GPT-OSS, Nemotron) to ensure availability and accuracy even during high traffic or rate limits.
-   **Journalistic "Wizard" Interface**: A step-by-step editorial workflow (Draft → Review → Report) designed to mimic a professional newsroom environment.
-   **Detailed Credibility Reports**:
    -   **Verdict Badges**: Clear visual indicators of article truthfulness.
    -   **Confidence Gauge**: Quantitative scoring of the AI's certainty.
    -   **Flagged Issues**: Specific highlighting of clickbait titles, logical fallacies, or lack of citations.
-   **Thematic Design**:
    -   **Typography**: Merriweather (Serif) headers for an authoritative editorial feel, paired with Inter (Sans) for readability.
    -   **Dark/Light Mode**: "Late Night Desk" (Dark) vs. "Newspaper" (Light) themes.
    -   **Paper Textures**: Subtle grain and grid patterns to enhance the investigative aesthetic.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest) (for API state)
-   **Icons**: [Lucide React](https://lucide.dev/)

### Backend
-   **Runtime**: Node.js
-   **Framework**: [Express.js](https://expressjs.com/)
-   **AI Integration**: [OpenRouter API](https://openrouter.ai/) (Aggregating Llama 3, Mistral, etc.)
-   **Validation**: [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm or bun
-   An OpenRouter API Key (for the backend)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/veritas-ai-dashboard.git
    cd veritas-ai-dashboard
    ```

2.  **Install dependencies**
    
    *Root (Frontend)*:
    ```bash
    npm install
    ```
    
    *Server (Backend)*:
    ```bash
    cd server
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the **server** directory:
    ```env
    OPENROUTER_API_KEY=your_openrouter_api_key_here
    PORT=3001
    ```

### Running the Application

This is a full-stack application requiring both the frontend and backend to run simultaneously.

1.  **Start the Backend Server**
    ```bash
    cd server
    npm run dev
    # Runs on http://localhost:3001
    ```

2.  **Start the Frontend Development Server** (in a new terminal)
    ```bash
    # From project root
    npm run dev
    # Runs on http://localhost:8080
    ```

3.  Open your browser to `http://localhost:8080` to start investigating articles.

## 🧪 Architecture

### AI Fallback Strategy
The backend (`server/llm.ts`) implements a robust fallback mechanism. If the primary model is rate-limited (429) or unavailable:
1.  **Primary**: `meta-llama/llama-3.3-70b-instruct`
2.  **Fallback 1**: `openai/gpt-oss-120b`
3.  **Fallback 2**: `nvidia/nemotron-nano-9b-v2`
4.  **Fallback 3**: `stepfun/step-3.5-flash`

This ensures high reliability for verifications without requiring expensive enterprise plans.

### Project Structure
```
├── src/
│   ├── components/      # React UI components (Dashboard, Input, Badge)
│   ├── hooks/           # Custom React hooks (use-analysis)
│   ├── pages/           # Page layouts (Index, NotFound)
│   └── lib/             # Utilities and API clients
├── server/
│   ├── index.ts         # Express server entry point
│   ├── llm.ts           # AI model interaction logic
│   └── prompt.ts        # System prompts for analysis
└── public/              # Static assets
```

## 🤝 Contribution

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
