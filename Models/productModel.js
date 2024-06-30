class Product {//
    constructor(id, name, image, price, description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    static getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    static addProduct(product) {
        const products = Product.getProducts();
        products.push(product);
        Product.saveProducts(products);
    }

    static getProductById(id) {
        const products = Product.getProducts();
        return products.find(product => product.id === id);
    }
}
