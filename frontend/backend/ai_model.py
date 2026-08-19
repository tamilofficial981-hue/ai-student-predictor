def predict_performance(attendance, marks, gpa):
    if attendance >= 90 and marks >= 85 and gpa >= 8.5:
        return "Excellent"

    elif attendance >= 75 and marks >= 70 and gpa >= 7.0:
        return "Good"

    else:
        return "Needs Improvement"