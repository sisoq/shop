// details.js
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productRef = db.collection("products").doc(productId);

  try {
      const doc = await productRef.get();
      if (doc.exists) {
          const product = doc.data();
          document.getElementById("product-name").textContent = product.name;
          document.getElementById("product-price").textContent = `${product.price} $`;
          document.getElementById("product-description").textContent = product.description;
          document.getElementById("product-image").src = product.image;
      } else {
          console.log("No such document!");
      }
  } catch (error) {
      console.error("Error fetching product details: ", error);
  }
});
