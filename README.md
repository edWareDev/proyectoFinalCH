# Segunda entrega del proyectoFinalCH

## Revisar:

- Agregué el endpoint con método delete de carts. AHora se puede eliminar productos.
  - Ejemplo http://localhost:8080/api/carts/643da3a18ab80aae294dc44c/products/64414bbb75aff1278219fc8f
- Corregí para que el endpoint get entregue los datos solicitados
  - Ejemplo: http://localhost:8080/api/products?limit=2&page=1
- En el endpoint ./ Se puede usar los parametras limit, page, sort y query en el endponit.
  - Ejemplo: http://localhost:8080/?limit=5&page=2&sort=des
  - Ejemplo 2: http://localhost:8080/?limit=5&page=2&query=productStatus:true&sort=asc
