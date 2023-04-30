import { productsManager } from '../dao/mongoose.products.manager.js';

export async function getProductsController(req, res) {
    const queryParams = req.query;
    const allProducts = await productsManager.getProducts();
    const products = await productsManager.getProductsWithFilters(queryParams.limit, queryParams.page, queryParams.query, queryParams.sort)
    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / queryParams.limit)
    const page = Number(queryParams.page) || 1
    let prevPage;
    let hasPrevPage;
    let nextPage;
    let hasNextPage;
    if (page >= 2) { prevPage = page - 1; hasPrevPage = true } else { prevPage = null; hasPrevPage = false }
    if (page == totalPages) { nextPage = null; hasNextPage = null } else { nextPage = page + 1; hasNextPage = true }

    const currentUrl = `${req.protocol}://${req.get('host')}/api/products`;
    let nextPageUrl = `${currentUrl}?`;
    let prevPageUrl = `${currentUrl}?`;
    for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
            const element = queryParams[key];
            if (key == 'page') {
                if (hasNextPage === true) {
                    nextPageUrl = nextPageUrl + `${key}=${nextPage}&`
                } else { nextPageUrl = null }
                if (hasPrevPage === true) {
                    prevPageUrl = prevPageUrl + `${key}=${prevPage}&`
                } else { prevPageUrl = null }
            } else {
                if (hasNextPage === true) {
                    nextPageUrl = nextPageUrl + `${key}=${element}&`
                } else { nextPageUrl = null }
                if (hasPrevPage === true) {
                    prevPageUrl = prevPageUrl + `${key}=${element}&`
                } else { prevPageUrl = null }
            }
        }
    }
    console.log(nextPageUrl);
    const finalResult = {
        status: 'success',
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page: page,
        hasPrevPage,
        hasNextPage,
        prevLink: prevPageUrl,
        nextLink: nextPageUrl
    }

    res.json(finalResult)
}
