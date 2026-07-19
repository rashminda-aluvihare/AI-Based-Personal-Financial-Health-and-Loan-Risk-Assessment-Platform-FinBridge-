export interface ScoreInput {
  income: number;
  dependents: number;
  existingDebt: number;
  savings: number;
  utilityPaymentRatio: number;
  communityRating: number;
  loanAmount: number;
  tenureMonths: number;
}

export interface ScoreOutput {
  score: number;
  riskCategory: 'Low' | 'Medium' | 'High' | 'Very High';
  approvalProbability: number;
  interestRate: number;
  reasons: {
    positive: string[];
    negative: string[];
  };
}

export function calculateCreditScore(input: ScoreInput): ScoreOutput {
  const {
    income,
    dependents,
    existingDebt,
    savings,
    utilityPaymentRatio,
    communityRating,
    loanAmount,
    tenureMonths
  } = input;

  // 1. Income stability & Debt-to-income ratio (45%)
  const disposableIncome = income - existingDebt;
  const dti = income > 0 ? (existingDebt / income) * 100 : 100;
  
  let financialScore = 0;
  if (dti < 20) financialScore += 250;
  else if (dti < 40) financialScore += 180;
  else if (dti < 60) financialScore += 100;
  else financialScore += 30;

  // Savings score (15%)
  const savingsRatio = income > 0 ? (savings / income) * 100 : 0;
  let savingsScore = 0;
  if (savingsRatio >= 25) savingsScore += 150;
  else if (savingsRatio >= 15) savingsScore += 110;
  else if (savingsRatio >= 5) savingsScore += 60;
  else savingsScore += 20;

  // 2. Utility Bill Payment Timeliness (20%)
  let utilityScore = (utilityPaymentRatio / 100) * 200;

  // 3. Social and community peer rating (10%)
  let socialScore = (communityRating / 5) * 100;

  // 4. Loan Burden factor (10%)
  // Loan amount compared to annual income
  const annualIncome = income * 12;
  const loanBurdenRatio = annualIncome > 0 ? (loanAmount / annualIncome) * 100 : 100;
  let burdenScore = 0;
  if (loanBurdenRatio < 15) burdenScore += 100;
  else if (loanBurdenRatio < 30) burdenScore += 70;
  else if (loanBurdenRatio < 50) burdenScore += 45;
  else burdenScore += 15;

  // Base score 300, max additional 550 to reach 850
  let calculatedScore = Math.round(300 + financialScore + savingsScore + utilityScore + socialScore + burdenScore);
  calculatedScore = Math.min(850, Math.max(300, calculatedScore));

  // Determine Risk Category, Probability, and Rates
  let riskCategory: 'Low' | 'Medium' | 'High' | 'Very High' = 'Medium';
  let approvalProbability = 0;
  let interestRate = 18;
  const positive: string[] = [];
  const negative: string[] = [];

  if (calculatedScore >= 750) {
    riskCategory = 'Low';
    approvalProbability = Math.round(92 + (calculatedScore - 750) * 0.08);
    interestRate = Math.max(8.0, Number((12.5 - (calculatedScore - 750) * 0.045).toFixed(1)));
  } else if (calculatedScore >= 650) {
    riskCategory = 'Medium';
    approvalProbability = Math.round(75 + (calculatedScore - 650) * 0.17);
    interestRate = Number((16.0 - (calculatedScore - 650) * 0.035).toFixed(1));
  } else if (calculatedScore >= 500) {
    riskCategory = 'High';
    approvalProbability = Math.round(40 + (calculatedScore - 500) * 0.23);
    interestRate = Number((24.0 - (calculatedScore - 500) * 0.05).toFixed(1));
  } else {
    riskCategory = 'Very High';
    approvalProbability = Math.round(10 + (calculatedScore - 300) * 0.15);
    interestRate = 32.0;
  }

  // Generate Reasoning
  if (dti < 25) {
    positive.push("Healthy Debt-to-Income (DTI) ratio indicating low financial stress.");
  } else if (dti > 50) {
    negative.push("High debt exposure; existing payments consume more than 50% of monthly income.");
  }

  if (savingsRatio >= 15) {
    positive.push("Strong savings culture, demonstrating good buffer capacity.");
  } else if (savingsRatio < 5) {
    negative.push("Low savings habit, leaving limited reserve for emergency repayments.");
  }

  if (utilityPaymentRatio >= 90) {
    positive.push("Outstanding track record of timely utility and mobile bill payments.");
  } else if (utilityPaymentRatio < 75) {
    negative.push("Irregular utility and bill payment history indicates cash flow volatility.");
  }

  if (communityRating >= 4.2) {
    positive.push("Excellent reputation score from local microfinance society peers.");
  } else if (communityRating < 3.0) {
    negative.push("Below-average community peer review; rating indicates minor social trust concerns.");
  }

  if (loanBurdenRatio < 20) {
    positive.push("Loan request amount is well-proportioned to annual income.");
  } else if (loanBurdenRatio > 40) {
    negative.push("Requested loan size is high relative to annual income.");
  }

  // Handle empty lists
  if (positive.length === 0) positive.push("Basic profile structure matches entry guidelines.");
  if (negative.length === 0) negative.push("No severe negative risk flags detected.");

  return {
    score: calculatedScore,
    riskCategory,
    approvalProbability,
    interestRate,
    reasons: { positive, negative }
  };
}
