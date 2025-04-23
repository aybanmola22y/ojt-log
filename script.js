let employees = JSON.parse(localStorage.getItem("employees")) || {
    "Yuan Andonga": { remainingHours: 600, timeIn: null, timeOut: null },
    "Aivanne Baria": { remainingHours: 130, timeIn: null, timeOut: null },
    "Jayhan Molato": { remainingHours: 600, timeIn: null, timeOut: null },
    "Joseph Monroy": { remainingHours: 600, timeIn: null, timeOut: null },
    "Ma'am Claire Abalus": { remainingHours: 600, timeIn: null, timeOut: null },
    "Ma'am Jash Abalus": { remainingHours: 600, timeIn: null, timeOut: null }
};

// ✅ Force set Aivanne Baria's remaining hours to 130
if (employees["Aivanne Baria"]) {
    employees["Aivanne Baria"].remainingHours = 130;
}

let selectedEmployee = null;

function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function updateEmployeeInfo() {
    selectedEmployee = document.getElementById("employee-select").value;

    if (selectedEmployee) {
        const emp = employees[selectedEmployee];

        document.getElementById("employee-name-display").textContent = "Name: " + selectedEmployee;
        document.getElementById("remaining-hours-display").textContent = "Remaining OJT Hours: " + emp.remainingHours.toFixed(2) + " hrs";
        document.getElementById("remaining-hours-display").style.color = emp.remainingHours < 50 ? "red" : "black";

        document.getElementById("time-in-display").textContent = "Time In: " + (emp.timeIn ? new Date(emp.timeIn).toLocaleTimeString() : "Not logged");
        document.getElementById("time-out-display").textContent = "Time Out: " + (emp.timeOut ? new Date(emp.timeOut).toLocaleTimeString() : "Not logged");

        document.getElementById("time-in-btn").disabled = emp.timeIn !== null && emp.timeOut === null;
        document.getElementById("time-out-btn").disabled = emp.timeIn === null || emp.timeOut !== null;
    }
}

function logTime(action) {
    if (!selectedEmployee) return;

    const now = new Date().toISOString();
    const emp = employees[selectedEmployee];

    if (action === "in") {
        emp.timeIn = now;
        document.getElementById("time-in-display").textContent = "Time In: " + new Date(now).toLocaleTimeString();
        document.getElementById("time-out-btn").disabled = false;
        document.getElementById("time-in-btn").disabled = true;
    } else if (action === "out") {
        if (!emp.timeIn) return;

        emp.timeOut = now;
        const timeIn = new Date(emp.timeIn);
        const timeOut = new Date(now);
        let hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60);
        hoursWorked = Math.round(hoursWorked * 100) / 100;

        emp.remainingHours -= hoursWorked;
        if (emp.remainingHours < 0) emp.remainingHours = 0;

        document.getElementById("time-out-display").textContent = "Time Out: " + new Date(now).toLocaleTimeString();
        document.getElementById("remaining-hours-display").textContent = "Remaining OJT Hours: " + emp.remainingHours.toFixed(2) + " hrs";
        document.getElementById("remaining-hours-display").style.color = emp.remainingHours < 50 ? "red" : "black";

        emp.timeIn = null;
        emp.timeOut = null;
        document.getElementById("time-in-btn").disabled = false;
        document.getElementById("time-out-btn").disabled = true;
    }

    saveData();
}
