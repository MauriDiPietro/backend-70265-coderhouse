export default class ProductReqDTO {
  constructor(product) {
    this.nombre = product.name;
    this.descripcion = product.description;
    this.precio = product.price;
    this.disponibilidad = product.stock;
  }
}

//---> ({name, description, price, stock}) --> { nombre, descripcion, precio, disponibilidad }