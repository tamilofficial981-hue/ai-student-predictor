from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from ai_model import predict_performance

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Student123!",
    database="student_ai"
)

@app.route("/")
def home():
    return "Flask connected to MySQL successfully!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    attendance = float(data["attendance"])
    marks = float(data["marks"])
    gpa = float(data["gpa"])

    if attendance >= 90 and marks >= 80 and gpa >= 8:
        performance = "Excellent"
    elif attendance >= 75 and marks >= 60 and gpa >= 6:
        performance = "Good"
    else:
        performance = "Poor"

    if gpa >= 8 and marks >= 80:
        careers = ["Software Developer", "AI/ML Engineer", "Data Scientist"]
    elif gpa >= 7 and marks >= 70:
        careers = ["Data Analyst", "Web Developer", "Cloud Engineer"]
    else:
        careers = ["Web Developer", "Technical Support", "Junior Developer"]

    return jsonify({
        "performance": performance,
        "careers": careers
    })

if __name__ == "__main__":
    app.run(debug=True)