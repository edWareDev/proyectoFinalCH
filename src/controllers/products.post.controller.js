import { productsManager } from "../dao/mongoose.products.manager.js";

export async function postProductsController(req, res, next) {
    const datosProductos = req.body;
    try {
        const result = await productsManager.addProduct(datosProductos);
        res.json(result);
        console.log('!ok');
    } catch (error) {
        res.json({ error: error.message });
    }
}
