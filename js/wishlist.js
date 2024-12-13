document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll('.product-card');
  const loadMoreButton = document.getElementById('loadMore');
  let visibleProducts = 20; // عدد المنتجات المعروضة أولاً
  const productsPerPage = 20; // عدد المنتجات التي سيتم عرضها عند كل نقرة

  // إخفاء جميع المنتجات ما عدا 20
  products.forEach((product, index) => {
      if (index >= visibleProducts) {
          product.style.display = 'none'; // إخفاء المنتجات التي تتجاوز العدد المحدد
      } else {
          product.style.display = 'block'; // عرض أول 20 منتجًا
      }
  });

  // التحقق من وجود الزر "أريد المزيد" قبل إضافة الحدث
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function () {
      // إظهار المنتجات التالية بناءً على العدد المحدد
      visibleProducts += productsPerPage;

      products.forEach((product, index) => {
          if (index < visibleProducts) {
              product.style.display = 'block'; // عرض المنتجات الإضافية
          }
      });

      // إذا تم عرض جميع المنتجات، إخفاء زر "أريد المزيد"
      if (visibleProducts >= products.length) {
          loadMoreButton.style.display = 'none'; // إخفاء الزر عند انتهاء جميع المنتجات
      }
    });
  }
});
