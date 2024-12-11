// بيانات وهمية موقتا يعني 
let username = "Youssef";
let email = "youssef.yo8.2005@gmail.com";
let airport = "none";
// تبديل الأقسام
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.profile-nav li').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.profile-nav li[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// تعديل البيانات
function editField(fieldId) {
    let inputField = document.getElementById(fieldId);
    inputField.focus();
}

// تحديث البيانات فوق
function applyChanges() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('emailInput').value;

    document.getElementById('username').innerText = nameInput;
    document.getElementById('email').innerText = emailInput;

    alert('Changes Applied!');
}

        
// تعديل المكان
function editProfileDetails() {
let newAirport = prompt("Home airport:", airport);
if (newAirport) {
    airport = newAirport;
    document.getElementById("airport").textContent = airport;
    }
}

// تغيير الصورة الشخصية
function changeAvatar() {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    
    fileInput.onchange = function(event) {
        let reader = new FileReader();
        reader.onload = function(e) {
            // تحديث الصورة داخل البلوك بتاعها عشان تفضل في المساحة المحدده ليها
            let avatarImg = document.querySelector(".avatar-circle img");
            avatarImg.src = e.target.result;
            avatarImg.style.display = "block";
            // إخفاء الحرف إذا تم وضع صورة
            document.querySelector(".avatar-circle span").style.display = "none";
        };
    reader.readAsDataURL(fileInput.files[0]);
    };
    fileInput.click();
}

// dashboard جزء
function updateStats() {
    let trips = JSON.parse(localStorage.getItem("userTrips")) || [];

    // تحديث الإحصائيات
    document.getElementById("nextTrips").textContent = trips.length;
    document.getElementById("lastReservation").textContent = trips.length > 0 
        ? trips[trips.length - 1].flightNumber 
        : "-";
}

//تحديث الجدول لما يحصل بوك لرحلة جديده
function updateSchedule() {
    let trips = JSON.parse(localStorage.getItem("userTrips")) || [];
    let tableBody = document.getElementById("scheduleTableBody");
    tableBody.innerHTML = ""; // مسح الجدول القديم

    trips.forEach((trip) => {
        let row = `
            <tr>
                <td>${trip.flightNumber}</td>
                <td>${trip.destination}</td>
                <td>${trip.history}</td>
                <td>${trip.status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    if (trips.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">no data</td></tr>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    updateSchedule();
});

document.addEventListener("DOMContentLoaded", () => {
    // عناصر HTML
const addTravellerBtn = document.getElementById('add-traveller-btn');
const travellerFormContainer = document.getElementById('traveller-form-container');
const travellerForm = document.getElementById('traveller-form');
const cancelBtn = document.getElementById('cancel-btn');
const travellersTableBody = document.querySelector('#travellers-table tbody');
const formTitle = document.getElementById('form-title');

// بيانات المستخدمين
let travellers = [];
let editingIndex = null;

// عرض فورم الإضافة اوالتعديل
function showForm(isEditing = false) {
    travellerForm.reset(); // إعادة تعيين الفورم
    travellerFormContainer.classList.remove('hidden');
    formTitle.textContent = isEditing ? 'Edit Traveller' : 'Add New Traveller';
}

// إخفاء الفورم
function hideForm() {
    travellerFormContainer.classList.add('hidden');
    editingIndex = null;
}

// إضافة مسافر جديد
function addTraveller(traveller) {
    travellers.push(traveller);
    renderTravellers();
}

// تحديث بيانات مسافر
function updateTraveller(index, updatedTraveller) {
    travellers[index] = updatedTraveller;
    renderTravellers();
}

// حذف مسافر
function deleteTraveller(index) {
    travellers.splice(index, 1);
    renderTravellers();
}

// عرض المسافرين في الجدول
function renderTravellers() {
    travellersTableBody.innerHTML = ''; // مسح بيانات الحدول ان وجد

    travellers.forEach((traveller, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${traveller.name}</td>
            <td>${traveller.dob}</td>
            <td>${traveller.passport}</td>
            <td>${traveller.phone}</td>
            <td>
                <button class="edit-btnB">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // تفعيل زرارين الايديت والديليت
        const editBtn = row.querySelector('.edit-btnB');
        editBtn.addEventListener('click', () => editTraveller(index));

        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTraveller(index));

        travellersTableBody.appendChild(row);
    });
}

// تعديل بيانات مسافر
function editTraveller(index) {
    const traveller = travellers[index];
    document.getElementById('traveller-name').value = traveller.name;
    document.getElementById('traveller-dob').value = traveller.dob;
    document.getElementById('traveller-passport').value = traveller.passport;
    document.getElementById('traveller-phone').value = traveller.phone;
    editingIndex = index;
    showForm(true);
}

// عند الضغط على حفظ في الفورم
travellerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('traveller-name').value;
    const dob = document.getElementById('traveller-dob').value;
    const passport = document.getElementById('traveller-passport').value;
    const phone = document.getElementById('traveller-phone').value;

    const traveller = { name, dob, passport, phone };

    if (editingIndex !== null) {
        updateTraveller(editingIndex, traveller);
    } else {
        addTraveller(traveller);
    }

    hideForm();
});

// إخفاء الفورم عند الضغط على كانسل
cancelBtn.addEventListener('click', hideForm);

// عرض الفورم عند الضغط على إضافة مسافر"
addTravellerBtn.addEventListener('click', () => showForm(false));
});

// ده جزء ال log out
function handleLogout() {
    // إظهار رسالة التأكيد
    let confirmLogout = confirm("Are you sure you want to log out?");
    
    // لو ضغط المستخدم على اوك
    if (confirmLogout) {
        // الانتقال إلى صفحة تسجيل الدخول
        window.location.href = "login.html";
    }
    // وبالتالي لو ضغط على cancel بيرجع لنفس صفحة البروفايل عادي
}
