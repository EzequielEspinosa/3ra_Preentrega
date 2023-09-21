
let carrito = [];

function agregaCarrito(e){

    let instrumento = e.target;
    let instrumentoPadre = instrumento.parentNode;
    let instrumentoAbuelo = instrumentoPadre.parentNode;

    let nombreInstrumento = instrumentoAbuelo.querySelector("h3").innerText;
    //console.log(nombreInstrumento);

    let precioInstrumento = instrumentoAbuelo.querySelector("h4").innerText;
    //console.log(precioInstrumento);

    let imgInstrumento = instrumentoAbuelo.querySelector("img").src;
    //console.log(imgInstrumento);

    let instrumentos = { 
        nombre: nombreInstrumento,
        precio: precioInstrumento,
        img: imgInstrumento,
        cantidad: 1
    }

    carrito.push(instrumentos);

    insertarCarrito()
}

function insertarCarrito(){

    let tabla = document.getElementById("contenedor");

    tabla.innerHTML = "";
    for(let instrumentos of carrito){

        let ubicacion = document.createElement("tr");
        ubicacion.innerHTML = `<td><img scr="${instrumentos.img}"></td>
                                <td><p>${instrumentos.nombre}</p></td>
                                <td>${instrumentos.precio}</td>
                                <td>${instrumentos.cantidad}</td>
                                <td><button class="btn btn-danger borrarInstrumento">Borrar</button></td>`

        tabla.append(ubicacion);

    }

    let btnBorrar = document.querySelectorAll(".borrarInstrumento");

    for( let btn of btnBorrar){
        btn.addEventListener("click", borrarProducto)
    }

    let usuarioJson = JSON.stringify(carrito);
    sessionStorage.setItem("usuarios", usuarioJson);
    
}

function borrarProducto(e){
    let abuelo = e.target.parentNode.parentNode;
    let eliminarProducto = abuelo.querySelector("p").innerText;

    abuelo.remove();
    
    function eliminarProductos (producto){
        return producto.nombre != eliminarProducto
    }

    let resultadoFilter = carrito.filter(eliminarProductos);
    carrito = resultadoFilter
    console.log(resultadoFilter)
}



let btnAlquilar = document.querySelectorAll(".btnAlquilar");

console.log(btnAlquilar);

for( let boton of btnAlquilar){

    boton.addEventListener("click", agregaCarrito);

}
