import { create } from 'zustand';
import { Language } from './i18n';
import { Transaction, ActiveLoan, mockTransactions, mockActiveLoans, LoanProduct, mockLoanProducts } from './mock-data';

interface AppState {
  language: Language;
  role: 'borrower' | 'lender' | 'admin';
  user: {
    name: string;
    phone: string;
    avatar: string;
  };
  walletBalance: number;
  transactions: Transaction[];
  activeLoans: ActiveLoan[];
  savingsGoals: {
    id: string;
    name: string;
    nameSi: string;
    nameTa: string;
    target: number;
    current: number;
  }[];
  adminApprovalQueue: {
    id: string;
    borrowerName: string;
    loanProduct: string;
    amount: number;
    score: number;
    risk: 'Low' | 'Medium' | 'High' | 'Very High';
  }[];
  theme: 'dark' | 'dim' | 'light';
  
  setLanguage: (lang: Language) => void;
  setRole: (role: 'borrower' | 'lender' | 'admin') => void;
  setTheme: (theme: 'dark' | 'dim' | 'light') => void;
  topUpWallet: (amount: number) => void;
  sendMoney: (amount: number, recipientPhone: string, noteEn: string, noteSi: string, noteTa: string, category: 'Farming' | 'Business' | 'Medical' | 'Education' | 'Utility' | 'Personal') => boolean;
  applyForLoan: (amount: number, productName: string, productNameSi: string, productNameTa: string, interestRate: number, tenure: number) => void;
  repayLoanInstallment: (loanId: string) => boolean;
  approveLoanInQueue: (queueId: string) => void;
  rejectLoanInQueue: (queueId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  language: 'en',
  role: 'borrower',
  theme: 'dark',
  user: {
    name: 'Rashminda Aluvihare',
    phone: '+94 77 123 4567',
    avatar: '/avatar-profile.jpg'
  },
  walletBalance: 132500,
  transactions: mockTransactions,
  activeLoans: mockActiveLoans,
  savingsGoals: [
    {
      id: "goal-1",
      name: "Smart Drip Irrigation System Fund",
      nameSi: "ස්මාර්ට් බිංදු ජල සම්පාදන අරමුදල",
      nameTa: "சொட்டு நீர் பாசன அமைப்பு நிதி",
      target: 120000,
      current: 45000
    },
    {
      id: "goal-2",
      name: "Children Vocational Education Fund",
      nameSi: "දරුවන්ගේ වෘත්තීය අධ්‍යාපන අරමුදල",
      nameTa: "பிள்ளைகளின் தொழிற்கல்வி நிதி",
      target: 60000,
      current: 35000
    }
  ],
  adminApprovalQueue: [
    {
      id: "q-1",
      borrowerName: "Bandara Rambukwella",
      loanProduct: "Diriya Farmer Micro-Loan",
      amount: 45000,
      score: 720,
      risk: "Medium"
    },
    {
      id: "q-2",
      borrowerName: "K. Selvakumar",
      loanProduct: "Jaffna Fishery Expansion Fund",
      amount: 90000,
      score: 590,
      risk: "High"
    }
  ],
  
  setLanguage: (lang) => set({ language: lang }),
  setRole: (role) => set({ role: role }),
  setTheme: (theme) => set({ theme: theme }),
  topUpWallet: (amount) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'topup',
      amount: amount,
      reference: 'Simulated Wallet Top-Up',
      referenceSi: 'පසුම්බි මුදල් පිරවීම',
      referenceTa: 'வாலட் டாப்-அப்',
      category: 'System'
    };
    set((state) => ({
      walletBalance: state.walletBalance + amount,
      transactions: [newTx, ...state.transactions]
    }));
  },
  sendMoney: (amount, recipientPhone, noteEn, noteSi, noteTa, category) => {
    const state = get();
    if (state.walletBalance < amount) return false;
    
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'transfer_out',
      amount: amount,
      reference: `${noteEn} (${recipientPhone})`,
      referenceSi: `${noteSi} (${recipientPhone})`,
      referenceTa: `${noteTa} (${recipientPhone})`,
      category: category
    };
    
    set({
      walletBalance: state.walletBalance - amount,
      transactions: [newTx, ...state.transactions]
    });
    return true;
  },
  applyForLoan: (amount, productName, productNameSi, productNameTa, interestRate, tenure) => {
    const state = get();
    // Simulate auto-adding to admin approval queue
    const newQueueItem = {
      id: `q-${Date.now()}`,
      borrowerName: state.user.name,
      loanProduct: productName,
      amount: amount,
      score: 745, // Precheck mock score
      risk: "Low" as const
    };
    set({
      adminApprovalQueue: [newQueueItem, ...state.adminApprovalQueue]
    });
  },
  repayLoanInstallment: (loanId) => {
    const state = get();
    const loan = state.activeLoans.find(l => l.id === loanId);
    if (!loan) return false;
    if (state.walletBalance < loan.nextPaymentAmount) return false;
    
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'repayment',
      amount: loan.nextPaymentAmount,
      reference: `EMI Paid for ${loan.productName}`,
      referenceSi: `${loan.productNameSi} සදහා EMI වාරිකය ගෙවන ලදී`,
      referenceTa: `${loan.productNameTa} க்கான தவணை செலுத்தப்பட்டது`,
      category: 'System'
    };
    
    const updatedLoans = state.activeLoans.map(l => {
      if (l.id === loanId) {
        const remaining = Math.max(0, l.remainingAmount - l.nextPaymentAmount);
        const nextPaid = l.paidInstallments + 1;
        return {
          ...l,
          remainingAmount: remaining,
          paidInstallments: nextPaid,
        };
      }
      return l;
    }).filter(l => l.remainingAmount > 0);
    
    set({
      walletBalance: state.walletBalance - loan.nextPaymentAmount,
      transactions: [newTx, ...state.transactions],
      activeLoans: updatedLoans
    });
    return true;
  },
  approveLoanInQueue: (queueId) => {
    const state = get();
    const loanToApprove = state.adminApprovalQueue.find(q => q.id === queueId);
    if (!loanToApprove) return;
    
    // Add transaction for disbursement
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'disbursement',
      amount: loanToApprove.amount,
      reference: `Approved: ${loanToApprove.loanProduct}`,
      referenceSi: `අනුමතයි: ${loanToApprove.loanProduct}`,
      referenceTa: `அனுமதிக்கப்பட்டது: ${loanToApprove.loanProduct}`,
      category: 'Business'
    };
    
    // Add to active loans
    const newActiveLoan: ActiveLoan = {
      id: `active-${Date.now()}`,
      productName: loanToApprove.loanProduct,
      productNameSi: loanToApprove.loanProduct, // Simplified mapping
      productNameTa: loanToApprove.loanProduct,
      amount: loanToApprove.amount,
      remainingAmount: loanToApprove.amount * 1.12, // +12% interest for simulated simplicity
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      interestRate: 12,
      nextPaymentAmount: Math.round((loanToApprove.amount * 1.12) / 12),
      paidInstallments: 0,
      totalInstallments: 12
    };
    
    set({
      walletBalance: state.walletBalance + loanToApprove.amount,
      transactions: [newTx, ...state.transactions],
      activeLoans: [...state.activeLoans, newActiveLoan],
      adminApprovalQueue: state.adminApprovalQueue.filter(q => q.id !== queueId)
    });
  },
  rejectLoanInQueue: (queueId) => {
    set((state) => ({
      adminApprovalQueue: state.adminApprovalQueue.filter(q => q.id !== queueId)
    }));
  }
}));
