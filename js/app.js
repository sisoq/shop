// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { addDoc, collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized successfully!");

// دالة لإضافة منتج إلى Firebase مع تاريخ الإضافة
async function addProduct(name, price, description, imageUrl) {
  try {
    await addDoc(collection(db, "products"), {
      name: name,
      price: Number(price),
      description: description,
      imageUrl: imageUrl,
      dateAdded: new Date().toISOString() // حفظ التاريخ الحالي
    });
    alert("Product added successfully!");
    console.log("Product added to Firebase:", name);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// التعامل مع نموذج الإدخال في admin.html
if (window.location.pathname.includes('admin.html')) {
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const description = document.getElementById('description').value;
      const imageUrl = document.getElementById('imageUrl').value;
      addProduct(name, price, description, imageUrl); // إضافة المنتج إلى Firebase
      productForm.reset(); // إعادة تعيين النموذج بعد الإضافة
    });
  }
}

// دالة لعرض المنتجات من Firebase مع إمكانية الفلترة
async function displayProducts(sortBy = 'dateAdded', order = 'desc') {
  const productsList = document.getElementById('products-list');
  productsList.innerHTML = ""; // تفريغ القائمة قبل العرض

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    console.log("Products fetched from Firebase:", querySnapshot.size);

    if (querySnapshot.empty) {
      productsList.innerHTML = "<p>No products available.</p>";
      return;
    }

    const products = [];
    
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      products.push({
        id: doc.id,
        ...product
      });
    });

    // الفرز حسب الخيار المختار (السعر أو التاريخ)
    products.sort((a, b) => {
      if (sortBy === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'dateAdded') {
        return order === 'asc'
          ? new Date(a.dateAdded) - new Date(b.dateAdded)
          : new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });

    // عرض المنتجات بعد الفرز
    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">$${product.price}</p>
            <p class="product-date">Added on: ${new Date(product.dateAdded).toLocaleDateString()}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        </div>
      `;
      productsList.appendChild(productCard);
    });

    console.log("Products displayed on the page successfully.");

  } catch (e) {
    console.error("Error fetching products: ", e);
  }
}

function handleSortChange() {
  const sortFilter = document.getElementById("sortFilter").value;
  
  if (sortFilter === "lowPrice") {
    displayProducts('price', 'asc');
  } else if (sortFilter === "highPrice") {
    displayProducts('price', 'desc');
  } else if (sortFilter === "newest") {
    displayProducts('dateAdded', 'desc');
  } else if (sortFilter === "oldest") {
    displayProducts('dateAdded', 'asc');
  }
}

// استدعاء دالة العرض عند تحميل صفحة index.html
if (window.location.pathname.includes('index.html')) {
  window.onload = () => displayProducts('dateAdded', 'desc');
}



//