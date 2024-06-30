class ProductController{
    static getProductDetails(id){
        const products = Product.getProducts();
        return products.filter(product => product.id === id);
    }

}