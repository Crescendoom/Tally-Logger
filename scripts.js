let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let logTableEl = document.getElementById("log-entries")
let count = 0
let totalCount = 0
let index = 1
let entries = []

function loadFromLocalStorage() {
    const savedEntries = localStorage.getItem('tallyEntries');
    if (savedEntries) {
        entries = JSON.parse(savedEntries);
        
        entries.forEach(entry => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index++}</td>
                <td>${entry.count}</td>
                <td>${entry.dateTime}</td>`;
            logTableEl.appendChild(newRow);
        });
    }
    
    const savedTotal = localStorage.getItem('tallyTotal');
    if (savedTotal) {
        totalCount = parseInt(savedTotal);
        document.getElementById("total-count").textContent = totalCount;
    }
}

window.addEventListener('load', loadFromLocalStorage);

function getCurrentDateTime() {
    const now = new Date();
    
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${month}/${day} ${hoursStr}:${minutes} ${ampm}`;
}

function addEntry() {
    count += 1
    countEl.textContent = count
}

function logEntry() {
    if (count === 0) 
    {
        alert("Cannot Add 0");
        return;
    }
    totalCount += count;
    
    const dateTime = getCurrentDateTime();
    entries.push({ count: count, dateTime: dateTime });
    
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${index++}</td>
        <td>${count}</td>
        <td>${dateTime}</td>`;
    logTableEl.appendChild(newRow);
    document.getElementById("total-count").textContent = totalCount;
    

    localStorage.setItem('tallyEntries', JSON.stringify(entries));
    localStorage.setItem('tallyTotal', totalCount);
    
    countEl.textContent = 0
    count = 0
}

function resetAll() {
    if (confirm("Are you sure you want to reset all entries? This cannot be undone.")) {
        localStorage.removeItem('tallyEntries');
        localStorage.removeItem('tallyTotal');
        
        count = 0;
        totalCount = 0;
        entries = [];
        index = 1;
        countEl.textContent = "0";
        document.getElementById("total-count").textContent = "0";
        logTableEl.innerHTML = "";
    }
}