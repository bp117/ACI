// Retrieve transData from localStorage
let transData = JSON.parse(localStorage.getItem('transactionData')) || [];

// Function to populate transaction list based on selected priority
function populateTransList() {
  const tbody = document.getElementById('transData');
  tbody.innerHTML = transData.map(txn => `
    <tr>
      <td><a href="transaction.html?trn=${txn.trn}">${txn.trn}</a></td>
      <td>${txn.sender}</td>
      <td>${txn.receiver}</td>
      <td>${txn.amount}</td>
      <td>${txn.currency}</td>
      <td>${txn.messageType}</td>
      <td>${txn.bank}</td>
      <td>${txn.operator}</td>
    </tr>
  `).join('');
}

// Initialize
populateTransList();