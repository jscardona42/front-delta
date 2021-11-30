export class Subcategorias {
    constructor(id_subcategoria = undefined, nombre = "") {
        this.id_subcategoria = id_subcategoria;
        this.nombre = nombre;
    }

    id_subcategoria?: number;
    nombre: string;
}