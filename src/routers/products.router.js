import { Router } from 'express';
import { postProductsController } from "../controllers/products.post.controller.js";
import { productsManager } from '../dao/mongoose.products.manager.js';
import { getProductsController } from '../controllers/products.get.controller.js';

export const productsRouter = Router();

productsRouter.get('/', getProductsController)

productsRouter.post('/', postProductsController)

productsRouter.get('/:pid', async (req, res) => {
    const productId = req.params.pid
    const product = await productsManager.getProductByID(productId)
    if (!productId || !product) {
        res.status(400).json({ error: "ID dont exist" })
    } else {
        res.json(product)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const newProps = await productsManager.updateProduct(req.params.pid, req.body)
        res.json(newProps)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await productsManager.deleteProduct(req.params.pid)
        console.log('LLegamoa aqui');
        res.json(deletedProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})