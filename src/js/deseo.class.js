export class Deseo {

    static fromJson(deseo) {

        const deseoTemp = new Deseo(deseo);

        deseoTemp.id = deseo.id;
        deseoTemp.fecha = deseo.fecha;

        return deseoTemp;
    }

    constructor(deseo) {
        const { titulo, mensaje, imagen } = deseo;
        this.id = new Date().getTime();
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.imagen = imagen;
        this.fecha = new Date();
    }

}