import { Deseo } from './deseo.class.js'


// Cloudinary
const cloudPreset = 'djp888j0';
const cluodUrl = 'https://api.cloudinary.com/v1_1/taggingsince2020/upload'


const body = document.body;
const padreDeseos = document.querySelector('#padre-deseos');
const btnNuevoDeseo = document.querySelector('#btnNuevoDeseo');
const inputArchivo = document.querySelector('#inputGroupFile04');
const inputTitulo = document.querySelector('#exampleFormControlInput1');
const inputMensaje = document.querySelector('#exampleFormControlTextarea1');
const btnPedirDeseo = document.querySelector('#btnPedirDeseo');
const formPedirDeseo = document.querySelector('#formPedirDeseo');
const modalPedirDeseo = new bootstrap.Modal(document.querySelector('#pedirDeseo'));
let archivo;
let BD;


const insertarDeseo = (deseo) => {


    const html = `
    <div class="col">
        <div class="card">
            <img src="${deseo.imagen}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${deseo.titulo}</h5>
                <p class="card-text">${deseo.mensaje}</p>
            </div>
        </div>
    </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    padreDeseos.append(div.firstElementChild)
}

const cargarBaseDatos = () => {

    const deseosLocalStorage = (localStorage.getItem('deseos')) ?
        JSON.parse(localStorage.getItem('deseos')) :
        [];
    BD = deseosLocalStorage.map(obj => {
        return Deseo.fromJson(obj)
    })
    // console.log(BD);
    BD.forEach(obj=>{
        insertarDeseo(obj)
    })

}

const servicioSubirImagen = async (imagen) => {

    const formData = new FormData();
    formData.append('upload_preset', cloudPreset);
    formData.append('file', imagen);

    try {
        const resp = await fetch(cluodUrl, {
            method: 'POST',
            body: formData
        })
        if (resp.ok) {
            const cloudResp = await resp.json()
            return cloudResp.secure_url;
        } else {
            throw await resp.json()
        }
    } catch (err) {
        throw err;
    }
}



const eventos = () => {
    inputArchivo.addEventListener('change', (event) => {
        archivo = event.target.files[0];
        // subirImagen(file).then(resp=>{
        //     imgFoto.src = resp
        // })
    })

    btnPedirDeseo.addEventListener('click', (event) => {
        formPedirDeseo.reset();
    })

    btnNuevoDeseo.addEventListener('click', (event) => {
        if (inputTitulo.value && inputMensaje.value && archivo) {
            servicioSubirImagen(archivo).then(url => {
                const deseoPedir = {
                    titulo: inputTitulo.value,
                    mensaje: inputMensaje.value,
                    imagen: url
                }
                modalPedirDeseo.hide();
                const deseo = new Deseo(deseoPedir);
                insertarDeseo(deseo);
                BD.push(deseo);
                localStorage.setItem('deseos', JSON.stringify(BD))
                console.log(BD);
            })
        } else {
            console.log(false);
        }
    })

}

export {
    insertarDeseo,
    eventos,
    servicioSubirImagen,
    cargarBaseDatos
}