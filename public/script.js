
let currentUser = null;

// Navigation logic
const loginScreen = document.getElementById('loginScreen');
const notificationScreen = document.getElementById('notificationScreen');
const workOrderScreen = document.getElementById('workOrderScreen');

// Login
loginScreen.onsubmit = async function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    currentUser = await res.json();
    loginScreen.classList.add('hidden');
    notificationScreen.classList.remove('hidden');
  } else {
    alert('Login failed');
  }
};

// Notification
notificationScreen.onsubmit = async function(e) {
  e.preventDefault();
  const data = {
    notification_no: document.getElementById('notifNo').value,
    functional_location: document.getElementById('functLoc').value,
    equipment: document.getElementById('equipment').value,
    description: document.getElementById('notifDesc').value,
    damage_code: document.getElementById('damageCode').value,
    effect: document.getElementById('effect').value,
    created_by: currentUser.id
  };
  const res = await fetch('/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    notificationScreen.classList.add('hidden');
    workOrderScreen.classList.remove('hidden');
    // Optionally, set notification number in work order screen
    document.getElementById('woNotifNo').value = data.notification_no;
  } else {
    alert('Notification failed');
  }
};

// Work Order
workOrderScreen.onsubmit = async function(e) {
  e.preventDefault();
  const startDate = document.getElementById('startDate').value;
  const startTime = document.getElementById('startTime').value;
  const endDate = document.getElementById('endDate').value;
  const endTime = document.getElementById('endTime').value;
  const start_datetime = startDate && startTime ? `${startDate} ${startTime}` : null;
  const end_datetime = endDate && endTime ? `${endDate} ${endTime}` : null;

  const data = {
    work_order_no: document.getElementById('workOrderNo').value,
    notification_id: document.getElementById('woNotifNo').value,
    operations: document.getElementById('operations').value,
    num_people: document.getElementById('numPeople').value,
    duration: document.getElementById('duration').value,
    start_datetime,
    end_datetime,
    status: document.getElementById('status').value
  };
  const res = await fetch('/api/workorders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    alert('Work Order Submitted!');
    // Reset all forms and return to login
    loginScreen.reset();
    notificationScreen.reset();
    workOrderScreen.reset();
    workOrderScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
  } else {
    alert('Work order failed');
  }
};

// Navigation buttons
document.getElementById('backToLogin').onclick = function() {
  notificationScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
};
document.getElementById('backToNotification').onclick = function() {
  workOrderScreen.classList.add('hidden');
  notificationScreen.classList.remove('hidden');
};