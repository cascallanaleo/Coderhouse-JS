
//DEFINICION DE FUNCIONES-----------------------------------------
// Array con productos iniciales
let productos = [
    { id: 1, descripcion: "arandela chica", stock: 50 },
    { id: 2, descripcion: "arandela grande", stock: 100 },
    { id: 3, descripcion: "Destornillador estrella", stock: 7 },
    { id: 4, descripcion: "Destornillador plano", stock: 10 },
];
let ultimoId = 4;

// Función muestra inventario de productos
function mostrarInventario() {
    let cantidadProductos = productos.length;

    if (cantidadProductos === 0) {
        alert("Sin productos");
    } else {
        let listaProductos = "";
        for (let i = 0; i < cantidadProductos; i++) {
            listaProductos = listaProductos +
                            productos[i].id + " | " +
                            productos[i].descripcion + " | Stock: " +
                            productos[i].stock + "\n";
        }
         listaProductos = listaProductos + "--------------------------------------\n" + 
                        "cantidad de items de productos: " + cantidadProductos;
        alert(listaProductos);
    }
}

//Función agrega un producto
function agregarProducto() {
    let descripcion = prompt("Ingrese la descripción del nuevo producto:");
    console.log(descripcion);
    
    if (descripcion !== null && descripcion !== "") {

    ultimoId = ultimoId + 1

    productos.push({
        id: ultimoId,
        descripcion: descripcion,
        stock: 0});
    alert("Producto Id: "+ultimoId+" Descripción: "+ descripcion +"\n agregado al inventario con stock 0");
    };
}


//INICIO DEL PROGRAMA-----------------------------------------
let continua = true
let listaOpcionesMenu = "Sleccione una opción \n"+
                        "1-Muestra inventario\n"+
                        "2-Ingresa producto nuevo\n"+
                        "3-Elimina un producto\n"+
                        "9-Salir\n"+
                        "\nOpción: ";
do {
    let opcionMenu = prompt(listaOpcionesMenu);
    if (opcionMenu === null){
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
                    console.log("pasa");
                    agregarProducto();
                    break;
                case 9: 
                    continua = !confirm("Desea salir el sistema?");
                    break;
            }
        }
    }
while (continua) ;

