// --- 1. كود السلة (Cart System) ---
let cartCount = localStorage.getItem('totalCartItems') ? parseInt(localStorage.getItem('totalCartItems')) : 0;
const cartCountElement = document.getElementById('cart-count');
const addButtons = document.querySelectorAll('.product-card button');

// تحديث العداد عند فتح الصفحة
if(cartCountElement) cartCountElement.textContent = cartCount;

// تفعيل أزرار الإضافة
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        if(cartCountElement) cartCountElement.textContent = cartCount;
        localStorage.setItem('totalCartItems', cartCount);
        alert('تمت الإضافة للسلة! مجموع العناصر: ' + cartCount);
    });
});

// --- 2. كود تسجيل الدخول (Login System) ---
window.addEventListener('load', function() {
    // التأكد من تحميل الصفحة بالكامل قبل البحث عن العناصر
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');

    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const userNameDisplay = document.getElementById('user-name-display');

    // إذا لم يجد العناصر في الصفحة، يتوقف عن العمل لمنع الأخطاء
    if (!guestLinks || !userLinks) return;

    if (isLoggedIn === 'true' && userName) {
        // حالة: المستخدم مسجل دخول
        guestLinks.style.display = 'none';      // إخفاء أزرار الدخول
        userLinks.style.display = 'flex';       // إظهار اسم المستخدم وزر الخروج
        if(userNameDisplay) userNameDisplay.textContent = userName; // وضع الاسم
    } else {
        // حالة: زائر جديد
        guestLinks.style.display = 'flex';      // إظهار أزرار الدخول
        userLinks.style.display = 'none';       // إخفاء قسم المستخدم
    }
});

// دالة تسجيل الخروج
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    window.location.reload(); // إعادة تحميل الصفحة لتطبيق التغييرات
}
