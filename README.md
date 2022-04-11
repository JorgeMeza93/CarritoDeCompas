# CarritoDeCompas
Creación de un carrito de compras utilizando JavaScript

Ahora que tenemos construìdo el objeto con los datos del curso procedemos a almacenar ese curso en el carrito de Compras
Para eso declaramos una variable llamada articulosCarrito como un arreglo vacío y cada vez que presionemos click en el boton 
Agregar curso, el método leer datos recojerá los valores del curso, contruirá un objeto y lo agregará al arreglo.
Después de haber agregado el curso, construimos el html del icono del carrito que contendrá los articulos. construimos una nueva funcion
para esto y la llamamos desde leerDatos 
function leerDatos(curso){
    //Información sobre el curso actual
    const infoCurso = {
        imagen: curso.querySelector(".imagen-curso").src,
        nombre: curso.querySelector(".info-card h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    articulosCarrito = [...articulosCarrito, infoCurso]
    construirCarritoHTML();
}

La funcion de construir queda de esta manera. Iteramos sobre el arreglo de los articulos y por cada articulo genera un nuevo table row "tr"
y agregamos el table row a su contenedor padre.
Al principio llamamos a la funcion limpiarCarrito para eliminar las referencias previas en el contenedorCarrito para evitar informacion
duplicada,
function construirCarritoHTML(){
    limpiarCarritoHTNL();
    articulosCarrito.forEach(articulo=>{
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${articulo.nombre}</td>
            <td>${articulo.precio}</td>
        `;
        contenedorCarrito.appendChild(tableRow);
    });
    
}

Esta funcion borra los elementos existentes en el contenedor del carrito para evitar duplicados
function limpiarCarritoHTNL(){
   while(contenedorCarrito.firstChild){
       contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}

Ahora que ya está lista la funcion de construir el carrito agregamos la informacion faltante sobre el curso hacemos una ligera modificacion
a la funcion construirCarritoHTML aplicando deconstruction
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

Ahora nos enfrentamos a otro reto, al agregar un elemento y que se muestre en el carrito debemos verificar que no se dupliquen los cursos y que
solo se modifique la cantidad asi que modificamos la función leer datos
function leerDatos(curso){
    //Información sobre el curso actual
    const infoCurso = {
        imagen: curso.querySelector(".imagen-curso").src,
        nombre: curso.querySelector(".info-card h4").textContent,                   <-----CREA UN OBJETO CON LOS DATOS DEL CURSO
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    const existe = articulosCarrito.some( articulo=>{
        return articulo.id === infoCurso.id     // <----- Verifica si un curso ya fue añadido previamente. EL METODO SOME REGRESA UN BOOLEAN
    });
    if(existe){   // <---- Si el curso ya existe procedemos
        console.log("Ya existe");
        const cursosCarrito = articulosCarrito.map( articulo =>{   //<--- Crea un nuevo array con los resultados del map method
            if(articulo.id===infoCurso.id){
                articulo.cantidad++;        // <--- Si el curso existe retornamos el curso pero con cantidad modificaa
                return articulo;      
            }
            else{
                return articulo;  // Si no existe el curso lo retorna sin cambios 
            }
        });
        articulosCarrito = [...cursosCarrito];   //<--- El array articulosCarrito sera igual al array que actualizamos con map
    }
    else{
        articulosCarrito = [...articulosCarrito, infoCurso];  //<-- Si el curso no existe lo agrega al array con cantidad 1
    }
    
    construirCarritoHTML();
    console.log(infoCurso);
}


AHORA le daremos funcionalidad al boton de eliminar curso. Creamos el oyente
function cargarEventListeners(){
    listaCursos.addEventListener("click", agregarCurso)
    carrito.addEventListener("click", eliminarCurso);
}

y creamos una función llamda eliminarCurso 
function eliminarCurso(e){    
    if(e.target.classList.contains('borrar-curso')){                  //  <--Si el elemento contiene la clase borrar curso que 
        const cursoAEliminar = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter( curso=> curso.id !== cursoAEliminar)    // <----Eliminar del arreglo el articulo carrito
        construirCarritoHTML();  // <--- Llama de nuevo a la funcion para volver a costruir un html con los elementos actualizados del carrito
    }
}

Por último le damos funcionalidad al boton vaciar carrito
Como es poco código directamente realiamos los cambios con una funcion anonima
function cargarEventListeners(){
    listaCursos.addEventListener("click", agregarCurso)
    carrito.addEventListener("click", eliminarCurso);
    botonVaciarCarrito.addEventListener("click", ()=>{
        articulosCarrito = [];
        limpiarCarritoHTNL();
    })
}
