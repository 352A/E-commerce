// Load featured products on home page
if (document.getElementById("featured-products")) {
  const products = Product.getProducts();
  const featuredProducts = products.slice(0, 8); // Example: get the first 8 products
  const featuredProductsContainer =
    document.getElementById("featured-products");

  featuredProducts.forEach((product) => {
    const productCard = `
    <!-- card start -->
        <div class="card me-4">
          <img
            src="../assets/images/${product.imgName}"
            class="card-img-top rounded-2 mt-3"
            alt="${product.name}"
          />
          <div class="product-btns d-flex flex-column">
            <a id="add-to-cart" class="btn btn-primary rounded-5 mb-2" onclick="CartController.addToCart('${product.itemId}', 1); CartController.changeIcon(this);"
              ><i class="cart-icon bi bi-cart-plus-fill"></i>
            </a>
            <a class="btn btn-secondary rounded-5"
            onclick="WishlistController.addToWishlist('${product.itemId}'); WishlistController.changeIcon(this);"
              
              ><i class="bi bi-bag-heart"></i
            ></a>
          </div>
         <div class="card-body">
            <h6 class="mb-3">${product.name}</h6>
            <div class="d-flex flex-column align-items-start">
              <h4 class="mb-3"><span class="currency me-1">EGP</span>${product.price}</h4>
              <a
                href="productDetails.html?id=${product.itemId}"
                class="btn btn btn-outline-dark btn-sm"
                >View Details</a
              >
            </div>
          </div>
        </div>
        <!-- card end -->
              
          `;
    featuredProductsContainer.innerHTML += productCard;
  });
}
