// Mock Queue Data
const queueData = [
    { priority: 1, bank: 845, location: "NY", queue: "CH_LORPRQ", description: "CHIPS Repair - Low", amount: "91,911.56", count: 4 },
    { priority: 2, bank: 845, location: "NY", queue: "FT1_BBRPRQ", description: "Future Day1 Bank-to-Bank Repair", amount: "376,562,996.80", count: 19 },
    { priority: 3, bank: 845, location: "NY", queue: "FT2_BBRPRQ", description: "Future 2+ Bank-to-Bank Repair", amount: "31,781.70", count: 1 }
  ];
  
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
  }
  
  // Submit Queue Changes and Redirect to Transaction Page
  function submitQueue() {
    const updatedData = Array.from(document.querySelectorAll(".priority-dropdown")).map((dropdown) => {
      const index = dropdown.getAttribute("data-index");
      queueData[index].priority = parseInt(dropdown.value, 10);
      return queueData[index];
    });
  
    // Save updated data to localStorage for transaction page
    localStorage.setItem("transactionData", JSON.stringify(updatedData));
  
    // Redirect to transaction page
    window.location.href = "transaction.html";
  }
  
  // Event Listeners
  document.getElementById("resetButton").addEventListener("click", resetQueue);
  document.getElementById("submitButton").addEventListener("click", submitQueue);
  
  // Initialize Table
  populateQueue();
  