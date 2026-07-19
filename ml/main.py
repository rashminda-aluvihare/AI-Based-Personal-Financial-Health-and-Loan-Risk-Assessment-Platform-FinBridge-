import os
import pickle
import numpy as np
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler

app = FastAPI(title="FinBridge AI ML Microservice", version="1.0")

# Enable CORS for frontend/backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "credit_model.pkl"
SCALER_PATH = "scaler.pkl"

# ==========================================
# AUTO-TRAINING ENGINE (Synthetic SL Dataset)
# ==========================================
def train_and_save_model():
    print("No trained models found. Generating synthetic Sri Lankan profile data...")
    np.random.seed(42)
    n_samples = 800

    # Synthetic features
    income = np.random.uniform(25000, 300000, n_samples)
    expenses = income * np.random.uniform(0.3, 0.85, n_samples)
    savings = income * np.random.uniform(0.02, 0.35, n_samples)
    debts = income * np.random.uniform(0, 1.5, n_samples)
    emi = debts * np.random.uniform(0.05, 0.15, n_samples)
    age = np.random.randint(18, 65, n_samples)
    dependents = np.random.randint(0, 5, n_samples)

    # Core indices
    dti = emi / (income + 1)
    savings_ratio = savings / (income + 1)

    # Target: Credit Score (300 to 850)
    # Target: Risk Category (0 = Low, 1 = Medium, 2 = High)
    base_scores = 580 + (savings_ratio * 400) - (dti * 500) - (dependents * 15) + (age * 0.5)
    credit_scores = np.clip(base_scores, 300, 850).astype(int)

    risk_levels = []
    for score in credit_scores:
        if score >= 720:
            risk_levels.append(0) # Low
        elif score >= 550:
            risk_levels.append(1) # Medium
        else:
            risk_levels.append(2) # High

    # Fit Scaler
    features = np.column_stack([income, expenses, savings, debts, emi, age, dependents])
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)

    # Fit models
    reg_score = RandomForestRegressor(n_estimators=50, random_state=42)
    reg_score.fit(scaled_features, credit_scores)

    clf_risk = RandomForestClassifier(n_estimators=50, random_state=42)
    clf_risk.fit(scaled_features, risk_levels)

    # Save pickles
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump({'regressor': reg_score, 'classifier': clf_risk}, f)
    
    with open(SCALER_PATH, 'wb') as f:
        pickle.dump(scaler, f)

    print("AI Model & Scaler compiled and saved successfully.")

# Initial check on launch
if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    train_and_save_model()

# Load models
with open(MODEL_PATH, 'rb') as f:
    models = pickle.load(f)
    score_model = models['regressor']
    risk_model = models['classifier']

with open(SCALER_PATH, 'rb') as f:
    data_scaler = pickle.load(f)

# ==========================================
# REST API INTERFACE SCHEMAS
# ==========================================
class VettingInput(BaseModel):
    income: float = Field(..., example=120000.0)
    expenses: float = Field(..., example=65000.0)
    savings: float = Field(..., example=15000.0)
    debts: float = Field(..., example=40000.0)
    emi: float = Field(..., example=12000.0)
    age: int = Field(..., example=28)
    employment: str = Field(..., example="freelance")
    dependents: int = Field(..., example=2)

class VettingOutput(BaseModel):
    score: int
    riskLevel: str
    reasons: list[str]

@app.post("/predict", response_model=VettingOutput)
def predict_score_and_risk(data: VettingInput):
    # 1. Format input features array
    input_array = np.array([[
        data.income,
        data.expenses,
        data.savings,
        data.debts,
        data.emi,
        data.age,
        data.dependents
    ]])

    # 2. Scale features
    scaled_input = data_scaler.transform(input_array)

    # 3. Predict Score
    predicted_score = int(score_model.predict(scaled_input)[0])
    predicted_score = min(850, max(300, predicted_score))

    # 4. Predict Risk Category
    risk_index = int(risk_model.predict(scaled_input)[0])
    risk_labels = ["Low", "Medium", "High"]
    risk_level = risk_labels[risk_index]

    # 5. Explainable AI (XAI) feature analysis
    reasons = []
    dti = (data.emi / data.income) if data.income > 0 else 0
    savings_ratio = (data.savings / data.income) if data.income > 0 else 0

    if dti > 0.40:
        reasons.append("High debt exposure (DTI > 40%) consumes disposable liquidity.")
    elif dti < 0.15:
        reasons.append("Favorable low Debt-to-Income (DTI) ratio enhances repayment capability.")

    if savings_ratio < 0.08:
        reasons.append("Low savings buffer increases susceptibility to cash flow volatility.")
    elif savings_ratio >= 0.20:
        reasons.append("Strong savings habit indicates healthy asset buffers.")

    if data.dependents >= 3:
        reasons.append("Higher dependent headcount increases baseline living expenses.")

    if data.employment == "freelance" or data.employment == "unemployed":
        reasons.append("Alternative occupation flow requires additional validation.")

    # Fallback to general statement if reasons list is thin
    if len(reasons) == 0:
        reasons.append("Financial variables are balanced within baseline safety limits.")

    return {
        "score": predicted_score,
        "riskLevel": risk_level,
        "reasons": reasons
    }

@app.get("/health")
def health_check():
    return {"status": "UP", "service": "FinBridge Machine Learning Service"}
