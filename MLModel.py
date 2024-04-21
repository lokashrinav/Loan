import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Step 1: Data Loading
data = pd.read_csv("creditcard.csv")

# Step 2: Data Preprocessing
data.dropna(inplace=True)
X = data.drop(columns=['Class'])
y = data['Class']
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 3: Model Selection and Training
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)

# Step 4: Model Evaluation
y_pred = model.predict(X_test)
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Step 5: Hyperparameter Tuning
param_grid = {'C': [0.001, 0.01, 0.1, 1, 10, 100]}
grid_search = GridSearchCV(model, param_grid, cv=5)
grid_search.fit(X_train, y_train)
best_params = grid_search.best_params_
best_model = LogisticRegression(**best_params)
best_model.fit(X_train, y_train)

# Step 6: Model Evaluation (after hyperparameter tuning)
y_pred_best = best_model.predict(X_test)
print("Classification Report (after hyperparameter tuning):")
print(classification_report(y_test, y_pred_best))
