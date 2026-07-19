export type Language = 'en' | 'si' | 'ta';

export const translations = {
  en: {
    brand: "FinBridge",
    tagline: "AI-Based Personal Financial Health & Loan Risk Assessment Platform",
    taglineSub: "Empower your financial future with automated health scores, risk profiling, and AI recommendations.",
    getStarted: "Get Started",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    incomeManager: "Income Manager",
    expenseTracker: "Expense Tracker",
    loanTracker: "Existing Loan Tracker",
    goalPlanner: "Financial Goal Planner",
    literacyHub: "Financial Literacy Hub",
    adminConsole: "Admin Console",
    logout: "Logout",
    
    // Auth
    roleSelection: "Choose Your Role",
    borrower: "User (Client)",
    lender: "Lender / Auditor",
    admin: "Platform Administrator",
    authDescription: "Access the Next-Gen Personal Financial Health platform of Sri Lanka.",
    
    // Dashboard Cards
    financialScore: "Financial Health Score",
    loanRisk: "Loan Risk Profile",
    income: "Monthly Income",
    expenses: "Monthly Expenses",
    savings: "Monthly Savings",
    debtRatio: "Debt-to-Income (DTI) Ratio",
    goalProgress: "Goal Progress Rate",
    recommendations: "AI Personal Advice",
    
    // Income Manager
    addIncome: "Add Income Record",
    source: "Income Source",
    amount: "Amount (LKR)",
    date: "Record Date",
    incomeTrend: "Monthly Income Trend",
    
    // Expense Tracker
    addExpense: "Add Expense Record",
    category: "Expense Category",
    categoryBreakdown: "Category Breakdown",
    
    // Existing Loan Tracker
    addLoan: "Add Loan Record",
    loanName: "Loan / Creditor Name",
    remainingAmount: "Remaining Balance",
    emi: "Monthly EMI Payment",
    interestRate: "Interest Rate (%)",
    monthsLeft: "Months Left",
    totalPaid: "Total Paid To Date",
    nextEmiDate: "Next Due Date",
    
    // Goals
    addGoal: "Create Savings Goal",
    goalName: "Goal Description",
    target: "Target Amount (LKR)",
    current: "Current Saved Amount",
    targetDate: "Target Completion Date",
    
    // Literacy
    articles: "Educational Articles",
    quizTitle: "Financial Literacy Quiz",
    correct: "Correct Option!",
    incorrect: "Incorrect. Try again!",
    
    // Admin
    userStats: "User & System Statistics",
    usersList: "Registered System Users",
    scoresDistribution: "Financial Scores Distribution"
  },
  si: {
    brand: "FinBridge",
    tagline: "AI පාදක පුද්ගලික මූල්‍ය සෞඛ්‍ය සහ ණය අවදානම් තක්සේරුකරණ පද්ධතිය",
    taglineSub: "ස්වයංක්‍රීය මූල්‍ය සෞඛ්‍ය ලකුණු, අවදානම් පැතිකඩ සහ AI උපදෙස් සමඟ ඔබේ මූල්‍ය අනාගතය සවිබල ගන්වන්න.",
    getStarted: "ආරම්භ කරන්න",
    login: "ඇතුල් වන්න",
    register: "ලියාපදිංචි වන්න",
    dashboard: "පාලක පුවරුව",
    incomeManager: "ආදායම් කළමනාකරු",
    expenseTracker: "වියදම් ලුහුබැඳීම",
    loanTracker: "ණය ලුහුබැඳීම",
    goalPlanner: "මූල්‍ය ඉලක්ක සැලසුම්කරු",
    literacyHub: "මූල්‍ය සාක්ෂරතා කේන්ද්‍රය",
    adminConsole: "පරිපාලක පුවරුව",
    logout: "පිටවීම",
    
    // Auth
    roleSelection: "භූමිකාව තෝරන්න",
    borrower: "සාමාන්‍ය පරිශීලක",
    lender: "ණය දෙන්නා / විගණක",
    admin: "පරිපාලක",
    authDescription: "ශ්‍රී ලංකාවේ ප්‍රමුඛතම AI පුද්ගලික මූල්‍ය සෞඛ්‍ය පද්ධතියට පිවිසෙන්න.",
    
    // Dashboard Cards
    financialScore: "මූල්‍ය සෞඛ්‍ය ලකුණු",
    loanRisk: "ණය අවදානම් තක්සේරුව",
    income: "මාසික ආදායම",
    expenses: "මාසික වියදම",
    savings: "මාසික ඉතුරුම",
    debtRatio: "ණය-සිට-ආදායම් අනුපාතය (DTI)",
    goalProgress: "ඉලක්ක ප්‍රගති අනුපාතය",
    recommendations: "AI පුද්ගලික උපදෙස්",
    
    // Income Manager
    addIncome: "ආදායම් වාර්තාවක් එක් කරන්න",
    source: "ආදායම් මාර්ගය",
    amount: "මුදල (රු.)",
    date: "වාර්තාගත දිනය",
    incomeTrend: "මාසික ආදායම් ප්‍රවණතාවය",
    
    // Expense Tracker
    addExpense: "වියදම් වාර්තාවක් එක් කරන්න",
    category: "වියදම් කාණ්ඩය",
    categoryBreakdown: "වියදම් වර්ගීකරණය",
    
    // Existing Loan Tracker
    addLoan: "ණය වාර්තාවක් එක් කරන්න",
    loanName: "ණය හිමියාගේ නම",
    remainingAmount: "ඉතිරි ණය මුදල",
    emi: "මාසික EMI වාරිකය",
    interestRate: "පොලී අනුපාතය (%)",
    monthsLeft: "ඉතිරි මාස ගණන",
    totalPaid: "මේ දක්වා ගෙවූ මුළු මුදල",
    nextEmiDate: "මීළඟ ගෙවිය යුතු දිනය",
    
    // Goals
    addGoal: "ඉතුරුම් ඉලක්කයක් සාදන්න",
    goalName: "ඉලක්කයේ විස්තරය",
    target: "ඉලක්කගත මුදල (රු.)",
    current: "දැනට ඉතිරි කර ඇති මුදල",
    targetDate: "අවසන් කළ යුතු දිනය",
    
    // Literacy
    articles: "අධ්‍යාපනික ලිපි",
    quizTitle: "මූල්‍ය සාක්ෂරතා ප්‍රශ්නාවලිය",
    correct: "නිවැරදි පිළිතුරයි!",
    incorrect: "වැරදියි. නැවත උත්සාහ කරන්න!",
    
    // Admin
    userStats: "පරිශීලක සහ පද්ධති සංඛ්‍යාලේඛන",
    usersList: "ලියාපදිංචි පරිශීලකයින්",
    scoresDistribution: "මූල්‍ය ලකුණු ව්‍යාප්තිය"
  },
  ta: {
    brand: "FinBridge",
    tagline: "AI-அடிப்படையிலான தனிநபர் நிதி ஆரோக்கியம் & கடன் அபாய மதிப்பீட்டு தளம்",
    taglineSub: "தானியங்கி சுகாதார மதிப்பெண்கள், அபாய விவரங்கள் மற்றும் AI பரிந்துரைகளுடன் உங்கள் நிதி எதிர்காலத்தை மேம்படுத்துங்கள்.",
    getStarted: "தொடங்குங்கள்",
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    dashboard: "டாஷ்போர்டு",
    incomeManager: "வருமான மேலாளர்",
    expenseTracker: "செலவு கண்காணிப்பாளர்",
    loanTracker: "கடன் கண்காணிப்பாளர்",
    goalPlanner: "நிதி இலக்கு திட்டமிடுபவர்",
    literacyHub: "நிதி அறிவு மையம்",
    adminConsole: "நிர்வாகி கன்சோல்",
    logout: "வெளியேறு",
    
    // Auth
    roleSelection: "உங்கள் பாத்திரத்தை தேர்வு செய்யவும்",
    borrower: "பயனர் (வாடிக்கையாளர்)",
    lender: "கடன் வழங்குபவர் / தணிக்கையாளர்",
    admin: "தள நிர்வாகி",
    authDescription: "இலங்கையின் மேம்பட்ட தனிநபர் நிதி ஆரோக்கிய தளத்தை அணுகவும்.",
    
    // Dashboard Cards
    financialScore: "நிதி சுகாதார மதிப்பெண்",
    loanRisk: "கடன் அபாய மதிப்பீடு",
    income: "மாதாந்திர வருமானம்",
    expenses: "மாதாந்திர செலவுகள்",
    savings: "மாதாந்திர சேமிப்பு",
    debtRatio: "கடன்-வருமான விகிதம் (DTI)",
    goalProgress: "இலக்கு முன்னேற்றம்",
    recommendations: "AI தனிப்பட்ட ஆலோசனைகள்",
    
    // Income Manager
    addIncome: "வருமான பதிவைச் சேர்",
    source: "வருமான ஆதாரம்",
    amount: "தொகை (LKR)",
    date: "பதிவு செய்யப்பட்ட தேதி",
    incomeTrend: "மாதாந்திர வருமான போக்கு",
    
    // Expense Tracker
    addExpense: "செலவு பதிவைச் சேர்",
    category: "செலவு வகை",
    categoryBreakdown: "செலவு பகுப்பாய்வு",
    
    // Existing Loan Tracker
    addLoan: "கடன் பதிவைச் சேர்",
    loanName: "கடன் பெயர்",
    remainingAmount: "மீதமுள்ள கடன் தொகை",
    emi: "மாதாந்திர EMI தவணை",
    interestRate: "வட்டி விகிதம் (%)",
    monthsLeft: "மீதமுள்ள மாதங்கள்",
    totalPaid: "இதுவரை செலுத்தப்பட்ட மொத்த தொகை",
    nextEmiDate: "அடுத்த செலுத்த வேண்டிய தேதி",
    
    // Goals
    addGoal: "சேமிப்பு இலக்கை உருவாக்கு",
    goalName: "இலக்கு விளக்கம்",
    target: "இலக்கு தொகை (LKR)",
    current: "தற்போதைய சேமிப்பு தொகை",
    targetDate: "இலக்கு முடிவு தேதி",
    
    // Literacy
    articles: "கல்வி கட்டுரைகள்",
    quizTitle: "நிதி அறிவு வினாடி வினா",
    correct: "சரியான விடை!",
    incorrect: "தவறான விடை. மீண்டும் முயற்சிக்கவும்!",
    
    // Admin
    userStats: "பயனர் மற்றும் கணினி புள்ளிவிவரங்கள்",
    usersList: "பதிவுசெய்யப்பட்ட பயனர்கள்",
    scoresDistribution: "நிதி மதிப்பெண் விநியோகம்"
  }
};
