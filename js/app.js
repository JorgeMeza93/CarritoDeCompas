//VARIABLES

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];


function cargarEventListeners(){
    listaCursos.addEventListener("click", agregarCurso)
    carrito.addEventListener("click", eliminarCurso);
    botonVaciarCarrito.addEventListener("click", ()=>{
        articulosCarrito = [];
        limpiarCarritoHTNL();
    })
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
    const existe = articulosCarrito.some( articulo=>{
        return articulo.id === infoCurso.id     // <----- Verifica si un curso ya fue añadido previamente
    });
    if(existe){   // <---- Si el curso ya existe procedemos
        console.log("Ya existe");
        const cursosCarrito = articulosCarrito.map( articulo =>{   //<--- Crea un nuevo array con los resultados del arrow function
            if(articulo.id===infoCurso.id){
                articulo.cantidad++;        // <--- Si el curso existe retornamos el curso pero con cantidad modificaa
                return articulo;      
            }
            else{
                return articulo;  // Si no existe el curso lo retorna sin cambios 
            }
        });
        articulosCarrito = [...cursosCarrito];   //<--- El array sera igual 
    }
    else{
        articulosCarrito = [...articulosCarrito, infoCurso];  //<-- Si el curso no existe lo agrega al array con cantidad 1
    }
    
    construirCarritoHTML();
    console.log(infoCurso);
}

function construirCarritoHTML(){
    limpiarCarritoHTNL();
    articulosCarrito.forEach(articulo=>{
        const {imagen, nombre, precio, cantidad, id} = articulo;
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td><img src="${imagen}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}>X</td>
        `;
        contenedorCarrito.appendChild(tableRow);
    });
    
}

function limpiarCarritoHTNL(){
   while(contenedorCarrito.firstChild){
       contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}

function eliminarCurso(e){    
    if(e.target.classList.contains('borrar-curso')){                  //  <--Si el elemento contiene la clase borrar curso que 
        const cursoAEliminar = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter( curso=> curso.id !== cursoAEliminar)    // <----Eliminar del arreglo el articulo carrito
        construirCarritoHTML();  // <--- Llama de nuevo a la funcion para volver a costruir un html con los elementos actualizados del carrito
    }
}

cargarEventListeners()