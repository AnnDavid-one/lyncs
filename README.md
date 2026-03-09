## Lyncs Finance Dashboard

A professional, responsive personal finance tracker built with Next.js 15, TypeScript, and Shadcn UI. This application allows users to manage their monthly budgets, track income/expenses, and visualize their spending habits—all with local persistence.

🚀 Features
Real-time Analytics: Dynamic calculation of Total Balance, Monthly Income, and Monthly Expenses.

Budget Tracking: Interactive progress bar showing budget utilization with "Over/Under" status indicators.

Data Visualization: High-fidelity Bar Charts powered by Recharts to compare daily income vs. expenses.

Persistent Storage: Full integration with localStorage to ensure data remains available across browser sessions.

Smart "Cold Start": Automatically seeds the dashboard with initial data if no records are found, ensuring a polished first-user experience.

Responsive Design: Fully optimized for Mobile, Tablet, and Desktop layouts.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn UI (Radix UI primitives)

Charts: Recharts

Icons: Lucide React

Date Formatting: date-fns

🏗️ Architecture Choices

1. Custom Hook Pattern (useFinance)
   Instead of cluttering UI components with business logic, I implemented a centralized useFinance hook. This manages all CRUD operations (Create, Read, Update, Delete) for transactions and budgets, utilizing useMemo for high-performance financial calculations.

2. Modular Component Structure
   The project follows a strict Single Responsibility Principle (SRP). The Dashboard is broken down into:

StatCards: Summary metrics and action triggers.

ChartSection: Isolated data visualization logic.

TransactionHistory: Detailed tabular view of data.

3. Local-First Persistence
   To meet the "No-Database" requirement while maintaining a "Real App" feel, I built a robust localStorage sync layer that mirrors the application state to the browser’s storage.

🚦 Getting Started
Clone the repository:

Bash

git clone <https://github.com/AnnDavid-one/lyncs.git>
Install dependencies:

Bash

npm install
Run the development server:

Bash

npm run dev
Build for production:

Bash

npm run build
📝 Assumptions & Notes
Single User: Designed for a single-user local environment.

Browser Storage: Persistence is tied to the specific browser/device used.

Currency: Defaulted to USD ($) for this assessment.

## 🛠️ Technical Challenges & Solutions

### 1. Build-Time Syntax Error (Radix UI / Next.js)

- **The Issue:** `next build` failed during "Collecting page data" with `SyntaxError: missing ) after argument list`.
- **The Cause:** A bug in the Radix UI primitive error logger. Even with `"use client"`, Next.js pre-renders components during the build. If a component (like `Progress`) received `NaN` or `undefined` before hydration, the library's internal error-handling string was malformed, crashing the Node.js build process.
- **The Solution:** Implemented **Dynamic Imports** with `ssr: false` for the `Dashboard` components. This bypasses the server-side pre-rendering for these specific UI elements, ensuring the build succeeds.

### 2. LocalStorage Hydration Mismatch

- **The Issue:** Data would not persist or would cause hydration warnings when reopening the browser.
- **The Cause:** Next.js server-side HTML did not match the client-side state because `localStorage` is only available in the browser.
- **The Solution:** Added a `mounted` state guard using `useEffect`. This ensures the application only attempts to read from `localStorage` and seed dummy data once it is safely running in the browser.

## 📖 Usage

1.  **Get Started**: On your first visit, the dashboard will automatically seed with a "Salary" transaction so you can see the charts in action.
2.  **Add Transactions**: Click the **"Add Transaction"** button in the Total Balance card. Fill in the amount, category (Income/Expense), and description.
3.  **Manage Budget**: Click the **"Update Budget"** button in the Budget card to set your monthly spending limit. The progress bar will turn red if you exceed this limit.
4.  **Reset Data**: Use the **"Clear All Data"** button to wipe your local storage and start with a fresh, empty dashboard.
