let steps = 0;
let isTracking = false;

// 1. Local Storage Se Data Load Karna
window.onload = () => {
    steps = parseInt(localStorage.getItem('currentSteps')) || 0;
    updateDisplay();
    renderHistory();
};

function updateDisplay() {
    document.getElementById('step-count').innerText = steps;
    localStorage.setItem('currentSteps', steps);
}

// 2. Reset & History Save Logic
document.getElementById('reset-btn').onclick = () => {
    if (steps > 0) {
        let history = JSON.parse(localStorage.getItem('stepHistory')) || [];
        history.push({ date: new Date().toLocaleString(), steps: steps });
        localStorage.setItem('stepHistory', JSON.stringify(history));
        
        steps = 0;
        updateDisplay();
        renderHistory();
        alert("Steps saved to history!");
    }
};

// 3. Render History
function renderHistory() {
    const list = document.getElementById('history-list');
    let history = JSON.parse(localStorage.getItem('stepHistory')) || [];
    list.innerHTML = history.map(item => `<li>${item.date}: <b>${item.steps} steps</b></li>`).join('');
}

// 4. Delete History
document.getElementById('clear-history').onclick = () => {
    if(confirm("Kya aap history delete karna chahte hain?")) {
        localStorage.removeItem('stepHistory');
        renderHistory();
    }
};

// 5. PDF Export
document.getElementById('export-pdf').onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("StepUp Fitness Report", 10, 10);
    let history = JSON.parse(localStorage.getItem('stepHistory')) || [];
    history.forEach((item, i) => {
        doc.text(`${item.date}: ${item.steps} steps`, 10, 20 + (i * 10));
    });
    doc.save("fitness-report.pdf");
};

// 6. Web Share API
document.getElementById('share-btn').onclick = async () => {
    const shareData = {
        title: 'StepUp Pro',
        text: 'Maine aaj apne steps track kiye! Aap bhi try karein.',
        url: window.location.href
    };
    try {
        await navigator.share(shareData);
    } catch (err) {
        console.log("Share failed");
    }
};

// 7. Hamburger Menu Toggle
document.getElementById('menu-toggle').onclick = () => {
    document.getElementById('nav-menu').classList.toggle('active');
};
function updateClock() {
    const now = new Date();
    
    // Time Format (HH:MM:SS)
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    
    // Date Format (DD MMM, YYYY)
    const dateString = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    document.getElementById('live-clock').innerText = timeString;
    document.getElementById('live-date').innerText = dateString;
}

// Har 1 second mein update hoga
setInterval(updateClock, 1000);
updateClock(); // Turant chalane ke liye
