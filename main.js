// This object holds the data for each network so we don't need 3 HTML files
const networkData = {
    mtn: {
        name: "MTN",
        number: "0553059475",
        accountName: "BELINDA QUARSHIE LINDA QUARSH ENTERPRISE",
        ussdSteps: [
            "Dial *170#",
            "Select '1' Transfer Money",
            "Select '1' MoMo User",
            "Enter Number: 0553059475",
            "Enter Amount & Reference",
            "Confirm PIN"
        ]
    },
    telecel: {
        name: "Telecel Cash",
        number: "0201234567", // Example number based on flow
        accountName: "ARCFIELD VENTURES",
        ussdSteps: [
            "Dial *110#",
            "Select '1' Send Money",
            "Select '2' Other Networks",
            "Select '1' MTN",
            "Enter recipient number",
            "Enter amount and PIN"
        ]
    },
    airtel: {
        name: "AirtelTigo",
        number: "0271234567", 
        accountName: "GEORGE DAMPTEY",
        ussdSteps: [
            "Dial *110#",
            "Select '1' Send Money",
            "Enter Number",
            "Confirm"
        ]
    }
};

// 1. Function to switch from Selection Screen to Payment Screen
function goToPayment(networkKey) {
    // Hide Selection, Show Payment
    document.getElementById('view-selection').classList.remove('active');
    document.getElementById('view-selection').classList.add('hidden');
    
    document.getElementById('view-payment').classList.remove('hidden');
    document.getElementById('view-payment').classList.add('active');

    // Update the UI with data
    updateUI(networkKey);
}

// 2. Function to Update the text on the page
function updateUI(networkKey) {
    const data = networkData[networkKey];

    // Update Buttons State
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${networkKey}`).classList.add('active');

    // Update Text
    document.getElementById('dynamic-number').innerText = data.number;
    document.getElementById('dynamic-name').innerText = data.accountName;
    document.getElementById('dynamic-provider').innerText = data.name;

    // Update USSD List
    const list = document.getElementById('ussd-list');
    list.innerHTML = ""; // Clear old list
    data.ussdSteps.forEach(step => {
        let li = document.createElement('li');
        li.innerText = step;
        list.appendChild(li);
    });
}

// 3. Function to go back
function goBack() {
    document.getElementById('view-payment').classList.remove('active');
    document.getElementById('view-payment').classList.add('hidden');
    
    document.getElementById('view-selection').classList.remove('hidden');
    document.getElementById('view-selection').classList.add('active');
}

// 4. Copy to Clipboard Function
function copyText() {
    const number = document.getElementById('dynamic-number').innerText;
    navigator.clipboard.writeText(number).then(() => {
        alert("Number copied: " + number);
    });
}