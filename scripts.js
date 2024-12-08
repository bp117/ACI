// Mock Queue Data
const queueData = [
  { priority: 1, bank: 845, location: "NY", queue: "CH_LORPRQ", description: "CHIPS Repair - Low", amount: "91,911.56", count: 4 },
  { priority: 2, bank: 845, location: "NY", queue: "FT1_BBRPRQ", description: "Future Day1 Bank-to-Bank Repair", amount: "376,562,996.80", count: 19 },
  { priority: 3, bank: 845, location: "NY", queue: "FT2_BBRPRQ", description: "Future 2+ Bank-to-Bank Repair", amount: "31,781.70", count: 1 }
];

// Original Transaction Data
const originalTransactionData = {
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
let selectedQueue = "CH_LORPRQ"
// Initialize original transaction data in localStorage if not already stored
if (!localStorage.getItem('originalTransactionData')) {
  localStorage.setItem('originalTransactionData', JSON.stringify(originalTransactionData));
}

// Populate Queue Table
function populateQueue() {
  const tbody = document.getElementById("queueData");
  tbody.innerHTML = queueData
    .map(
      (data) => `
      <tr>
        <td>
          <select id="${data.queue}" class="priority-dropdown" data-queue="${data.queue}">
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
  attachPriorityChangeEvent(); // Attach event after populating rows
}

// Reset Transaction Data and Queue Priority
function resetQueue() {
  localStorage.setItem('transactionData', localStorage.getItem('originalTransactionData')); // Reset transaction data
  alert('Transaction data and queue priorities have been reset to the original state.');
}

// Handle Priority Change Event
function handlePriorityChange(event) {
   selectedQueue = event.target.dataset.queue;
  const selectedPriority = event.target.value;
 
  // Update queue data
  queueData.forEach((queue) => {
    if (queue.queue === selectedQueue) {
      queue.priority = parseInt(selectedPriority, 10);
    }
  });

  console.log(`Updated priority for queue "${selectedQueue}" to ${selectedPriority}`);
}

// Attach Change Event to Priority Dropdowns
function attachPriorityChangeEvent() {
  const dropdowns = document.querySelectorAll(".priority-dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("change", handlePriorityChange);
  });
}

// Submit Queue and Redirect to Transaction List
function submitQueue() {
  const updatedData = Array.from(document.querySelectorAll(".priority-dropdown")).map((dropdown) => {
    const index = dropdown.getAttribute("data-queue");
   // queueData[index].priority = parseInt(dropdown.value, 10);
  
  const queueIndex = queueData.findIndex((data) => data.queue === index);
  return queueData[queueIndex];
  });

  // Find the queue with the highest priority (lowest number)
 // const selectedQueue = updatedData.sort((a, b) => a.priority - b.priority)[0].queue;

  // Save selected queue's transaction data to localStorage
  if(localStorage.getItem("lastSelectedQueue") !== selectedQueue){
    updatedTransactions = originalTransactionData[selectedQueue];
    if (updatedTransactions) {
      localStorage.setItem("transactionData", JSON.stringify(updatedTransactions));
      localStorage.setItem("lastSelectedQueue", selectedQueue);
    }
  }else{ 

  const transactionData = JSON.parse(localStorage.getItem('transactionData')) || JSON.parse(localStorage.getItem("originalTransactionData"));
  const updatedTransactions = transactionData[selectedQueue];
  if (updatedTransactions) {
    localStorage.setItem("transactionData", JSON.stringify(updatedTransactions));
    localStorage.setItem("lastSelectedQueue", selectedQueue);
  }
  }
 

  // Redirect to transaction list
  window.location.href = "translist.html";
}

// Remove Processed Transaction from List
function removeTransaction(trn) {
  const transactionData = JSON.parse(localStorage.getItem("transactionData"));
  const updatedTransactions = transactionData.filter((txn) => txn.trn !== trn);

  localStorage.setItem("transactionData", JSON.stringify(updatedTransactions));
}

// Persist Transaction Data Across Pages
function persistTransactionData() {
  const transactionData = localStorage.getItem("transactionData");
  return transactionData ? JSON.parse(transactionData) : [];
}

// Event Listeners
document.getElementById("resetButton").addEventListener("click", resetQueue);
document.getElementById("submitButton").addEventListener("click", submitQueue);

// Initialize Queue Table
populateQueue();
