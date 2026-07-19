# FinBridge — AI-Based Microfinance & Digital Wallet

FinBridge is an AI-powered microfinance platform, digital wallet, and alternative loan risk assessment solution designed for underserved and micro-entrepreneurial communities in Sri Lanka.

By utilizing non-traditional socio-financial inputs (e.g. utility payment timeliness, local self-help society peer ratings, agricultural savings behavior), the platform generates transparent alternative credit scoring vectors (300 - 850) that lower credit constraints and dynamic interest rates.

---

## 🚀 Key Features

1. **Trilingual Localization (Sinhala, English, Tamil)**: Full application-level language switcher interface.
2. **LKR Currency Context**: Localized agricultural and micro-credit financial products denominated in Sri Lankan Rupees (₨).
3. **AI Alternative Credit Scoring**: Multi-factor scoring engine with radar charts, risk category banding, and a live "What-If" parameter simulator.
4. **Digital Mobile Wallet**: Balance display, QR/phone peer transfers, utility top-ups (CEB, Water Board, SLT Mobitel) and Recharts spending category analytics.
5. **Microfinance Marketplace**: Products tailored to farmers, home-businesses, vocational training, and fisheries (e.g. Diriya Farmer Loan).
6. **Active Loan & Repayments**: EMI tracking and scheduler with simulated one-click repayment.
7. **Grameen Group Lending Framework**: Joint liability model description lowering rates via social trust bonds.
8. **Multi-Role Dashboards**:
   - **Borrower**: Standard user portal with savings goals, insights, and actions.
   - **Lender / Investor**: Deploy capital, check portfolios, returns, and NPL ratios.
   - **Admin / Risk Auditor**: Action approval queues, investigate fraud anomaly logs, and track precision metrics.

---

## 🛠️ Technology Stack

- **Core**: Next.js 14 (App Router) + TypeScript
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts / UI**: Recharts + Tailwind CSS
- **Icons**: Lucide React
- **Design Base**: Google Inter & Space Grotesk typography

---

## 📁 File Structure

```
finbridge/
├── app/
│   ├── (auth)/login/page.tsx       # Secure Login view
│   ├── (auth)/register/page.tsx    # Secure Sign up view
│   ├── (dashboard)/                # Secured Views Group
│   │   ├── dashboard/page.tsx      # Borrower Dashboard
│   │   ├── wallet/page.tsx         # Digital Wallet
│   │   ├── loans/page.tsx          # Loan Marketplace & EMI calc
│   │   ├── risk-assessment/page.tsx# AI scoring, Radar & Sliders
│   │   ├── lender/page.tsx         # Portfolios & yields
│   │   ├── admin/page.tsx          # Approval queues & fraud
│   │   └── profile/page.tsx        # Settings & preferences
│   ├── layout.tsx                  # Global fonts & wrappers
│   └── page.tsx                    # Premium trilingual Landing
├── components/
│   └── layout/
│       ├── Navbar.tsx              # Top bar, role selector, language toggler
│       ├── Sidebar.tsx             # Left side navigation menu
│       ├── MobileNav.tsx           # Mobile responsive bottom navigation
│       ├── AppLayout.tsx           # Page shell selector
│       └── chatbot/
│           └── ChatBubble.tsx      # Floating AI Assistant
├── lib/
│   ├── ai-engine.ts                # Scoring algorithms
│   ├── i18n.ts                     # Sinhala/English/Tamil dictionaries
│   ├── mock-data.ts                # SL tailored products & datasets
│   └── store.ts                    # Global Zustand store
├── vercel.json                     # Vercel deployment config
└── package.json                    # Project configuration
```

---

## 💻 Local Execution

Follow these steps to run the application locally on your computer:

1. Clone or download this project.
2. Install npm dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Boot up the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) inside your web browser.

---

## ☁️ Deploying on Vercel

This project is configured with `vercel.json` for one-click deployment.

1. Install the Vercel CLI: `npm install -g vercel`.
2. Execute `vercel` in the project root directory and follow instructions.
3. Once completed, your live production build link is ready!
