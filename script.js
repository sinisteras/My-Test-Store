// --- 1. قاعدة بيانات المنتجات (الأساس) ---
const allProducts = [
    {
        id: 1,
        name: "بدلة رسمية سوداء",
        price: 150000,
        image: "images/suit.jpg",
        description: "بدلة رسمية فاخرة مصنوعة من أجود أنواع الأقمشة الإيطالية. مناسبة للحفلات والاجتماعات الرسمية."
    },
    {
        id: 2,
        name: "قميص أبيض كلاسيك",
        price: 35000,
        image: "images/shirt.jpg",
        description: "قميص قطني 100% مريح جداً ومقاوم للتعرق. تصميم عصري يناسب البدلات والجينز."
    },
    {
        id: 3,
        name: "حذاء جلد طبيعي",
        price: 60000,
        image: "images/shoes.jpg",
        description: "حذاء مصنوع يدوياً من الجلد الطبيعي. أرضية طبية لراحة القدمين طوال اليوم."
    }
];

// --- 2. إدارة السلة والمستخدم ---
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

// تحديث أيقونة السلة في الهيدر
function updateCartIcon() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.reduce((total, item) => total + item.qty, 0);
}
updateCartIcon(); // تشغيل عند التحميل

// وظيفة الإضافة للسلة
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartIcon();
    alert('تمت الإضافة للسلة بنجاح!');
}

// --- 3. منطق الصفحة الرئيسية (index.html) ---
if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    const grid = document.querySelector('.products-grid');
    if (grid) {
        grid.innerHTML = allProducts.map(p => `
            <div class="product-card">
                <img src="${p.image}" onclick="goToProduct(${p.id})" style="cursor:pointer" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} د.ع</p>
                <button onclick="addToCart(${p.id})">أضف للسلة</button>
            </div>
        `).join('');
    }
}

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// --- 4. منطق صفحة المنتج (product.html) ---
if (window.location.pathname.includes('product.html')) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = allProducts.find(p => p.id === id);

    if (product) {
        document.getElementById('p-img').src = product.image;
        document.getElementById('p-name').textContent = product.name;
        document.getElementById('p-price').textContent = product.price.toLocaleString() + ' د.ع';
        document.getElementById('p-desc').textContent = product.description;
        document.getElementById('add-btn').onclick = () => addToCart(product.id);
    }
}

// --- 5. منطق صفحة السلة (cart.html) ---
if (window.location.pathname.includes('cart.html')) {
    renderCartPage();
}

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('final-total');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">السلة فارغة</td></tr>';
        totalEl.textContent = '0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price * item.qty;
        return `
            <tr>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td><button onclick="removeItem(${index})" style="background:red; padding:5px 10px;">X</button></td>
            </tr>
        `;
    }).join('');

    // التحقق من كود الخصم
    const discount = localStorage.getItem('discount') || 0;
    const finalTotal = total - (total * discount);
    totalEl.textContent = finalTotal.toLocaleString();
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty < 1) cart[index].qty = 1;
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCartPage();
    updateCartIcon();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCartPage();
    updateCartIcon();
}

function applyCoupon() {
    const code = document.getElementById('coupon-code').value;
    if (code === 'IQ2025') { // كود الخصم السري
        localStorage.setItem('discount', 0.10); // خصم 10%
        alert('تم تفعيل خصم 10%!');
        renderCartPage();
    } else {
        alert('كود غير صحيح');
    }
}

function checkoutWhatsApp() {
    let msg = "مرحباً، أريد إتمام الطلب:%0a";
    let total = 0;
    cart.forEach(item => {
        msg += `- ${item.name} (عدد ${item.qty})%0a`;
        total += item.price * item.qty;
    });
    msg += `%0aالإجمالي: ${document.getElementById('final-total').textContent} د.ع`;
    
    // غير الرقم هنا لرقمك
    window.open(`https://wa.me/9647724329890?text=${msg}`, '_blank');
}
