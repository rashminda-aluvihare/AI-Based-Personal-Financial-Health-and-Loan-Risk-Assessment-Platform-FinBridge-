export interface LoanProduct {
  id: string;
  name: string;
  nameSi: string;
  nameTa: string;
  description: string;
  descriptionSi: string;
  descriptionTa: string;
  minAmount: number;
  maxAmount: number;
  defaultRate: number;
  tenureMonths: number;
  category: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'disbursement' | 'repayment' | 'transfer_out' | 'transfer_in' | 'topup' | 'utility';
  amount: number;
  reference: string;
  referenceSi: string;
  referenceTa: string;
  category: 'Farming' | 'Business' | 'Medical' | 'Education' | 'Utility' | 'Personal' | 'System';
}

export interface ActiveLoan {
  id: string;
  productName: string;
  productNameSi: string;
  productNameTa: string;
  amount: number;
  remainingAmount: number;
  nextPaymentDate: string;
  interestRate: number;
  nextPaymentAmount: number;
  paidInstallments: number;
  totalInstallments: number;
}

export interface BorrowerProfile {
  id: string;
  name: string;
  location: string;
  purpose: string;
  amount: number;
  score: number;
  riskCategory: 'Low' | 'Medium' | 'High' | 'Very High';
  interestRate: number;
}

export interface ChatbotResponse {
  keywords: string[];
  responseEn: string;
  responseSi: string;
  responseTa: string;
}

export const mockLoanProducts: LoanProduct[] = [
  {
    id: "prod-1",
    name: "Diriya Farmer Micro-Loan",
    nameSi: "දිරිය ගොවි ක්ෂුද්‍ර ණය",
    nameTa: "திரிய விவசாய நுண்கடன்",
    description: "Low-interest loans specifically for seeds, fertilizers, and agricultural tools in Sri Lanka.",
    descriptionSi: "ශ්‍රී ලංකාවේ බීජ, පොහොර සහ කෘෂිකාර්මික උපකරණ මිලදී ගැනීම සඳහාම වෙන්වූ අඩු පොලී ණය.",
    descriptionTa: "இலங்கையில் விதைகள், உரங்கள் மற்றும் விவசாயக் கருவிகளுக்காக பிரத்யேகமாக வழங்கப்படும் குறைந்த வட்டி கடன்கள்.",
    minAmount: 10000,
    maxAmount: 100000,
    defaultRate: 10,
    tenureMonths: 12,
    category: "Farming"
  },
  {
    id: "prod-2",
    name: "Saru Livelihood Women Support",
    nameSi: "සරු ජීවනෝපාය කාන්තා සහය ණය",
    nameTa: "சரு வாழ்வாதார மகளிர் உதவி",
    description: "Designed for women entrepreneurs to start home businesses like tailoring, spices, or handicrafts.",
    descriptionSi: "මහන මැෂින්, කුළුබඩු හෝ හස්ත කර්මාන්ත වැනි ගෘහස්ථ කර්මාන්ත ආරම්භ කිරීමට කාන්තා ව්‍යවසායිකාවන් සඳහා.",
    descriptionTa: "தையல், மசாலா அல்லது கைவினைப் பொருட்கள் போன்ற வீட்டு வணிகங்களைத் தொடங்க பெண் தொழில்முனைவோருக்காக வடிவமைக்கப்பட்டது.",
    minAmount: 15000,
    maxAmount: 75000,
    defaultRate: 12,
    tenureMonths: 9,
    category: "Business"
  },
  {
    id: "prod-3",
    name: "Lakmini Education & Skills Development",
    nameSi: "ලක්මිණි අධ්‍යාපන සහ නිපුණතා සංවර්ධන ණය",
    nameTa: "லக்மினி கல்வி & திறன் மேம்பாடு",
    description: "Finance vocational training, school materials, or higher education courses for youth.",
    descriptionSi: "තරුණ තරුණියන්ගේ වෘත්තීය පුහුණුව, පාසල් උපකරණ හෝ උසස් අධ්‍යාපන පාඨමාලා සඳහා මූල්‍ය සහාය.",
    descriptionTa: "தொழிற்பயிற்சி, பள்ளிப் பொருட்கள் அல்லது இளைஞர்களுக்கான உயர்கல்வி படிப்புகளுக்கு நிதியுதவி அளித்தல்.",
    minAmount: 20000,
    maxAmount: 150000,
    defaultRate: 8,
    tenureMonths: 18,
    category: "Education"
  },
  {
    id: "prod-4",
    name: "Jaffna Fishery Expansion Fund",
    nameSi: "යාපනය ධීවර ව්‍යාප්ති අරමුදල",
    nameTa: "யாழ்ப்பாணம் மீன்பிடி விரிவாக்க நிதி",
    description: "Support coastal fishers to buy nets, repairs, or small boats with custom flexible repayment schedules.",
    descriptionSi: "දැල, බෝට්ටු අළුත්වැඩියාව හෝ කුඩා බෝට්ටු මිලදී ගැනීම සඳහා වෙරළබඩ ධීවරයින්ට සහාය වීම.",
    descriptionTa: "வலைகள், பழுதுபார்ப்புகள் அல்லது சிறிய படகுகளை வாங்குவதற்கு கடலோர மீனவர்களுக்கு நெகிழ்வான திருப்பிச் செலுத்தும் திட்டங்களுடன் ஆதரவு.",
    minAmount: 30000,
    maxAmount: 200000,
    defaultRate: 11,
    tenureMonths: 12,
    category: "Farming"
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2026-07-15",
    type: "topup",
    amount: 50000,
    reference: "Bank Transfer - Sampath Bank",
    referenceSi: "බැංකු හුවමාරුව - සම්පත් බැංකුව",
    referenceTa: "வங்கி பரிமாற்றம் - சம்பத் வங்கி",
    category: "System"
  },
  {
    id: "tx-2",
    date: "2026-07-16",
    type: "utility",
    amount: 4500,
    reference: "CEB Electricity Bill Payment",
    referenceSi: "ලංවිම විදුලි බිල්පත් ගෙවීම",
    referenceTa: "CEB மின்சாரக் கட்டணம்",
    category: "Utility"
  },
  {
    id: "tx-3",
    date: "2026-07-17",
    type: "transfer_out",
    amount: 12000,
    reference: "Sent to P. Silva (Friend)",
    referenceSi: "පී. සිල්වා වෙත යවන ලදී",
    referenceTa: "பி. சில்வாவிற்கு அனுப்பப்பட்டது",
    category: "Personal"
  },
  {
    id: "tx-4",
    date: "2026-07-18",
    type: "disbursement",
    amount: 80000,
    reference: "Diriya Farmer Loan Disbursed",
    referenceSi: "දිරිය ගොවි ණය මුදල ලබා දෙන ලදී",
    referenceTa: "திரிய விவசாய கடன் வழங்கப்பட்டது",
    category: "Farming"
  },
  {
    id: "tx-5",
    date: "2026-07-19",
    type: "repayment",
    amount: 7200,
    reference: "EMI Repayment - Loan #0042",
    referenceSi: "EMI වාරික ගෙවීම - ණය අංක 0042",
    referenceTa: "தவணை செலுத்துதல் - கடன் #0042",
    category: "System"
  }
];

export const mockActiveLoans: ActiveLoan[] = [
  {
    id: "active-1",
    productName: "Diriya Farmer Micro-Loan",
    productNameSi: "දිරිය ගොවි ක්ෂුද්‍ර ණය",
    productNameTa: "திரிய விவசாய நுண்கடன்",
    amount: 80000,
    remainingAmount: 72800,
    nextPaymentDate: "2026-08-18",
    interestRate: 10,
    nextPaymentAmount: 7200,
    paidInstallments: 1,
    totalInstallments: 12
  }
];

export const mockBorrowerProfiles: BorrowerProfile[] = [
  {
    id: "bor-1",
    name: "Sunil Perera",
    location: "Anuradhapura",
    purpose: "Organic Paddy Cultivation Setup",
    amount: 60000,
    score: 792,
    riskCategory: "Low",
    interestRate: 9.5
  },
  {
    id: "bor-2",
    name: "Fathima Asma",
    location: "Kandy",
    purpose: "Sari & Embroidery Boutique",
    amount: 50000,
    score: 685,
    riskCategory: "Medium",
    interestRate: 13.0
  },
  {
    id: "bor-3",
    name: "K. Selvakumar",
    location: "Jaffna",
    purpose: "Fishing Net & Engine Repair",
    amount: 90000,
    score: 590,
    riskCategory: "High",
    interestRate: 19.5
  },
  {
    id: "bor-4",
    name: "Dilini Fonseka",
    location: "Gampaha",
    purpose: "Poultry Farming Expansion",
    amount: 120000,
    score: 410,
    riskCategory: "Very High",
    interestRate: 28.0
  }
];

export const chatbotKnowledge: ChatbotResponse[] = [
  {
    keywords: ["score", "credit", "improve", "ණය ලකුණු", "அபாய", "மதிப்பீடு"],
    responseEn: "To improve your credit score on FinBridge: 1) Repay EMIs on time. 2) Keep a higher savings balance. 3) Maintain utility payments ratio above 90%. 4) Limit multiple simultaneous debts.",
    responseSi: "ඔබේ ණය ලකුණු වැඩි දියුණු කිරීමට: 1) වාරික නියමිත වේලාවට ගෙවන්න. 2) මාසික ඉතුරුම් වැඩි කරන්න. 3) බිල්පත් ගෙවීම් 90% ඉක්මවන්න. 4) එකවර ලබාගන්නා ණ්‍ය ප්‍රමාණය සීමා කරන්න.",
    responseTa: "உங்கள் கடன் மதிப்பெண்ணை அதிகரிக்க: 1) தவணைகளை சரியான நேரத்தில் செலுத்துங்கள். 2) சேமிப்பு இருப்பை அதிகரியுங்கள். 3) மின்சாரம், நீர் கட்டணங்களை 90%க்கு மேல் செலுத்துங்கள்."
  },
  {
    keywords: ["rate", "interest", "rates", "පොලී", "வட்டி"],
    responseEn: "FinBridge interest rates are dynamically determined by your AI Credit Score. Low risk profiles (Score > 750) enjoy 8% - 10% rates, while high-risk profiles range between 18% - 28%.",
    responseSi: "පොලී අනුපාත ඔබේ AI ණය ලකුණු මත තීරණය වේ. අඩු අවදානම් (ලකුණු > 750) සඳහා 8% - 10% පොලියක් වන අතර, වැඩි අවදානම් සඳහා 18% - 28% දක්වා වෙනස් වේ.",
    responseTa: "வட்டி விகிதங்கள் உங்களின் AI கடன் மதிப்பெண் மூலம் தீர்மானிக்கப்படுகிறது. குறைந்த ஆபத்துள்ள பிரிவினருக்கு (மதிப்பெண் > 750) 8% - 10% வட்டி, அதிக ஆபத்துள்ளோருக்கு 18% - 28% வட்டி."
  },
  {
    keywords: ["wallet", "balance", "money", "පසුම්බි", "பணம்", "இருப்பு"],
    responseEn: "Your wallet balance is in Sri Lankan Rupees (LKR). You can send money instantly using any mobile number or top up via bank transfer or credit/debit card simulation.",
    responseSi: "ඔබේ ඩිජිටල් පසුම්බි ශේෂය ශ්‍රී ලංකා රුපියල් (LKR) වලින් පවතී. ජංගම දුරකථන අංකය භාවිතයෙන් මුදල් යැවීමට හෝ බැංකු කාඩ්පතකින් මුදල් එකතු කිරීමට හැකිය.",
    responseTa: "உங்கள் வாலட் இருப்பு இலங்கை ரூபாயில் (LKR) உள்ளது. மொபைல் எண் மூலம் உடனடியாக பணம் அனுப்பலாம் அல்லது வங்கி அட்டை மூலம் வாலட்டை நிரப்பலாம்."
  }
];

export const mockHeatmapData = [
  { day: "Mon", count: 8 },
  { day: "Tue", count: 15 },
  { day: "Wed", count: 12 },
  { day: "Thu", count: 20 },
  { day: "Fri", count: 25 },
  { day: "Sat", count: 5 },
  { day: "Sun", count: 3 }
];
