// Sample data
const leads = [
  { name: 'Alice', email: 'alice@example.com', phone: '123-456-7890' },
  { name: 'Bob', email: 'bob@example.com', phone: '234-567-8901' },
  { name: 'Charlie', email: 'charlie@example.com', phone: '345-678-9012' }
];

// Sorting state to toggle ascending/descending
const sortState = {
  key: null,
  ascending: true
};

const tableBody = document.querySelector('#lead-table tbody');
const searchInput = document.getElementById('search');
let debounceTimer;

function renderLeads(data) {
  tableBody.innerHTML = '';
  data.forEach(lead => {
    const row = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = lead.name;
    const emailTd = document.createElement('td');
    emailTd.textContent = lead.email;
    const phoneTd = document.createElement('td');
    phoneTd.textContent = lead.phone;
    row.appendChild(nameTd);
    row.appendChild(emailTd);
    row.appendChild(phoneTd);
    tableBody.appendChild(row);
  });
}

function sortLeads(key) {
  if (sortState.key === key) {
    sortState.ascending = !sortState.ascending;
  } else {
    sortState.key = key;
    sortState.ascending = true;
  }
  leads.sort((a, b) => {
    if (a[key] < b[key]) return sortState.ascending ? -1 : 1;
    if (a[key] > b[key]) return sortState.ascending ? 1 : -1;
    return 0;
  });
  renderLeads(leads);
}

function filterLeads(term) {
  const filtered = leads.filter(lead =>
    lead.name.toLowerCase().includes(term) ||
    lead.email.toLowerCase().includes(term) ||
    lead.phone.includes(term)
  );
  renderLeads(filtered);
}

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filterLeads(searchInput.value.toLowerCase());
  }, 300);
});

// Setup sorting handlers
Array.from(document.querySelectorAll('#lead-table th')).forEach(th => {
  th.addEventListener('click', () => sortLeads(th.dataset.key));
});

// Initial render
renderLeads(leads);
