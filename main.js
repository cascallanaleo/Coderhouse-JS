//DEFINICION DE CLASES Y ARRAYS
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


//DEFINICION DE FUNCIONES-----------------------------------------

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

// Función muestra inventario de productos
const mostrarInventario = () => {

    //Agrego información cantidad de items
    const encabezadolistainventario = document.getElementById("encabezado-listainventario");

    encabezadolistainventario.innerHTML = "";
    const parrafocantidad = document.createElement("p");
    parrafocantidad.textContent = "Cantidad de items: " + productos.length;
    encabezadolistainventario.appendChild(parrafocantidad);

    //recore array productos
    const listainventario = document.getElementById("lista-inventario");

    listainventario.innerHTML = "";
    productos.forEach((producto) => {
        const parrafoproducto = document.createElement("p");
        parrafoproducto.textContent = `${producto.id} | ${producto.descripcion} | ${producto.stock}`;
        parrafoproducto.textContent = `${String(producto.id).padStart(5)}    | ${producto.descripcion.padEnd(30)} | ${String(producto.stock).padStart(10)}`;
        listainventario.appendChild(parrafoproducto)
    })
}

//Función agrega un producto
function agregarProducto() {

    let continuar = true;

    while (continuar) {

        let descripcion = prompt("Ingrese la descripción del nuevo producto o presione botón cancelar:");

        if (descripcion === null) {
            continuar = false;
        } else if (descripcion === "") {
            alert("Debe ingresar una descripción");
        } else {
            ultimoId++;
            const nuevoProducto = new Producto(ultimoId, descripcion);
            productos.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productos));
            localStorage.setItem('ultimoId', ultimoId);
            alert(`Producto Id: ${ultimoId}\nDescripción: ${descripcion}\nAgregado al inventario con stock 0`);
            mostrarInventario();
        }
    }
}


//Función elimina un producto
function eliminarProducto() {
    if (productos.length === 0) {
        alert("No hay productos en el inventario para eliminar");
        return;
    }

    let continuar = true;

    while (continuar) {
        let opcion = prompt("Ingrese el ID del producto a eliminar o presione botón cancelar:");
        if (opcion === null) {
            continuar = false;
        }
        else {
            let idproducto = parseInt(opcion);

            if (isNaN(idproducto)) {
                alert("Debe ingresar un número válido");
            }
            else {

                const indice = productos.findIndex(producto => producto.id === idproducto);

                if (indice === -1) {
                    alert(`No se encontró un producto con ID: ${idproducto}`);
                } else {
                    const producto = productos[indice];
                    const confirmar = confirm(`¿Está seguro de eliminar el producto?\nID: ${producto.id}\nDescripción: ${producto.descripcion}\nStock: ${producto.stock}`);

                    if (confirmar) {
                        productos.splice(indice, 1);
                        localStorage.setItem('productos', JSON.stringify(productos));
                        alert(`Producto "${producto.descripcion}" eliminado con éxito`);
                        mostrarInventario();
                    }
                }
            }
        }
    }
}

// Función consume stock de producto 
function consumirStock() {
    if (productos.length === 0) {
        alert("No hay productos en el inventario");
        return;
    }

    let continuar = true;

    while (continuar) {
        let opcion = prompt("Ingrese el ID del producto a consumir stock  o presione botón cancelar:");
        if (opcion === null) {
            continuar = false;
        }
        else {
            let idproducto = parseInt(opcion);

            if (isNaN(idproducto)) {
                alert("Debe ingresar un número válido");
            }
            else {

                const indice = productos.findIndex(producto => producto.id === idproducto);

                if (indice === -1) {
                    alert(`No se encontró un producto con ID: ${idproducto}`);
                } else {
                    const producto = productos[indice];

                    let continuarcnt = true;

                    while (continuarcnt) {
                        let cantidad = prompt(`Ingrese la cantidad (positiva) a consumir del producto ${producto.descripcion}\n Stock disponible: ${producto.stock}`);
                        if (cantidad === null) {
                            continuarcnt = false;
                        }
                        else {
                            cantidad = parseInt(cantidad);
                            if (isNaN(cantidad) || cantidad <= 0) {
                                alert("Debe ingresar una cantidad válida mayor que 0.");
                            }
                            else {
                                if (producto.stock < cantidad) {
                                    alert(`Stock insuficiente.\nStock actual: ${producto.stock}`);
                                }
                                else {
                                    if (producto.consumirStock(cantidad)) {
                                        localStorage.setItem('productos', JSON.stringify(productos));
                                        alert(`Se consumieron ${cantidad} unidades de "${producto.descripcion}"\nStock actual: ${producto.stock}`);
                                        mostrarInventario();
                                        continuarcnt = false;
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
}


// Función ingresa stock de producto 
function ingresarStock() {
    if (productos.length === 0) {
        alert("No hay productos en el inventario");
        return;
    }

    let continuar = true;

    while (continuar) {
        let opcion = prompt("Ingrese el ID del producto a ingresar stock  o presione botón cancelar:");
        if (opcion === null) {
            continuar = false;
        }
        else {
            let idproducto = parseInt(opcion);

            if (isNaN(idproducto)) {
                alert("Debe ingresar un número válido");
            }
            else {

                const indice = productos.findIndex(producto => producto.id === idproducto);

                if (indice === -1) {
                    alert(`No se encontró un producto con ID: ${idproducto}`);
                } else {
                    const producto = productos[indice];

                    let continuarcnt = true;

                    while (continuarcnt) {
                        let cantidad = prompt(`Ingrese la cantidad (positiva) a ingresar del producto ${producto.descripcion}\n`);
                        if (cantidad === null) {
                            continuarcnt = false;
                        }
                        else {
                            cantidad = parseInt(cantidad);
                            if (isNaN(cantidad) || cantidad <= 0) {
                                alert("Debe ingresar una cantidad válida mayor que 0.");
                            }
                            else {
                                if (producto.ingresarStock(cantidad)) {
                                    localStorage.setItem('productos', JSON.stringify(productos));
                                    alert(`Se ingresaron ${cantidad} unidades de "${producto.descripcion}"\nStock actual: ${producto.stock}`);
                                    mostrarInventario();
                                    continuarcnt = false;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}



//INICIO DEL PROGRAMA-----------------------------------------
cargarProductos();
mostrarInventario()
// Ejecuta funciones cuando se presiona un boton
const btnAgregarProducto = document.getElementById("btn-agregaProducto");
btnAgregarProducto.addEventListener("click", agregarProducto);

const btnEliminarProducto = document.getElementById("btn-eliminaProducto");
btnEliminarProducto.addEventListener("click", eliminarProducto);

const btnIngresarStock = document.getElementById("btn-ingresaStock");
btnIngresarStock.addEventListener("click", ingresarStock);

const btnConsumeStock = document.getElementById("btn-consumeStock");
btnConsumeStock.addEventListener("click", consumirStock);

