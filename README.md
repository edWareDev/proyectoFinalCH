# Segunda entrega del proyectoFinalCH

## Revisar:

- Agregué el endpoint con método put de carts. Ahora se puede actualizar directamente los productos y sus cantidades.
  - Ejemplo ​http://localhost:8080/api/carts/643880d76fe62a98ffa0c488 => req.body(json) => [
    {
    "product": "643481b998ad8b7556defb10",
    "quantity": 20
    },
    {
    "product": "643481e398ad8b7556defb1a",
    "quantity": 100
    }
    ]
- Agregué el endpoint con método put de carts. Ahora se puede actualizar directamente la cantidad.
  - Ejemplo http://localhost:8080/api/carts/643880d76fe62a98ffa0c488/products/643481e398ad8b7556defb1a => req.body(json) => {"quantity": 50}
- Agregué el endpoint con método delete de carts. Ahora se puede eliminar todos los productos del carrito.
  - Ejemplo http://localhost:8080/api/carts/643da3a18ab80aae294dc44c
- Agregué el endpoint con método delete de carts. Ahora se puede eliminar productos.
  - Ejemplo http://localhost:8080/api/carts/643da3a18ab80aae294dc44c/products/64414bbb75aff1278219fc8f
- Corregí para que el endpoint get entregue los datos solicitados
  - Ejemplo: http://localhost:8080/api/products?limit=2&page=1
- En el endpoint ./ Se puede usar los parametras limit, page, sort y query en el endponit.
  - Ejemplo: http://localhost:8080/?limit=5&page=2&sort=des
  - Ejemplo 2: http://localhost:8080/?limit=5&page=2&query=productStatus:true&sort=asc
