// --- إعدادات المتجر ---
const MY_PHONE_NUMBER = "9647724329890"; // 🔴 ضع رقمك هنا بدلاً من الاصفار (مع مفتاح العراق 964)

// --- 1. نظام السلة الذكي ---
// استرجاع السلة القديمة أو بدء سلة فارغة
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

updateCartUI();

// دالة إضافة منتج (يتم استدعاؤها من زر HTML)
function addToCart(productName, productPrice) {
    // إضافة المنتج للقائمة
    cart.push({ name: productName, price: productPrice });
    
    // حفظ السلة في الذاكرة
    localStorage.setItem('myCart', JSON.stringify(cart));
    
    // تحديث الشكل
    updateCartUI();
    
    alert(`تمت إضافة "${productName}" للسلة بنجاح!`);
}

// تحديث عداد السلة
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// --- 2. نظام الحجز والشراء (Checkout) ---
function checkout() {
    if (cart.length === 0) {
        alert("السلة فارغة! أضف منتجات أولاً.");
        return;
    }

    // حساب المجموع وتجهيز الفاتورة
    let total = 0;
    let message = "مرحباً، أريد تقديم طلب جديد:%0a"; // %0a تعني سطر جديد

    cart.forEach((item, index) => {
        total += item.price;
        message += `${index + 1}- ${item.name} (${item.price.toLocaleString()} د.ع)%0a`;
    });

    message += `%0a💰 *المجموع الكلي: ${total.toLocaleString()} د.ع*`;
    message += "%0a%0aيرجى تأكيد الحجز.";

    // التأكد من المستخدم قبل الإرسال
    let confirmBuy = confirm(`سلة المشتريات تحتوي على ${cart.length} منتجات.\nالمجموع: ${total.toLocaleString()} د.ع\n\nهل تريد إرسال الطلب عبر واتساب؟`);

    if (confirmBuy) {
        // فتح واتساب وإرسال الرسالة
        window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${message}`, '_blank');
        
        // (اختياري) تفريغ السلة بعد الطلب
        // cart = [];
        // localStorage.setItem('myCart', JSON.stringify(cart));
        // updateCartUI();
    }
}

// --- 3. نظام تسجيل الدخول (كما هو سابقاً) ---
window.addEventListener('load', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const userNameDisplay = document.getElementById('user-name-display');

    if (!guestLinks || !userLinks) return;

    if (isLoggedIn === 'true' && userName) {
        guestLinks.style.display = 'none';
        userLinks.style.display = 'flex';
        if(userNameDisplay) userNameDisplay.textContent = userName;
    } else {
        guestLinks.style.display = 'flex';
        userLinks.style.display = 'none';
    }
});

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}
