// دالة لتسجيل بيانات المستخدم
function saveUserInfo(event) {
    event.preventDefault(); // منع السلوك الافتراضي للنموذج

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const homeAirport = document.getElementById('home-airport').value;
    const email = document.getElementById('email').value;

    // التحقق من تطابق كلمات المرور
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // تخزين بيانات المستخدم في localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
    localStorage.setItem('homeAirport', homeAirport);

    alert('Registration successful!');
    window.location.href = 'login.html';
}

// دالة لتسجيل الدخول
function handleLogin(event) {
    event.preventDefault(); // منع السلوك الافتراضي للنموذج

    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // التحقق من صحة البيانات
    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        window.location.href = 'destinations.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // الحصول على البيانات المخزنة
    const username = localStorage.getItem('username') || 'Guest';
    const email = localStorage.getItem('email') || 'Not provided';
    const homeAirport = localStorage.getItem('homeAirport') || 'Not provided';

    // تحديث العناصر في صفحة البروفايل
    if (document.getElementById('username')) {
        document.getElementById('username').textContent = username;
    }
    if (document.getElementById('email')) {
        document.getElementById('email').textContent = email;
    }
    if (document.getElementById('airport')) {
        document.getElementById('airport').textContent = homeAirport;
    }

    // تحديث الصورة الرمزية
    const avatarCircle = document.querySelector('.avatar-circle span');
    if (avatarCircle && username !== 'Guest') {
        avatarCircle.textContent = username.charAt(0).toUpperCase();
    }
});


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
document.addEventListener('DOMContentLoaded', function () {
    // استرجاع البيانات المخزنة
    const storedUsername = localStorage.getItem('username') || '';
    const storedEmail = localStorage.getItem('email') || '';

    // تعيين القيم الافتراضية للحقول
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('emailInput');

    if (nameInput) nameInput.value = storedUsername;
    if (emailInput) emailInput.value = storedEmail;

    // تحديث الحقول المعروضة في البروفايل
    const profileUsername = document.getElementById('username');
    const profileEmail = document.getElementById('email');

    if (profileUsername) profileUsername.innerText = storedUsername || 'Guest';
    if (profileEmail) profileEmail.innerText = storedEmail || 'Not provided';
});

function applyChanges() {
    // جلب البيانات من الحقول
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('emailInput').value;

    // تحديث البيانات في البروفايل
    document.getElementById('username').innerText = nameInput;
    document.getElementById('email').innerText = emailInput;

    // تحديث البيانات في localStorage
    localStorage.setItem('username', nameInput);
    localStorage.setItem('email', emailInput);

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

document.addEventListener('DOMContentLoaded', function () {
    // عند تحميل الصفحة، تأكد من أن القسم الذي سيتم عرضه هو "account"
    showSection('account');
});

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
        window.location.href = "index.html";
    }
    // وبالتالي لو ضغط على cancel بيرجع لنفس صفحة البروفايل عادي
}

document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذجٍ

    // عرض رسالة التأكيد
    alert('Booking successfully!');
    window.location.href = "booking.html";
});