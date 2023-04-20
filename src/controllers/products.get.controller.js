import { productsManager } from '../dao/mongoose.products.manager.js';

export async function getProductsController(req, res) {
    const queryParams = req.query;
    const allProducts = await productsManager.getProducts();
    const resultado = [];

    if (queryParams.limit) {
        for (let product = 0; product <= queryParams.limit - 1; product++) {
            if (allProducts[product]) {
                resultado.push(allProducts[product]);
            }
        }
        res.json(resultado);
    } else {
        res.json(allProducts);
    }
}
