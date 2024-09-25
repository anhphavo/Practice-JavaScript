let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', function () {
    showUserRecords();

    document.getElementById('search-text').addEventListener('input', () => {
        const searchText = document.getElementById('search-text').value;
        searchUsers(searchText);
    });
});

function showUserRecords(data = users) {
    let tbody = document.querySelector('.user-table tbody');
    tbody.innerHTML = '';

    for (let index = 0; index < data.length; index++) {
        let user = data[index];
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.accountName}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.areaCode} ${user.phoneNumber}</td>
            <td>${user.subject}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUserRecord(${index})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteUserRecord(${index})"><i class="bi bi-trash3-fill"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function searchUsers(keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    const filteredUsers = users.filter(user => {
        return user.account.toLowerCase().includes(lowerCaseKeyword) ||
               user.firstName.toLowerCase().includes(lowerCaseKeyword) ||
               user.lastName.toLowerCase().includes(lowerCaseKeyword) ||
               user.email.toLowerCase().includes(lowerCaseKeyword) ||
               user.areaCode.toLowerCase().includes(lowerCaseKeyword) ||
               user.phoneNumber.toLowerCase().includes(lowerCaseKeyword) ||
               user.select.toLowerCase().includes(lowerCaseKeyword);
    });
    showUserRecords(filteredUsers);
}

function redirectToRegistration() {
    localStorage.removeItem('edit_user_index');
    window.location.href = 'http://127.0.0.1:5500/trainning-anh-pha/registration-form/Registration.html';
}

function deleteUserRecord(index) {
    const user = users[index];
    const confirmDelete = confirm(`Are you sure that you want to delete the user "${user.firstName} ${user.lastName}"?`);
    if (confirmDelete) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        showUserRecords();
    }
}

function editUserRecord(index) {
    const user = users[index];
    if (user) {
        const userId = user.id;
        window.location.href = `http://127.0.0.1:5500/trainning-anh-pha/registration-form/Registration.html?id=${userId}`;
    } else {
        console.error("User not found at ID:", index);
    }
}   
