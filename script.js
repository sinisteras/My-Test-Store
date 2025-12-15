// 1. تعريف متغير لحفظ عدد المنتجات في السلة
let cartCount = 0;

// 2. الحصول على عنصر العداد من صفحة HTML
const cartCountElement = document.getElementById('cart-count');

// 3. الحصول على جميع أزرار "أضف للسلة"
// querySelectorAll تختار كل العناصر التي تطابق مُحدد CSS
const addButtons = document.querySelectorAll('.product-card button');

// 4. دالة (Function) لتحديث العداد
function updateCartCount() {
    // تحديث المحتوى النصي لعنصر العداد بالقيمة الجديدة
    cartCountElement.textContent = cartCount;
}

// 5. ربط حدث النقر بكل زر من الأزرار
// نستخدم حلقة (loop) للمرور على كل الأزرار المجمعة
addButtons.forEach(button => {
    // إضافة مستمع للحدث (Event Listener) لكل زر
    button.addEventListener('click', () => {
        // زيادة عدد المنتجات
        cartCount++; 
        
        // تحديث عرض العداد على الشاشة
        updateCartCount();
        
        // رسالة إرشادية للمستخدم (يمكنك إزالتها لاحقاً)
        alert('تم إضافة المنتج إلى السلة! العدد الإجمالي: ' + cartCount);
    });
});
// 1. إعداد المتغيرات
let cartCount = localStorage.getItem('totalCartItems') ? parseInt(localStorage.getItem('totalCartItems')) : 0;
const cartCountElement = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart-container'); // أيقونة السلة
const addButtons = document.querySelectorAll('.product-card button');

// 2. تحديث العداد عند فتح الصفحة
updateCartCount();

function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// 3. برمجة أزرار "أضف للسلة"
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
        localStorage.setItem('totalCartItems', cartCount);
        
        // تأثير بصري بسيط عند الإضافة
        button.textContent = "تمت الإضافة ✓";
        button.style.backgroundColor = "#28a745"; // لون أخضر
        setTimeout(() => {
            button.textContent = "أضف للسلة";
            button.style.backgroundColor = "#007bff"; // رجوع للون الأزرق
        }, 1000);
    });
});

// 4. برمجة عملية "إتمام الطلب" عند الضغط على أيقونة السلة
cartContainer.addEventListener('click', () => {
    
    // أ. التأكد أن السلة ليست فارغة
    if (cartCount === 0) {
        alert("السلة فارغة! اختر بعض منتجات Urban Gent أولاً.");
        return;
    }

    // ب. طلب العنوان من الزبون
    let customerAddress = prompt("لإكمال الطلب، يرجى كتابة عنوان التوصيل (المنطقة، أقرب نقطة دالة):");

    // ج. إذا قام الزبون بكتابة العنوان وضغط موافق
    if (customerAddress) {
        // رقم الواتساب الخاص بك (استبدل الأصفار برقمك مع مفتاح العراق 964)
        let phoneNumber = "9647724329890"; 
        
        // تجهيز نص الرسالة
        let message = `مرحباً Urban Gent،\nأرغب بطلب عدد (${cartCount}) قطع.\n📍 عنوان التوصيل: ${customerAddress}`;
        
        // تحويل النص لرابط واتساب
        let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // فتح الرابط في نافذة جديدة
        window.open(whatsappUrl, '_blank');
        
        // تصفير السلة بعد الطلب (اختياري)
        // cartCount = 0;
        // updateCartCount();
        // localStorage.setItem('totalCartItems', 0);
    }
});
// --- الجزء الأول: السلة (موجود سابقاً) ---
let cartCount = localStorage.getItem('totalCartItems') ? parseInt(localStorage.getItem('totalCartItems')) : 0;
const cartCountElement = document.getElementById('cart-count');
const addButtons = document.querySelectorAll('.product-card button');

updateCartCount();

function updateCartCount() {
    if(cartCountElement) cartCountElement.textContent = cartCount;
}

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
        localStorage.setItem('totalCartItems', cartCount);
        alert('تمت الإضافة للسلة!');
    });
});

// --- الجزء الجديد: إدارة حالة تسجيل الدخول ---

// 1. التحقق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkLoginState();
});

function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const userNameDisplay = document.getElementById('user-name-display');

    if (isLoggedIn === 'true' && userName) {
        // المستخدم مسجل دخول
        if(guestLinks) guestLinks.style.display = 'none'; // إخفاء أزرار الدخول
        if(userLinks) userLinks.style.display = 'flex';   // إظهار اسم المستخدم
        if(userNameDisplay) userNameDisplay.textContent = userName; // وضع الاسم
    } else {
        // المستخدم زائر
        if(guestLinks) guestLinks.style.display = 'flex';
        if(userLinks) userLinks.style.display = 'none';
    }
}

// 2. دالة تسجيل الخروج (يتم استدعاؤها عند الضغط على زر "خروج")
function logoutUser() {
    // مسح حالة الدخول فقط (يمكنك مسح الاسم أيضاً إذا أردت)
    localStorage.removeItem('isLoggedIn');
    
    alert('تم تسجيل الخروج بنجاح');
    
    // إعادة تحميل الصفحة لتطبيق التغييرات
    window.location.reload();
}