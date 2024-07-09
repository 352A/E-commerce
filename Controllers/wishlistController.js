class WishlistController {
  static addToWishlist(itemId) {
    Wishlist.addItem(new Wishlist(itemId));
  }

  static changeIcon(button) {
    const icon = button.querySelector("i.bi");

    if (icon.classList.contains("bi-bag-heart")) {
      icon.classList.remove("bi-bag-heart");
      icon.classList.add("bi-bag-heart-fill");
      button.classList.remove("btn-primary");
      button.classList.add("btn-danger");
    }
  }

  static renderWishlist() {
    let wishlistItems = Wishlist.getWishlistItems();
    wishlistItems = wishlistItems.reverse();
    const wishlistContainer = document.getElementById("wishlist-wrapper");
    wishlistContainer.innerHTML = "";
    if (wishlistItems.length > 0) {
      wishlistItems.forEach((item) => {
        const product = Product.getProductById(item.itemId);
        const wishlistItem = `
         <!-- card start -->
         
      <div class="card col-12 col-xl-2">
        <img
          src="../assets/images/${product.imgName}"
          class="wishlist-img card-img-top rounded-2 mt-3"
          alt="${product.name}"
        />
        <div class="product-btns d-flex flex-column">
          <a
            id="add-to-cart"
            class="btn btn-primary rounded-5 mb-2"
            onclick="CartController.addToCart('${product.itemId}', 1); CartController.changeIcon(this);"
            ><i class="bi bi-cart-plus-fill"></i>
          </a>
          <a class="btn btn-secondary rounded-5"
          onclick="WishlistController.addToWishlist('${product.itemId}'); wishlistController.changeIcon(this);"
            
            ><i class="bi bi-bag-heart-fill"></i
          ></a>
        </div>
        <div class="card-body">
          <h6 class="mb-3">${product.name}</h6>
          <div class="d-flex flex-column align-items-start">
            <h4 class="mb-3">
              <span class="currency me-1">EGP</span>${product.price}
            </h4>
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
        wishlistContainer.innerHTML += wishlistItem;
      });
    } else {
      wishlistContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-5 '>You haven't added any items to your wishlist.</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-heart'></i></div>`;
    }
  }
}
