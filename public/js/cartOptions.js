const addToCartButton = document.querySelectorAll(".addToCart")
const updateCartButton = document.querySelector(".updateCart")
const createCartButton = document.querySelector("#createCart")


createCartButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const request = await fetch(`/api/carts/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        let cart = await request.json();
        alert('Se ha creado un nuevo carrito con el id: ' + cart._id)
        location.reload();
    } catch (error) {
        console.error(error);
    }
})
updateCartButton.addEventListener("click", () => getCartByID())

async function getCartByID() {
    try {
        let cartID = document.querySelector('#cartID').value.trim()
        if (cartID === '') {
            alert('No ha ingresado ningún ID de carrito')
            console.error('No ha ingresado ningún ID de carrito')
        } else {
            const response = await fetch(`/api/carts/${cartID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const productsOfCart = await response.json();
            console.log(productsOfCart);
            drawCart(productsOfCart)
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

if (addToCartButton instanceof NodeList) {
    addToCartButton.forEach(a => {
        a.addEventListener("click", async () => {
            let cartID = document.querySelector('#cartID').value.trim()
            if (cartID === '') {
                alert('No ha ingresado ningún ID de carrito')
                console.error('No ha ingresado ningún ID de carrito')
            } else {
                const idProduct = a.parentNode.getAttribute('id')
                try {
                    const request = await fetch(`/api/carts/${cartID}/product/${idProduct}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    let cart = await request.json();
                    drawCart(cart.products)
                } catch (error) {
                    console.error(error);
                }
            }
        })
    })
}

async function drawCart(products) {
    if (products.length > 0) {
        const allProductsOfCart = await Promise.all(products.map(async (item) => {
            const response = await fetch(`/api/products/${item.product}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            data.quantity = item.quantity;
            return data;
        }));
        allProductsOfCart.sort((a, b) => (a.productName > b.productName) ? 1 : -1)
        let precioTotal = allProductsOfCart.reduce((acumulador, objeto) => {
            return acumulador + (objeto.productPrice * objeto.quantity);
        }, 0);
        const template = `
        {{#each products}}
        <article class="card" id="{{this._id}}">
            <div class="card--data">
                <h3>{{this.productName}} - <small>US$</small><span class="price">{{this.productPrice}}</span> (cant:{{this.quantity}})</h3>
            </div>
            <button title="Quitar del Carrito" class="removeFromCart">
                <i class="fa-solid fa-cart-arrow-down"></i>
            </button>
        </article>
        {{/each}} 
            <div class="totalCart">
                <h2>Total: <small>US$</small><span class="price">{{precioTotal}}</span></h2>
            </div>`;
        const renderProducts = Handlebars.compile(template);
        document.querySelector(".cartItems").innerHTML = renderProducts({ products: allProductsOfCart, precioTotal });
    } else {
        const template = `<h3>No hay productos en este carrito</h3>`
        const renderProducts = Handlebars.compile(template);
        document.querySelector(".cartItems").innerHTML = renderProducts();
    }
}
