let employees = JSON.parse(localStorage.getItem("employees")) || {
    "Yuan Andonga": { remainingHours: 600, timeIn: null, timeOut: null },
    "Aivanne Baria": { remainingHours: 600, timeIn: null, timeOut: null },
    "Jayhan Molato": { remainingHours: 600, timeIn: null, timeOut: null },
    "Joseph Monroy": { remainingHours: 600, timeIn: null, timeOut: null },
    "Ma'am Claire Abalus": { remainingHours: 600, timeIn: null, timeOut: null },
    "Ma'am Jash Abalus": { remainingHours: 600, timeIn: null, timeOut: null }
};

let selectedEmployee = null;

function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function updateEmployeeInfo() {
    selectedEmployee = document.getElementById("employee-select").value;

    if (selectedEmployee) {
        document.getElementById("employee-name-display").textContent = "Employee: " + selectedEmployee;
        document.getElementById("remaining-hours-display").textContent = "Remaining OJT Hours: " + employees[selectedEmployee].remainingHours.toFixed(2) + " hrs";
        
        document.getElementById("time-in-display").textContent = "Time In: " + (employees[selectedEmployee].timeIn ? new Date(employees[selectedEmployee].timeIn).toLocaleTimeString() : "Not logged");
        document.getElementById("time-out-display").textContent = "Time Out: " + (employees[selectedEmployee].timeOut ? new Date(employees[selectedEmployee].timeOut).toLocaleTimeString() : "Not logged");
        
        document.getElementById("time-in-btn").disabled = employees[selectedEmployee].timeIn !== null && employees[selectedEmployee].timeOut === null;
        document.getElementById("time-out-btn").disabled = employees[selectedEmployee].timeIn === null || employees[selectedEmployee].timeOut !== null;
    }
}

function logTime(action) {
    if (!selectedEmployee) return;

    let now = new Date().toISOString();
    
    if (action === "in") {
        employees[selectedEmployee].timeIn = now; 
        document.getElementById("time-in-display").textContent = "Time In: " + new Date(now).toLocaleTimeString();
        document.getElementById("time-out-btn").disabled = false;
        document.getElementById("time-in-btn").disabled = true;
    } else if (action === "out") {
        if (!employees[selectedEmployee].timeIn) return;

        employees[selectedEmployee].timeOut = now;
        let timeIn = new Date(employees[selectedEmployee].timeIn);
        let timeOut = new Date(now);
        let hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60);
        hoursWorked = Math.round(hoursWorked * 100) / 100;

        employees[selectedEmployee].remainingHours -= hoursWorked;
        if (employees[selectedEmployee].remainingHours < 0) employees[selectedEmployee].remainingHours = 0;

        document.getElementById("time-out-display").textContent = "Time Out: " + new Date(now).toLocaleTimeString();
        document.getElementById("remaining-hours-display").textContent = "Remaining OJT Hours: " + employees[selectedEmployee].remainingHours.toFixed(2) + " hrs";

        employees[selectedEmployee].timeIn = null;
        employees[selectedEmployee].timeOut = null;
        document.getElementById("time-in-btn").disabled = false;
        document.getElementById("time-out-btn").disabled = true;
    }
    saveData();
}
