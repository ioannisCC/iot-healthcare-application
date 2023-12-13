from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Assuming X contains your features and y contains the corresponding emotion labels

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize SVM classifier
svm_classifier = SVC(kernel='linear', C=1.0)

# Train the SVM classifier
svm_classifier.fit(X_train, y_train)

# Predict emotions on the test set
predictions = svm_classifier.predict(X_test)

# Evaluate the model
print(classification_report(y_test, predictions))
