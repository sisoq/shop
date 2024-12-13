// دالة لإضافة المنتجات إلى السلة
function addToCart(productId, productName, productPrice, productImage) {
  // التحقق من صحة البيانات
  if (!productId || !productName || !productPrice || !productImage) {
    alert('منتج غير صالح. تأكد من جميع التفاصيل!');
    return;
  }

  // الحصول على السلة الحالية من LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
  const existingProduct = cart.find(product => product.id === productId);
  
  if (existingProduct) {
    // إذا كان المنتج موجودًا بالفعل، قم بزيادة الكمية
    existingProduct.quantity += 1;
  } else {
    // إذا كان المنتج غير موجود، أضفه إلى السلة
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }

  // تحديث LocalStorage بالسلة المحدثة
  localStorage.setItem('cart', JSON.stringify(cart));

  // عرض رسالة تؤكد الإضافة
  alert('تمت إضافة المنتج بنجاح!');
}

// دالة لعرض محتويات السلة في صفحة cart.html
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  cartItemsContainer.innerHTML = ''; // تفريغ المحتوى السابق

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
  } else {
    let total = 0;
    cart.forEach(product => {
      // التحقق من وجود جميع البيانات
      if (product.name && product.price && product.image && product.quantity) {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="cart-item-image">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Quantity: ${product.quantity}</p>
          <button onclick="removeFromCart('${product.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(productElement);

        total += product.price * product.quantity;
      } else {
        console.error('منتج غير صالح:', product);
      }
    });

    cartTotalElement.innerText = `Total: $${total}`;
  }
}

// دالة لإزالة المنتجات من السلة
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // التحقق من وجود المنتج في السلة
  const productExists = cart.some(product => product.id === productId);
  if (!productExists) {
    alert('المنتج غير موجود في السلة');
    return;
  }

  // حذف المنتج من السلة
  cart = cart.filter(product => product.id !== productId);

  // تحديث LocalStorage بالسلة الجديدة
  localStorage.setItem('cart', JSON.stringify(cart));

  // إعادة عرض السلة بعد الحذف
  displayCart();
}

// دالة لتحديث الكمية في السلة
function updateQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // التحقق من وجود المنتج في السلة
  const product = cart.find(product => product.id === productId);
  if (!product) {
    alert('المنتج غير موجود في السلة');
    return;
  }

  // تحديث الكمية
  if (newQuantity > 0) {
    product.quantity = newQuantity;
  } else {
    // إذا كانت الكمية أقل من 1، قم بحذف المنتج
    cart = cart.filter(product => product.id !== productId);
  }

  // تحديث LocalStorage بالسلة الجديدة
  localStorage.setItem('cart', JSON.stringify(cart));

  // إعادة عرض السلة بعد التحديث
  displayCart();
}

// دالة لحساب الإجمالي في السلة
function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  cart.forEach(product => {
    if (product.price && product.quantity) {
      total += product.price * product.quantity;
    }
  });

  return total;
}

// دالة لعرض الإجمالي في السلة
function displayTotal() {
  const total = calculateTotal();
  const cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.innerText = `Total: $${total}`;
}

// عرض السلة بمجرد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  displayCart();
  displayTotal();
});
