export default class ProductResDTO {
    constructor(product) {
      this.nombre_prod = product.nombre;
      this.descripcion_prod = product.descripcion;
      this.precio_venta = product.precio;
      this.disponibilidad_stock = product.disponibilidad;
      this.date = new Date().toLocaleDateString();
    }
  }