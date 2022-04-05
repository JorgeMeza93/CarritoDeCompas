//VARIABLES

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");


function cargarEventListeners(){
    listaCursos.addEventListener("click", agregarCurso)

}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatos(cursoSeleccionado);
    }
}

function leerDatos(curso){
    //Información sobre el curso actual
    const infoCurso = {
        imagen: curso.querySelector(".imagen-curso").src,
        nombre: curso.querySelector(".info-card h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    console.log(infoCurso);
}

cargarEventListeners()