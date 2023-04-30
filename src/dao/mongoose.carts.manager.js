import mongoose from "mongoose"
import { Cart } from "../entities/cart.js"
import { schemaCarts } from "./models/schemaCarts.js"

class CartsManager {
    #cartsDb
    constructor() {
        this.#cartsDb = mongoose.model('carts', schemaCarts)
    }

    async getCarts() {
        try {
            const allCarts = await this.#cartsDb.find().lean()
            return allCarts
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addCart() {
        try {
            const newCart = new Cart()
            console.log(newCart);
            const result = this.#cartsDb.create(newCart)
            return result
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async getCartByID(cartId) {
        try {
            const product = await this.#cartsDb.findById(cartId).lean()
            return product;
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async addProductsToCart(cartId, productId) {
        try {
            await this.#cartsDb.findOneAndUpdate(
                { _id: cartId, "products.product": productId },
                { $inc: { "products.$.quantity": 1 } },
                { returnOriginal: false }
            ).then(async (result) => {
                if (!result) {
                    await this.#cartsDb.findOneAndUpdate(
                        { _id: cartId },
                        {
                            $push: {
                                products: {
                                    product: productId,
                                    quantity: 1
                                }
                            }
                        },
                        { returnOriginal: false }
                    )
                }
            }).catch((error) => {
                throw new Error({ error: error.message });
            });

            const updatedCart = await this.getCartByID(cartId);
            return updatedCart;
        } catch (error) {
            throw new Error({ error: error.message });
        }
    }


    async deleteProductOfCart(cartId, productId) {
        console.log(cartId, productId);
        try {
            const cart = await this.getCartByID(cartId)
            const productIndex = cart.products.findIndex(product => product.product == productId)
            console.log('productIndex:', productIndex);
            console.log(cart.products);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito.')
            } else {
                console.log('producto Encontrado');
                cart.products.splice(productIndex, 1)
                await this.#cartsDb.updateOne({ _id: cartId }, { $set: { products: cart.products } })
            }
            return cart.products
        } catch (error) {
            throw new Error('No se puede eliminar el producto');
        }
    }
}

export const cartsManager = new CartsManager()
