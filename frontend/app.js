const API_URL = 'http://localhost:3000/parcels';

const form = document.getElementById('parcelForm');
const tableBody = document.getElementById('parcelTableBody');

function getFormData() {
  return {
    trackingId: document.getElementById('trackingId').value,
    sender: document.getElementById('sender').value,
    receiver: document.getElementById('receiver').value,
    status: document.getElementById('status').value
  };
}

async function createParcel() {
  const data = getFormData();
  try {
    await axios.post(API_URL, data);
    alert('Parcel created!');
    form.reset();
    fetchParcels();
  } catch (err) {
    alert('Create error: ' + (err.response?.data?.error || err.message));
  }
}

async function updateParcel() {
  const data = getFormData();
  try {
    await axios.put(`${API_URL}/${data.trackingId}`, data);
    alert('Parcel updated!');
    form.reset();
    fetchParcels();
  } catch (err) {
    alert('Update error: ' + (err.response?.data?.error || err.message));
  }
}

async function deleteParcel(trackingId) {
  await axios.delete(`${API_URL}/${trackingId}`);
  fetchParcels();
}

function editParcel(trackingId, sender, receiver, status) {
  document.getElementById('trackingId').value = trackingId;
  document.getElementById('sender').value = sender;
  document.getElementById('receiver').value = receiver;
  document.getElementById('status').value = status;
}

// Store for filtering
let allParcels = [];

async function fetchParcels() {
  const res = await axios.get(API_URL);
  allParcels = res.data;
  renderParcels(allParcels);
}

function renderParcels(parcels) {
  tableBody.innerHTML = "";

  parcels.forEach(parcel => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${parcel.trackingId}</td>
      <td>${parcel.sender}</td>
      <td>${parcel.receiver}</td>
      <td><span class="status ${parcel.status.replace(/\s/g, '-')}">${parcel.status}</span></td>
      <td class="actions">
        <button onclick="editParcel('${parcel.trackingId}', '${parcel.sender}', '${parcel.receiver}', '${parcel.status}')">Edit</button>
        <button onclick="deleteParcel('${parcel.trackingId}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function filterParcels() {
  const status = document.getElementById('statusFilter').value;
  if (status === 'all') {
    renderParcels(allParcels);
  } else {
    renderParcels(allParcels.filter(p => p.status === status));
  }
}

fetchParcels();
