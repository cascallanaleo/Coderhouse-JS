//DEFINICION DE CLASES Y ARRAYS ---------------------------------------------------------------------
class Producto {
    constructor(id, descripcion) {
        this.id = id;
        this.descripcion = descripcion;
        this.stock = 0;
    }
    ingresarStock(cantidad) {
        if (cantidad > 0) {
            this.stock += cantidad;
            return true;
        }
        return false;
    }
    consumirStock(cantidad) {
        if (cantidad > 0 && this.stock >= cantidad) {
            this.stock -= cantidad;
            return true;
        }
        return false;
    }
}

let productos = [];
let ultimoId = 0;

//DEFINICION DE FUNCIONES--------------------------------------------------------------------------------------

// Recupero inventario del localstorage
function cargarProductos() {
    const datos = localStorage.getItem('productos');
    if (datos) {
        const productosLocalstorage = JSON.parse(datos);
        productos = productosLocalstorage.map(p => {
            const producto = new Producto(p.id, p.descripcion);
            producto.stock = p.stock;
            return producto;
        });
        const idGuardado = localStorage.getItem('ultimoId');
        if (idGuardado) {
            ultimoId = parseInt(idGuardado);
        }
    }
}

// muestra mensajes directamente en el hatml 
function mostrarMensaje(idElemento, texto, tipo = 'ok') {
    const mensajeDiv = document.getElementById(idElemento);
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;
    setTimeout(() => {
        mensajeDiv.textContent = '';
        mensajeDiv.className = 'mensaje';
    }, 5000);
}

// Función muestra inventario de productos
const mostrarInventario = () => {

    //Agrego información cantidad de items
    const encabezadolistainventario = document.getElementById("encabezado-listainventario");

    encabezadolistainventario.innerHTML = "";
    const parrafocantidad = document.createElement("p");
    parrafocantidad.textContent = "Cantidad de items: " + productos.length;
    encabezadolistainventario.appendChild(parrafocantidad);

    const listainventario = document.getElementById("lista-inventario");
    listainventario.innerHTML = "";
    productos.forEach((producto) => {
        const parrafoproducto = document.createElement("p");
        parrafoproducto.textContent = `${String(producto.id).padStart(5)}    | ${producto.descripcion.padEnd(30)} | ${String(producto.stock).padStart(10)}`;
        listainventario.appendChild(parrafoproducto);
    });
}

//Función agrega un producto
function agregarProducto() {
    const inputDescripcion = document.getElementById('input-descripcion');
    const descripcion = inputDescripcion.value.trim();
    
    if (descripcion === "") {
        mostrarMensaje('mensaje-agregar', "Debe ingresar una descripción", "advertencia");
        return;
    }
    
    ultimoId++;
    const nuevoProducto = new Producto(ultimoId, descripcion);
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('ultimoId', ultimoId);
    
    mostrarMensaje('mensaje-agregar', `Producto ID: ${ultimoId} - "${descripcion}" agregado con stock 0`, "ok");
    inputDescripcion.value = ''; 
    mostrarInventario();
}

//Función elimina un producto
function eliminarProducto() {
    const inputId = document.getElementById('input-id-eliminar');
    const idproducto = parseInt(inputId.value);
    
    if (!idproducto || isNaN(idproducto)) {
        mostrarMensaje('mensaje-eliminar', "Debe ingresar un ID válido", "advertencia");
        return;
    }
    
    const indice = productos.findIndex(producto => producto.id === idproducto);
    
    if (indice === -1) {
        mostrarMensaje('mensaje-eliminar', `No se encontró un producto con ID: ${idproducto}`, "error");
    } else {
        const producto = productos[indice];
        productos.splice(indice, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarMensaje('mensaje-eliminar', `Producto "${producto.descripcion}" eliminado con éxito`, "ok");
        inputId.value = ''; 
        mostrarInventario();
    }
}

// Función ingresa stock de producto 
function ingresarStock() {
    const inputId = document.getElementById('input-id-ingresar');
    const inputCantidad = document.getElementById('input-cantidad-ingresar');
    const idproducto = parseInt(inputId.value);
    const cantidad = parseInt(inputCantidad.value);
    
    if (!idproducto || isNaN(idproducto)) {
        mostrarMensaje('mensaje-ingresar', "Debe ingresar un ID válido", "advertencia");
        return;
    }
    
    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensaje('mensaje-ingresar', "Debe ingresar una cantidad válida mayor que 0", "advertencia");
        return;
    }
    
    const indice = productos.findIndex(producto => producto.id === idproducto);
    
    if (indice === -1) {
        mostrarMensaje('mensaje-ingresar', `No se encontró un producto con ID: ${idproducto}`, "error");
    } else {
        const producto = productos[indice];
        if (producto.ingresarStock(cantidad)) {
            localStorage.setItem('productos', JSON.stringify(productos));
            mostrarMensaje('mensaje-ingresar', `Se ingresaron ${cantidad} unidades de "${producto.descripcion}". Stock actual: ${producto.stock}`, "ok");
            inputId.value = ''; 
            inputCantidad.value = '';
            mostrarInventario();
        }
    }
}

// Función consume stock de producto 
function consumirStock() {
    const inputId = document.getElementById('input-id-consumir');
    const inputCantidad = document.getElementById('input-cantidad-consumir');
    const idproducto = parseInt(inputId.value);
    const cantidad = parseInt(inputCantidad.value);
    
    if (!idproducto || isNaN(idproducto)) {
        mostrarMensaje('mensaje-consumir', "Debe ingresar un ID válido", "advertencia");
        return;
    }
    
    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensaje('mensaje-consumir', "Debe ingresar una cantidad válida mayor que 0", "advertencia");
        return;
    }
    
    const indice = productos.findIndex(producto => producto.id === idproducto);
    
    if (indice === -1) {
        mostrarMensaje('mensaje-consumir', `No se encontró un producto con ID: ${idproducto}`, "error");
    } else {
        const producto = productos[indice];
        
        if (producto.stock < cantidad) {
            mostrarMensaje('mensaje-consumir', `Stock insuficiente. Stock actual: ${producto.stock}`, "error");
        } else {
            if (producto.consumirStock(cantidad)) {
                localStorage.setItem('productos', JSON.stringify(productos));
                mostrarMensaje('mensaje-consumir', `Se consumieron ${cantidad} unidades de "${producto.descripcion}". Stock actual: ${producto.stock}`, "ok");
                inputId.value = ''; 
                inputCantidad.value = '';
                mostrarInventario();
            }
        }
    }
}

//INICIO DEL PROGRAMA--------------------------------------------------------------------------------------------------
cargarProductos();
mostrarInventario();

// Eventos de botones
const btnAgregarProducto = document.getElementById("btn-agregaProducto");
btnAgregarProducto.addEventListener("click", agregarProducto);

const btnEliminarProducto = document.getElementById("btn-eliminaProducto");
btnEliminarProducto.addEventListener("click", eliminarProducto);

const btnIngresarStock = document.getElementById("btn-ingresaStock");
btnIngresarStock.addEventListener("click", ingresarStock);

const btnConsumeStock = document.getElementById("btn-consumeStock");
btnConsumeStock.addEventListener("click", consumirStock);
