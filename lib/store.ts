import { create } from 'zustand';
import { Language } from './i18n';

export interface IncomeRecord {
  id: string;
  source: string;
  amount: number;
  date: string;
}

export interface ExpenseRecord {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export interface LoanRecord {
  id: string;
  loanName: string;
  remainingAmount: number;
  monthlyEmi: number;
  interestRate: number;
  startDate: string;
  endDate: string;
}

export interface GoalRecord {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

interface AppState {
  language: Language;
  role: 'borrower' | 'lender' | 'admin';
  theme: 'dark' | 'dim' | 'light';
  user: {
    name: string;
    phone: string;
    avatar: string;
  };
  
  // CRUD Data Lists
  incomeRecords: IncomeRecord[];
  expenseRecords: ExpenseRecord[];
  loanRecords: LoanRecord[];
  goals: GoalRecord[];
  
  // Model state variables
  financialScore: number;
  loanRisk: 'Low' | 'Medium' | 'High';
  recommendations: string[];

  setLanguage: (lang: Language) => void;
  setRole: (role: 'borrower' | 'lender' | 'admin') => void;
  setTheme: (theme: 'dark' | 'dim' | 'light') => void;
  
  // CRUD Actions
  addIncome: (rec: Omit<IncomeRecord, 'id'>) => void;
  deleteIncome: (id: string) => void;
  
  addExpense: (rec: Omit<ExpenseRecord, 'id'>) => void;
  deleteExpense: (id: string) => void;
  
  addLoan: (rec: Omit<LoanRecord, 'id'>) => void;
  deleteLoan: (id: string) => void;
  
  addGoal: (rec: Omit<GoalRecord, 'id'>) => void;
  deleteGoal: (id: string) => void;
  updateGoalAmount: (id: string, amount: number) => void;

  recalculateAIEngines: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  language: 'en',
  role: 'borrower',
  theme: 'light',
  user: {
    name: 'Rashminda Aluvihare',
    phone: '+94 77 123 4567',
    avatar: '/avatar-profile.jpg'
  },
  
  // Pre-populate with mock data mapping to spec values
  incomeRecords: [
    { id: "inc-1", source: "Salary", amount: 120000, date: "2026-07-01" },
    { id: "inc-2", source: "Freelancing", amount: 25000, date: "2026-07-15" }
  ],
  expenseRecords: [
    { id: "exp-1", category: "Food", amount: 15000, date: "2026-07-02" },
    { id: "exp-2", category: "Bills", amount: 25000, date: "2026-07-05" },
    { id: "exp-3", category: "Transport", amount: 8000, date: "2026-07-10" },
    { id: "exp-4", category: "Shopping", amount: 12000, date: "2026-07-12" }
  ],
  loanRecords: [
    { id: "loan-1", loanName: "Personal Bank Loan", remainingAmount: 240000, monthlyEmi: 15000, interestRate: 12, startDate: "2025-01-01", endDate: "2027-01-01" },
    { id: "loan-2", loanName: "Credit Card Debt", remainingAmount: 45000, monthlyEmi: 5000, interestRate: 24, startDate: "2026-03-01", endDate: "2026-12-01" }
  ],
  goals: [
    { id: "goal-1", name: "Emergency Fund Setup", targetAmount: 500000, currentAmount: 120000, targetDate: "2027-12-31" },
    { id: "goal-2", name: "Buy Agricultural Land", targetAmount: 1200000, currentAmount: 180000, targetDate: "2029-06-30" }
  ],
  
  financialScore: 82,
  loanRisk: 'Medium',
  recommendations: [
    "Reduce monthly shopping expenses by 15% to increase savings velocity.",
    "Prioritize paying off the credit card debt first to escape the 24% high interest rate.",
    "Build emergency fund savings to cover at least 3 months of EMI payments."
  ],

  setLanguage: (lang) => set({ language: lang }),
  setRole: (role) => set({ role: role }),
  setTheme: (theme) => set({ theme: theme }),

  addIncome: (rec) => {
    const newRec = { ...rec, id: `inc-${Date.now()}` };
    set((state) => ({ incomeRecords: [newRec, ...state.incomeRecords] }));
    get().recalculateAIEngines();
  },
  deleteIncome: (id) => {
    set((state) => ({ incomeRecords: state.incomeRecords.filter(r => r.id !== id) }));
    get().recalculateAIEngines();
  },

  addExpense: (rec) => {
    const newRec = { ...rec, id: `exp-${Date.now()}` };
    set((state) => ({ expenseRecords: [newRec, ...state.expenseRecords] }));
    get().recalculateAIEngines();
  },
  deleteExpense: (id) => {
    set((state) => ({ expenseRecords: state.expenseRecords.filter(r => r.id !== id) }));
    get().recalculateAIEngines();
  },

  addLoan: (rec) => {
    const newRec = { ...rec, id: `loan-${Date.now()}` };
    set((state) => ({ loanRecords: [newRec, ...state.loanRecords] }));
    get().recalculateAIEngines();
  },
  deleteLoan: (id) => {
    set((state) => ({ loanRecords: state.loanRecords.filter(r => r.id !== id) }));
    get().recalculateAIEngines();
  },

  addGoal: (rec) => {
    const newRec = { ...rec, id: `goal-${Date.now()}` };
    set((state) => ({ goals: [newRec, ...state.goals] }));
  },
  deleteGoal: (id) => {
    set((state) => ({ goals: state.goals.filter(r => r.id !== id) }));
  },
  updateGoalAmount: (id, amount) => {
    set((state) => ({
      goals: state.goals.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g)
    }));
  },

  // Auto AI scoring client calculations to make sliders interactively alive
  recalculateAIEngines: () => {
    const state = get();
    const totalIncome = state.incomeRecords.reduce((sum, r) => sum + r.amount, 0);
    const totalExpenses = state.expenseRecords.reduce((sum, r) => sum + r.amount, 0);
    const totalEmi = state.loanRecords.reduce((sum, r) => sum + r.monthlyEmi, 0);
    const totalSavings = state.goals.reduce((sum, r) => sum + r.currentAmount, 0);

    const dti = totalIncome > 0 ? (totalEmi / totalIncome) : 0;
    const savingsRatio = totalIncome > 0 ? (totalSavings / totalIncome) : 0;
    
    // Simulate score mapping (0 - 100)
    let score = 75;
    if (dti > 0.40) score -= 15;
    else if (dti < 0.20) score += 10;

    if (totalExpenses > totalIncome) score -= 20;
    else if (totalExpenses < totalIncome * 0.6) score += 10;

    score = Math.min(100, Math.max(10, score));

    // Risk mapping
    const risk = score >= 80 ? 'Low' : score >= 50 ? 'Medium' : 'High';

    // Recommendations mapping
    const recs = [];
    if (dti > 0.35) recs.push("Avoid taking another loan. Debt Ratio is high.");
    if (totalExpenses > totalIncome) recs.push("Immediately reduce discretionary expenses to cover monthly budget gap.");
    if (totalSavings < 100000) recs.push("Increase emergency savings to build safety net buffers.");
    if (recs.length === 0) recs.push("Financial parameters are stable. Maintain consistent savings patterns.");

    set({
      financialScore: score,
      loanRisk: risk,
      recommendations: recs
    });
  }
}));
