import fs from 'fs/promises'
import crypto from 'crypto'

export class CartManager {
    constructor(path) {
        this.path = path
    }
    async getCarts() {
        try {
            const db = await fs.readFile(this.path)
            return await JSON.parse(db)
        } catch (error) {
            throw new Error(`Error reading file ${this.path}: ${error}`)
        }
    }
    async addCart({ products }) {
        // if (!Array.isArray(products)) {
        //     throw new Error('No products selected')
        // } else {
        try {
            const allCarts = await this.getCarts();
            const newCart = {
                id: crypto.randomUUID(),
                products: products || []
            }
            allCarts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(allCarts, null, 2))
            return newCart
        } catch (error) {
            throw new Error({ error: error.message })
        }
        // }
    }
    async getCartByID(id) {
        const allCarts = await this.getCarts();
        try {
            const cart = allCarts.find(cart => cart.id === id)
            if (!cart) {
                console.log('No hay carrito aqui');
                throw new Error('This cart does not exist');
            } else {
                return cart;
            }
        } catch (error) {
            return { error: 'This cart does not exist' }
        }
    }
    async addProductsToCart(cartId, newProducts, productId) {
        const allCarts = await this.getCarts();
        const cartIndex = allCarts.findIndex(cart => cart.id === cartId);
        if (cartIndex !== -1) {
            const cartSelected = allCarts[cartIndex];
            const productSelected = cartSelected.products.find(product => product.product === productId)
            if (productSelected) {
                productSelected.quantity++
            } else {
                cartSelected.products.push({ product: productId, quantity: 1 })
            }

            await fs.writeFile(this.path, JSON.stringify(allCarts, null, 2))
            console.log('Changes has been changed succesfully');
            return allCarts[cartIndex];
        } else {
            throw new Error('This cart does not exist');
        }
    }
    async deleteProductOfCart(id, productId) {
        const allCarts = await this.getCarts();
        const cartIndex = allCarts.findIndex(cart => cart.id === id);
        if (cartIndex !== -1) {
        } else {
            throw new Error('This product does not exist');
        }
    }
}