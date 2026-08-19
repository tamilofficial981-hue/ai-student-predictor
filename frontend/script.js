let chart;
let count = 0;
const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const result = await response.json();
        alert(result.message);
    });
}
function predictResult() {
    alert("Function started");

    let studentName = document.getElementById("studentName").value;
    let attendance = document.getElementById("attendance").value;
    let progress = Math.min(Number(attendance), 100);
document.getElementById("progressBar").style.width = progress + "%";
    let marks = document.getElementById("marks").value;
    let gpa = document.getElementById("gpa").value;

    console.log("Before fetch");
    alert("Before fetch");

    fetch("http://localhost:5000/predict",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            attendance:attendance,
            marks:marks,
            gpa:gpa
        })
        })
        .then(response => response.json())
        .then(data => {
    document.getElementById("performance").innerText = data.performance;
    document.getElementById("career").innerText = data.career;
    let grade;

if (data.performance === "Excellent") {
    grade = "A+";
} else if (data.performance === "Good") {
    grade = "B";
} else {
    grade = "C";
}

document.getElementById("grade").innerText = grade;
    document.getElementById("displayName").innerText = studentName;
    const ctx = document.getElementById("performanceChart").getContext("2d");

if (chart) {
    chart.destroy();
}

chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Attendance", "Marks", "GPA"],
        datasets: [{
            label: "Student Data",
            data: [attendance, marks, gpa],
            backgroundColor: ["blue", "green", "orange"]
        }]
    }
});
    count++;
document.getElementById("count").innerText = count;

const now = new Date().toLocaleString();

document.getElementById("history").innerHTML +=
`<li>${now} | Attendance: ${attendance}, Marks: ${marks}, GPA: ${gpa} → ${data.performance}</li>`;
    const history = document.getElementById("history");

    const li = document.createElement("li");
    li.innerText =
        "Attendance: " + attendance +
        ", Marks: " + marks +
        ", GPA: " + gpa +
        " → " + data.performance;

    history.appendChild(li);
})
.catch(error => {
    alert(error);
});
}
function clearHistory() {
    document.getElementById("history").innerHTML = "";
}
function downloadReport() {
    const history = document.getElementById("history").innerText;

    const blob = new Blob([history], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Prediction_Report.txt";
    link.click();

    URL.revokeObjectURL(link.href);
}
function clearForm() {
    document.getElementById("attendance").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("gpa").value = "";

    document.getElementById("performance").innerText = "---";
    document.getElementById("career").innerText = "---";
    document.getElementById("count").innerText = "0";
    document.getElementById("history").innerHTML = "";
}
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
    "theme",

    document.body.classList.contains("dark-mode") ? "dark" : "light"
);
}
function searchHistory() {
    let input = document.getElementById("searchHistory").value.toLowerCase();
    let items = document.getElementById("history").getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {
        let text = items[i].innerText.toLowerCase();

        if (text.includes(input)) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}function downloadCSV() {
    let items = document.querySelectorAll("#history li");
    let csv = "History\n";

    items.forEach(item => {
        csv += '"' + item.innerText.replace(/"/g, '""') + '"\n';
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Prediction_History.csv";
    link.click();

    URL.revokeObjectURL(link.href);
}
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    let btn = document.querySelector("button");

    if (document.body.classList.contains("dark-mode")) {
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}