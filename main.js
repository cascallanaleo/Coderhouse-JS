
// DEFINICION DE ARRAYS y VARIABLES
let productos = [
    { id: 1, descripcion: "arandela chica", stock: 50 },
    { id: 2, descripcion: "arandela grande", stock: 100 },
    { id: 3, descripcion: "Destornillador estrella", stock: 7 },
    { id: 4, descripcion: "Destornillador plano", stock: 10 },
];
let ultimoId = 4;
let cantidadProductos = productos.length;
const listaOpcionesMenu = "Seleccione una opción del menú:\n" +
    "1 - Mostrar inventario\n" +
    "2 - Agregar producto nuevo\n" +
    "3 - Eliminar un producto\n" +
    "4 - Consumir stock de un producto\n" +
    "5 - Ingresar stock a un producto\n" +
    "9 - Salir\n" +
    "\nOpción:";

//DEFINICION DE FUNCIONES-----------------------------------------
function armarListaProductos() {
    cantidadProductos = productos.length;
    let listaProductos = "";
    if (cantidadProductos === 0) {
        listaProductos = "Sin productos en el inventario";
    } else {
        listaProductos = "ID | Descripción | Stock\n";
        listaProductos = listaProductos + "--------------------------------------\n";
        for (let i = 0; i < cantidadProductos; i++) {
            listaProductos = listaProductos +
                productos[i].id + " | " +
                productos[i].descripcion + " | Stock: " +
                productos[i].stock + "\n";
        }
        listaProductos = listaProductos + "--------------------------------------\n";
    }
    return listaProductos;
}
// Función muestra inventario de productos
function mostrarInventario() {
    let lista = armarListaProductos();
    if (cantidadProductos !== 0) {
        lista = lista + "cantidad de productos en el inventario: " + cantidadProductos
    };
    alert(lista);
}

//Función agrega un producto
function agregarProducto() {
    while (true) {
        let descripcion = prompt("Ingrese la descripción del nuevo producto o presione boton cancelar:");
        console.log(descripcion);
        if (descripcion === null) {
            return;
        }
        else {
            if (descripcion === "") {
                alert("Debe ingresar una descripción")
            }
            else {
                ultimoId = ultimoId + 1
                productos.push({
                    id: ultimoId,
                    descripcion: descripcion,
                    stock: 0
                });
                cantidadProductos = productos.length;
                alert("Producto Id: " + ultimoId + " Descripción: " + descripcion + "\n agregado al inventario con stock 0");
            }
        }
    };
}

// Función elimina un producto
function eliminarProducto() {
    while (true) {
        let lista = armarListaProductos();
        if (cantidadProductos === 0) {
            alert(lista);
            return;
        }
        else {
            lista = lista + "Ingrese Id del producto a eliminar o presione boton cancelar:";
            let opcion = prompt(lista);
            if (opcion === null) {
                return;
            }
            else {
                let idProducto = parseInt(opcion);

                if (isNaN(idProducto)) {
                    alert("Debe ingresar un número válido");
                }
                else {
                    let indice = productos.findIndex(producto => producto.id === idProducto);

                    if (indice === -1) {
                        alert("Producto con ID " + idProducto + " no encontrado");
                    } else {
                        let productoEliminado = productos[indice];
                        productos.splice(indice, 1);
                        cantidadProductos = productos.length;
                        alert("Producto ID: " + productoEliminado.id +
                            " | " + productoEliminado.descripcion + " | eliminado con éxito");
                    }
                }
            }
        }
    }
}


// Función consume stock de producto 
function consumirStock() {
    while (true) {
        let lista = armarListaProductos();
        if (cantidadProductos === 0) {
            alert(lista);
            return;
        }
        else {
            lista = lista + "Ingrese Id del producto a consumir stock o presione boton cancelar:";
            let opcion = prompt(lista);
            if (opcion === null) {
                return;
            }
            else {
                let idProducto = parseInt(opcion);

                if (isNaN(idProducto)) {
                    alert("Debe ingresar un número válido");
                }
                else {
                    let indice = productos.findIndex(producto => producto.id === idProducto);
                    if (indice === -1) {
                        alert("Producto con ID " + idProducto + " no encontrado");
                    } else {
                        while (true) {
                            let cantidad = prompt("Ingrese la cantidad (positiva) a consumir del producto " + productos[indice].descripcion + "\n"
                                                + "Stock disponible: " + productos[indice].stock );
                            if (cantidad === null) {
                                break;
                            }
                            cantidad = parseInt(cantidad);
                            if (isNaN(cantidad) || cantidad <= 0) {
                                alert("Debe ingresar una cantidad válida mayor que 0.");
                                continue;
                            }
                            if (productos[indice].stock < cantidad) {
                                alert("Stock insuficiente.\nStock actual: " + productos[indice].stock);
                                continue;
                            }
                            productos[indice].stock = productos[indice].stock - cantidad;
                            alert(cantidad + " unidades del producto " + productos[indice].descripcion + " consumidas con éxito");
                            break;
                        }
                    }
                }
            }
        }
    }
}

// Función ingresa stock de producto 
function ingresarStock() {
    while (true) {
        let lista = armarListaProductos();
        if (cantidadProductos === 0) {
            alert(lista);
            return;
        }
        else {
            lista = lista + "Ingrese Id del producto a ingresar stock o presione boton cancelar:";
            let opcion = prompt(lista);
            if (opcion === null) {
                return;
            }
            else {
                let idProducto = parseInt(opcion);

                if (isNaN(idProducto)) {
                    alert("Debe ingresar un número válido");
                }
                else {
                    let indice = productos.findIndex(producto => producto.id === idProducto);
                    if (indice === -1) {
                        alert("Producto con ID " + idProducto + " no encontrado");
                    } else {
                        while (true) {
                            let cantidad = prompt("Ingrese la cantidad de stock a ingresar del producto " + productos[indice].descripcion );
                            if (cantidad === null) {
                                break;
                            }
                            cantidad = parseInt(cantidad);
                            if (isNaN(cantidad) || cantidad <= 0) {
                                alert("Debe ingresar una cantidad válida mayor que 0.");
                                continue;
                            }
                            productos[indice].stock = productos[indice].stock + cantidad;
                            alert(cantidad + " unidades del producto " + productos[indice].descripcion + " ingresadas con éxito");
                            break;
                        }
                    }
                }
            }
        }
    }
}



//INICIO DEL PROGRAMA-----------------------------------------
function iniciarSimulador() {
    let continua = true
    do {
        let opcionMenu = prompt(listaOpcionesMenu);
        if (opcionMenu === null) {
            opcionMenu = "9"
        }
        // console.log(opcionMenu + "-" + isNaN(opcionMenu));
        // console.log("pasa");
        if (isNaN(opcionMenu) || parseInt(opcionMenu) < 1 || parseInt(opcionMenu) > 9) {
            alert("Debe ingresar una opción válida");
        }
        else {
            console.log(parseInt(opcionMenu));
            switch (parseInt(opcionMenu)) {
                case 1:
                    mostrarInventario();
                    break;
                case 2:
                    agregarProducto();
                    break;
                case 3:
                    eliminarProducto();
                    break;
                case 4:
                    consumirStock();
                    break;
                case 5:
                    ingresarStock();
                    break; case 9:
                    continua = !confirm("Desea salir el sistema?");
                    break;
            }
        }
    }
    while (continua);
}

