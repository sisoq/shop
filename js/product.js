import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBiFmMXh7lChc7-AXyGf9NA-90GQ1hk80",
  authDomain: "shop-fifa.firebaseapp.com",
  projectId: "shop-fifa",
  storageBucket: "shop-fifa.firebasestorage.app",
  messagingSenderId: "1047710864451",
  appId: "1:1047710864451:web:305977be0b98f419a630f6"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// دالة لعرض تفاصيل المنتج
async function displayProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const product = docSnap.data();
            document.getElementById('product-image').src = product.imageUrl;
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-price').innerText = `$${product.price}`;
            document.getElementById('product-description').innerText = product.description;

            // إضافة المنتج إلى سلة التسوق عند النقر على الزر
            document.getElementById('add-to-cart-button').addEventListener('click', () => {
                addToCart(productId, product.name, product.price, product.imageUrl);
            });

        } else {
            document.getElementById('product-details').innerHTML = "<p>Product not found.</p>";
        }
    } else {
        document.getElementById('product-details').innerHTML = "<p>No product ID provided.</p>";
    }
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = displayProduct;
