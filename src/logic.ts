// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
    name: string;
    price: number;
};

function filterAndSortProducts(products: Product[]): Product[] {
    const uniqueProducts = new Map<string, Product>();

    for (const product of products) {
        if (!uniqueProducts.has(product.name)) {
            uniqueProducts.set(product.name, product);
        }
    }

    return Array.from(uniqueProducts.values()).sort((a, b) => a.price - b.price);
}

module.exports = { filterAndSortProducts };
