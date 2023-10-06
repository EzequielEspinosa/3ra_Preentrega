
let carrito = [];

function agregaCarrito(e) {
    let instrumento = e.target;
    let instrumentoPadre = instrumento.parentNode;
    let instrumentoAbuelo = instrumentoPadre.parentNode;

    let nombreInstrumento = instrumentoAbuelo.querySelector("h3").innerText;
    let precioInstrumento = instrumentoPadre.querySelector("h4").innerText;
    let imgInstrumento = instrumentoAbuelo.querySelector("img").src;
    let cantidad = instrumentoPadre.querySelector("input").value;

    let instrumentoExistente = carrito.find(item => item.nombre === nombreInstrumento);

    if (instrumentoExistente) {

        instrumentoExistente.cantidad = parseInt(instrumentoExistente.cantidad) + parseInt(cantidad);
    } else {

        let instrumentoNuevo = {
            nombre: nombreInstrumento,
            precio: precioInstrumento,
            img: imgInstrumento,
            cantidad: cantidad
        };
        carrito.push(instrumentoNuevo);
    }
    
    let totalCarrito = carrito.reduce((total, instrumentoNuevo) => {
        let precioTotalPorProducto = instrumentoNuevo.precio * instrumentoNuevo.cantidad;
        return total + precioTotalPorProducto;
    }, 0);
    
    console.log('Total del carrito: ' + totalCarrito);

    Toastify({
        text:"Producto agregado",
        duration: 2000,
        position: "left",
        style:{
            fontSize: "15px",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            background: "#c0a068",
            color: "black",
            boderRadius: "10px"
        }
    }).showToast();

    insertarCarrito();
}


// INSERTA PRODUCTO AL CARRITO
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

    // BORRA LOS PRODUCTOS
    let btnBorrar = document.querySelectorAll(".borrarInstrumento");

    for( let btn of btnBorrar){
        btn.addEventListener("click", borrarProducto)
    }

    let usuarioJson = JSON.stringify(carrito);
    localStorage.setItem("usuarios", usuarioJson);
    
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

    Toastify({
        text:"Producto borrado",
        duration: 2000,
        style:{
            fontSize: "15px",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            background: "#c0a068",
            color: "black",
            boderRadius: "10px"
        }
    }).showToast();
}

//Evento
let btnAlquilar = document.querySelectorAll(".btnAlquilar");

for( let boton of btnAlquilar){

    boton.addEventListener("click", agregaCarrito);

}


