import mongoose from "mongoose"
import { Product } from "../entities/product.js"
import { schemaProducts } from "./models/schemaProducts.js"

class ProductsManager {
    #productsDb
    constructor() {
        this.#productsDb = mongoose.model('products', schemaProducts)
    }

    async getProducts(limit = 10, page = 1, query = 'all', sort = 'none') {
        console.log(arguments);
        try {
            const sortMap = {
                'none': undefined,
                'asc': (a, b) => a.productPrice - b.productPrice,
                'des': (a, b) => b.productPrice - a.productPrice
            };

            const sortQuery = sortMap[sort];
            const queryFilter = query !== 'all' ? { productCategory: query } : {};

            const allProducts = await this.#productsDb
                .find(queryFilter)
                .skip(limit * (page - 1))
                .lean();

            if (sortQuery) {
                console.log(sortQuery);
                allProducts.sort(sortQuery);
            }

            const productsToReturn = allProducts.slice(0, limit);

            return productsToReturn;
        } catch (error) {
            const errorMessage = `Error occurred while fetching products: ${error.message}`;
            throw new Error(errorMessage);
        }

    }


    async addProduct(product) {
        if (!product.productName || !product.productDescription || !product.productPrice || !product.productStatus || !product.productCategory || !product.productCode || !product.productStock) {
            throw new Error('All fields are required')
        } else {
            const allProducts = await this.getProducts();
            const newProduct = new Product(product)
            if (allProducts.find(product => product.productCode === newProduct.productCode)) {
                throw new Error('Product code already exists')
            } else {
                if (typeof (newProduct.productStatus) !== 'boolean') {
                    newProduct.productStatus = true;
                }
                const result = this.#productsDb.create(newProduct)
                return result
            }
        }
    }
    async getProductByID(id) {
        try {
            const product = this.#productsDb.findById(id).lean()
            return product;
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
    async updateProduct(productId, newProps) {
        try {
            const product = await this.#productsDb.findOneAndUpdate(
                { _id: productId },
                { $set: newProps },
                { returnOriginal: false }
            ).catch((error) => {
                throw new Error({ error: error.message });
            });
            return product;
        } catch (error) {
            throw new Error({ error: error.message });
        }
    }
    async deleteProduct(id) {
        try {
            const deletedProduct = await this.#productsDb.findByIdAndDelete(id).lean()
            return deletedProduct;
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }
}

export const productsManager = new ProductsManager()