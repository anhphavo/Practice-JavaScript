let users = [];

document.addEventListener('DOMContentLoaded', function () {
    loadUserRecords();

    document.getElementById('search-text').addEventListener('input', () => {
        const searchText = document.getElementById('search-text').value;
        searchUsers(searchText);
    });
});

async function loadUserRecords() {
    try {
        const response = await fetch('http://localhost:3000/accounts');
        if (response.ok) {
            users = await response.json();
            console.log('Fetched users:', users);
            showUserRecords();
        } else {
            console.error('Failed to fetch user records:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user records:', error);
    }
}

function showUserRecords(data = users) {
    const tbody = document.querySelector('.user-table tbody');
    tbody.innerHTML = '';

    for (const user of data) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.accountname || ''}</td>
            <td>${user.firstname || ''} ${user.lastname || ''}</td>
            <td>${user.email || ''}</td>
            <td>${user.areacode || ''} ${user.phonenumber || ''}</td>
            <td>${user.subject || ''}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUserRecord(${users.indexOf(user)})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteUserRecord(${users.indexOf(user)})"><i class="bi bi-trash3-fill"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function searchUsers(keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    const filteredUsers = users.filter(user => {
        return user.accountname.toLowerCase().includes(lowerCaseKeyword) ||
               user.firstname.toLowerCase().includes(lowerCaseKeyword) ||
               user.lastname.toLowerCase().includes(lowerCaseKeyword) ||
               user.email.toLowerCase().includes(lowerCaseKeyword) ||
               user.areacode.toLowerCase().includes(lowerCaseKeyword) ||
               user.phonenumber.toLowerCase().includes(lowerCaseKeyword) ||
               user.subject.toLowerCase().includes(lowerCaseKeyword);
    });
    showUserRecords(filteredUsers);
}

function redirectToRegistration() {
    localStorage.removeItem('edit_user_index');
    window.location.href = 'http://127.0.0.1:5500/trainning-anh-pha/account-dashboard-app/registration-form/Registration.html';
}

function isValidUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
}

async function deleteUserRecord(index) {
    if (index < 0 || index >= users.length) {
        console.error('Invalid index:', index);
        return;
    }

    const user = users[index];

    if (!user || !isValidUUID(user.id)) {
        console.error('Invalid user ID:', user.id);
        return;
    }

    console.log(`Attempting to delete user with ID: ${user.id}`);

    const confirmDelete = confirm(`Are you sure that you want to delete the user "${user.firstname} ${user.lastname}"?`);
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:3000/accounts/${user.id}`, {
                method: 'DELETE'
            });

            const responseBody = await response.text();  // Get response body as text for debugging
            if (response.ok) {
                users.splice(index, 1);
                showUserRecords();
            } else {
                console.error('Failed to delete user record:', response.statusText, responseBody);
            }
        } catch (error) {
            console.error('Error deleting user record:', error);
        }
    }
}

function isValidUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
}

function editUserRecord(index) {
  const user = users[index];
  if (user) {
    const userId = user.id;

    if (!isValidUUID(userId)) {
      console.error('Invalid user ID:', userId);
      return;
    }

    window.location.href = `http://127.0.0.1:5500/trainning-anh-pha/account-dashboard-app/registration-form/Registration.html?id=${userId}`;
  } else {
    console.error("User not found at index:", index);
  }
}
