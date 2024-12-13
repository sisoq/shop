// randomproducts.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Function to display random products
export async function displayRandomProducts(containerId = "random-products-container") {
  const productsList = document.getElementById(containerId);
  if (!productsList) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }

  console.log("Clearing container content...");
  productsList.innerHTML = ""; // Clear previous content

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    console.log("Total products fetched:", products.length);

    // Select 5 random products
    const randomProducts = [];
    while (randomProducts.length < 5 && products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      randomProducts.push(products.splice(randomIndex, 1)[0]);
    }

    console.log("Selected products:", randomProducts);

    // Display random products
    randomProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("random-product-card");

      productCard.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.imageUrl}" alt="${product.name}" class="random-product-image">
          <div class="random-product-info">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
          </div>
        </a>
      `;
      productsList.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
