// Mock Queue Data
const queueData = [
  { priority: 1, bank: 845, location: "NY", queue: "CH_LORPRQ", description: "CHIPS Repair - Low", amount: "91,911.56", count: 4 },
  { priority: 2, bank: 845, location: "NY", queue: "FT1_BBRPRQ", description: "Future Day1 Bank-to-Bank Repair", amount: "376,562,996.80", count: 19 },
  { priority: 3, bank: 845, location: "NY", queue: "FT2_BBRPRQ", description: "Future 2+ Bank-to-Bank Repair", amount: "31,781.70", count: 1 }
];

// Mock Transaction Data for each queue
const transactionData = {
  "CH_LORPRQ": [
    { trn: "20241204-00649915", sender: "D-001", receiver: "DEUTDEFF", amount: "1,000.00", currency: "USD", messageType: "103", bank: "845", operator: "SSSFUT" },
    { trn: "20241204-00651195", sender: "D-002", receiver: "A-2", amount: "9,726.75", currency: "USD", messageType: "103", bank: "845", operator: "SSSFUT" }
  ],
  "FT1_BBRPRQ": [
    { trn: "20241205-00520998", sender: "D-003", receiver: "A-4", amount: "22,939.70", currency: "USD", messageType: "103", bank: "845", operator: "SSSSWF" },
    { trn: "20241205-00503448", sender: "D-004", receiver: "A-10", amount: "14,046.38", currency: "USD", messageType: "103", bank: "845", operator: "SSSSWF" }
  ],
  "FT2_BBRPRQ": [
    { trn: "20241205-00503986", sender: "D-005", receiver: "A-20", amount: "10,670.00", currency: "USD", messageType: "103", bank: "845", operator: "SSSSWF" },
    { trn: "20241205-00510245", sender: "D-006", receiver: "A-25", amount: "250,000.00", currency: "USD", messageType: "103", bank: "845", operator: "SSSSWF" }
  ]
};

// Store originalTransData in localStorage
localStorage.setItem('originalTransData', JSON.stringify(transactionData));

// Populate Queue Table
function populateQueue() {
  const tbody = document.getElementById("queueData");
  tbody.innerHTML = queueData
    .map(
      (data, index) => `
      <tr>
        <td>
          <select data-index="${index}" class="priority-dropdown">
            <option value="1" ${data.priority === 1 ? "selected" : ""}>1</option>
            <option value="2" ${data.priority === 2 ? "selected" : ""}>2</option>
            <option value="3" ${data.priority === 3 ? "selected" : ""}>3</option>
          </select>
        </td>
        <td>${data.bank}</td>
        <td>${data.location}</td>
        <td>${data.queue}</td>
        <td>${data.description}</td>
        <td>${data.amount}</td>
        <td>${data.count}</td>
      </tr>
    `
    )
    .join("");
}

// Reset Queue Table
function resetQueue() {
  populateQueue();
  localStorage.setItem('transData', JSON.stringify([])); // Clear transData in localStorage
}

// Submit Queue Changes and Redirect to Transaction Page
function submitQueue() {
  const updatedData = Array.from(document.querySelectorAll(".priority-dropdown")).map((dropdown) => {
    const index = dropdown.getAttribute("data-index");
    queueData[index].priority = parseInt(dropdown.value, 10);
    return queueData[index];
  });

  // Find the queue with the highest priority (lowest number)
  const selectedQueue = updatedData.sort((a, b) => a.priority - b.priority)[0].queue;

  // Save selected queue's transaction data to localStorage
  localStorage.setItem("transData", JSON.stringify(transactionData[selectedQueue]));

  // Redirect to transaction page
  window.location.href = "translist.html";
}

// Event Listeners
document.getElementById("resetButton").addEventListener("click", resetQueue);
document.getElementById("submitButton").addEventListener("click", submitQueue);

// Initialize Table
populateQueue();