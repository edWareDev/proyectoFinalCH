export class Product {
    constructor({ productName, productDescription, productPrice, productStatus, productCategory, productThumbnail, productCode, productStock }) {
        this.productName = productName
        this.productDescription = productDescription
        this.productPrice = productPrice
        this.productStatus = !!parseInt(productStatus)
        this.productCategory = productCategory
        this.productThumbnail = productThumbnail || []
        this.productCode = productCode
        this.productStock = productStock
    }
}