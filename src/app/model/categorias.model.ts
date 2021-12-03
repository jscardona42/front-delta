export class Categorias {
    constructor(id_categoria = undefined, nombre = "") {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
    }

    id_categoria?: number;
    nombre: string;
}