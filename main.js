
//DEFINICION DE FUNCIONES-----------------------------------------
// Array con productos iniciales
let productos = [
    { id: 1, descripcion: "arandela chica", stock: 50 },
    { id: 2, descripcion: "arandela grande", stock: 100 },
    { id: 3, descripcion: "Destornillador estrella", stock: 7 },
    { id: 4, descripcion: "Destornillador plano", stock: 10 },
];
let ultimoId = 4;
let cantidadProductos = productos.length;;

function armarListaProductos() {
    cantidadProductos = productos.length;
    let listaProductos = "";
    if (cantidadProductos === 0) {
        listaProductos = "Sin productos";
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
        lista = lista + "cantidad de items de productos: " + cantidadProductos
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


//INICIO DEL PROGRAMA-----------------------------------------
let continua = true
let listaOpcionesMenu = "Sleccione una opción \n" +
    "1-Muestra inventario\n" +
    "2-Ingresa producto nuevo\n" +
    "3-Elimina un producto\n" +
    "9-Salir\n" +
    "\nOpción: ";
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
            case 9:
                continua = !confirm("Desea salir el sistema?");
                break;
        }
    }
}
while (continua);

