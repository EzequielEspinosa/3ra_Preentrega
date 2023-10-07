
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
    
    Toastify({
        text:"Producto agregado",
        duration: 2000,
        position: "left",
        style:{
            fontSize: "15px",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            background: "grey",
            color: "black",
            boderRadius: "10px"
        }
    }).showToast();

    insertarCarrito();
    
}


// INSERTA PRODUCTO AL CARRITO
function insertarCarrito(){
    let tabla = document.getElementById("contenedor");
    let totalNumber = 0;
    tabla.innerHTML = "";
    let totalNumberText = document.getElementById("totalNumber");
    for(let instrumentos of carrito){
        let ubicacion = document.createElement("tr");
        ubicacion.innerHTML = `<td><img scr="${instrumentos.img}"></td>
                                <td><p>${instrumentos.nombre}</p></td>
                                <td>${instrumentos.precio}</td>
                                <td>${instrumentos.cantidad}</td>
                                
                                <td><button class="btn btn-danger borrarInstrumento">Borrar</button></td>`
        tabla.append(ubicacion);
        let numberArray = instrumentos.precio.split("").splice(1).join("");
        totalNumber += numberArray * instrumentos.cantidad;
        let resultadoTotal = document.createElement("p")
        resultadoTotal.textContent = `${totalNumber}`
        totalNumberText.innerHTML = "";
        totalNumberText.appendChild(resultadoTotal);
        
    }
    
    // BORRA LOS PRODUCTOS
    let btnBorrar = document.querySelectorAll(".borrarInstrumento");
    for( let btn of btnBorrar){
        btn.addEventListener("click", borrarProducto)
    }
    // json
    let usuarioJson = JSON.stringify(carrito);
    localStorage.setItem("usuarios", usuarioJson);
    return(instrumentos);
}

function borrarProducto(e, instrumentos){
    let abuelo = e.target.parentNode.parentNode;
    let eliminarProducto = abuelo.querySelector("p").innerText;
    let totalNumber = 0;
    let totalNumberText = document.getElementById("totalNumber");
    let resultadoTotal = document.createElement("p")
    resultadoTotal.textContent = `${totalNumber}`
    totalNumberText.innerHTML = "";
    totalNumberText.appendChild(resultadoTotal);
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

// openweather
//mi apikey
//aac2d828126824f3159a295b8932b792

function mostrarPosicion(posicion){

    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
    let key = "aac2d828126824f3159a295b8932b792";
    let ubi = document.getElementById("ubicacion");

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data=>{
                    console.log(data)
                    let ubic = document.createElement("p");
                    ubic.textContent = `Ubicacion: ${data.name},
                                        Temperatura: ${data.main.temp},
                                        Clima: ${data.weather[0].description},
                                        Humedad: ${data.main.humidity}%`
                    ubi.appendChild(ubic);
        })
}

navigator.geolocation.getCurrentPosition(mostrarPosicion);

function pagar(){
    if (carrito != ""){
        Swal.fire({
            title: 'E-R Instrumentos',
            text: '¡Muchas Gracias por alquilar!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirige a index.html
                window.location.href = 'index.html';
            }
        });
    }
    else{
        Swal.fire('Necesitas agregar un instrumento.')
    }
}

let bntPagar = document.querySelector(".btnPagar");
bntPagar.addEventListener("click", pagar);
