const body = document.querySelector("body");

const formManageProduct = document.querySelector('#formManageProduct');
if (formManageProduct instanceof HTMLFormElement) {
    formManageProduct.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.querySelector('#saveButton').classList[0]
        console.log(id);
        const formData = new FormData(formManageProduct);
        const sendProps = formManageProduct.classList.contains('create') ? { url: '/api/products', method: 'POST' } : { url: `/api/products/${id}`, method: 'PUT' };
        let data = {}
        formData.forEach((value, key) => { data[key] = value })
        // Thumbnail Por mientras vacio
        data.productThumbnail = null
        console.log(sendProps);
        const response = await fetch(sendProps.url, {
            method: sendProps.method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            data = await response.json();
            window.location.reload()
        } else {
            console.error(data.error);
            alert(data.error)
        }
    })
}

const addProductButton = document.querySelector('#addButon')
addProductButton.addEventListener('click', (e) => {
    e.preventDefault();
    formManageProduct.classList.add('create')
    formManageProduct.classList.remove('edit')
    document.querySelector('.formContainer').classList.toggle('invisible');
    body.style.overflow = "hidden";
})

const cancelButton = document.querySelector('#cancelButton')
cancelButton.addEventListener('click', (e) => {
    document.querySelector('.formContainer').classList.toggle('invisible')
    body.style.overflow = "auto";
})

const editProductButton = document.querySelectorAll(".editProduct")
if (editProductButton instanceof NodeList) {
    editProductButton.forEach(e => {
        const productId = e.parentElement.parentElement.getAttribute('id')
        e.addEventListener("click", async () => {
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    data = await response.json();
                    console.log(data);
                    document.querySelector('.formContainer').classList.toggle('invisible')
                    body.style.overflow = "hidden";

                    // Rellenar datos obtenidos de la base de datos en el form
                    document.querySelector('#productName').value = data.productName;
                    document.querySelector('#productDescription').value = data.productDescription;
                    document.querySelector('#productPrice').value = data.productPrice;
                    document.querySelector('#productPrice').value = data.productPrice;
                    document.querySelector('#productStatus').value = +data.productStatus;
                    document.querySelector('#productCategory').value = data.productCategory;
                    document.querySelector('#productCode').value = data.productCode;
                    document.querySelector('#productStock').value = data.productStock;

                    // Poner la clase para que el formulario sepa que hacer:
                    document.querySelector('#saveButton').classList.add(data._id)
                    formManageProduct.classList.add('edit')
                    formManageProduct.classList.remove('create')
                } else {
                    // Manejar errores de respuesta HTTP no exitosos
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                // Agregar un mensaje de error al usuario
                if (error instanceof TypeError && error.message.includes('NetworkError')) {
                    alert('No se pudo conectar con el servidor. Por favor, revise su conexión a internet e inténtelo de nuevo más tarde.');
                } else {
                    alert('Error al obtener los detalles del producto. Por favor, inténtelo de nuevo más tarde.');
                }
            }
        })
    })
}

const deleteProductButton = document.querySelectorAll(".deleteProduct")
if (deleteProductButton instanceof NodeList) {
    deleteProductButton.forEach(e => {
        const productId = e.parentElement.parentElement.getAttribute('id')
        e.addEventListener("click", async () => {
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    data = await response.json();
                    window.location.reload()
                } else {
                    console.error(data.error);
                    alert(data.error)
                }
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                // Agregar un mensaje de error al usuario
                if (error instanceof TypeError && error.message.includes('NetworkError')) {
                    alert('No se pudo conectar con el servidor. Por favor, revise su conexión a internet e inténtelo de nuevo más tarde.');
                } else {
                    alert('Error al obtener los detalles del producto. Por favor, inténtelo de nuevo más tarde.');
                }
            }
        })
    })
}