// Array de productos
const productos = [
  {
    id: 1,
    Articulos: "Collar",
    img: "imagenes/collar.jpg",
    Precio: 500,
    Descr: "Collar de Tela, lavable 100% echo a mano",
    Tamaño: "S"
  },

  {
    id: 2,
    Articulos: "Collar",
    img: "imagenes/collar.jpg",
    Precio: 500,
    Descr: "Collar de Tela, lavable 100% echo a mano",
    Tamaño: "M"
  },

  {
    id: 3,
    Articulos: "Collar",
    img: "imagenes/collar.jpg",
    Precio: 500,
    Descr: "Collar de Tela, lavable 100% echo a mano",
    Tamaño: "L"
  },

  {
    id: 4,
    Articulos: "Collar",
    img: "imagenes/collar.jpg",
    Precio: 500,
    Descr: "Collar de Tela, lavable 100% echo a mano",
    Tamaño: "XL"
  },

  {
    id: 5,
    Articulos: "Correa",
    img: "imagenes/correa.jpg",
    Precio: 700,
    Descr: "Correa de 5mts en Tela, lavable 100% echo a mano",
    Tamaño: "S"
  },

  {
    id: 6,
    Articulos: "Correa",
    img: "imagenes/correa.jpg",
    Precio: 700,
    Descr: "Correa de 5mts en Tela, lavable 100% echo a mano",
    Tamaño: "M"
  },

  {
    id: 7,
    Articulos: "Correa",
    img: "imagenes/correa.jpg",
    Precio: 700,
    Descr: "Correa de 5mts en Tela, lavable 100% echo a mano",
    Tamaño: "L"
  },

  {
    id: 8,
    Articulos: "Correa",
    img: "imagenes/correa.jpg",
    Precio: 700,
    Descr: "Correa de 5mts en Tela, lavable 100% echo a mano",
    Tamaño: "XL"

  },

  {
    id: 9,
    Articulos: "Arnes",
    img: "imagenes/Arnes.jpg",
    Precio: 1200,
    Descr: "Arnes resistente en Tela, lavable 100% echo a mano",
    Tamaño: "S"
  },

  {
    id: 10,
    Articulos: "Arnes",
    img: "imagenes/Arnes.jpg",
    Precio: 1200,
    Descr: "Arnes resistente en Tela, lavable 100% echo a mano",
    Tamaño: "M"
  },

  {
    id: 11,
    Articulos: "Arnes",
    img: "imagenes/Arnes.jpg",
    Precio: 1200,
    Descr: "Arnes resistente en Tela, lavable 100% echo a mano",
    Tamaño: "L"

  },

  {
    id: 12,
    Articulos: "Arnes",
    img: "imagenes/Arnes.jpg",
    Precio: 1200,
    Descr: "Arnes resistente en Tela, lavable 100% echo a mano",
    Tamaño: "XL"
  },

  {
    id: 13,
    Articulos: "Cama",
    img: "imagenes/foto.jpg",
    Precio: 1400,
    Descr: "Camas personalizadas, desmontables y lavables.",
    Tamaño: "S"
  },

  {
    id: 14,
    Articulos: "Cama",
    img: "imagenes/foto.jpg",
    Precio: 1600,
    Descr: "Camas personalizadas, desmontables y lavables.",
    Tamaño: "M"
  },

  {
    id: 15,
    Articulos: "Cama",
    img: "imagenes/foto.jpg",
    Precio: 1800,
    Descr: "Camas personalizadas, desmontables y lavables.",
    Tamaño: "L"
  },

  {
    id: 16,
    Articulos: "Cama",
    img: "imagenes/foto.jpg",
    Precio: 2000,
    Descr: "Camas personalizadas, desmontables y lavables.",
    Tamaño: "XL"
  },
];

//CREAR PRODUCTOS

let DivId = document.getElementById("productos");

const renderProductos = (array) => {
  for (let elementos of array) {
    let div = document.createElement("div");
    div.className = "card prueba";
    div.style = "width: 18rem";

    div.innerHTML = `
        <img src="${elementos.img}" class="card-img-top" alt="imagenes de productos">
        <div class="card-body">
        <h5 class="card-title">${elementos.Articulos}</h5>
        <p class="card-text">${elementos.Descr}</p>
        <h4> Talle - ${elementos.Tamaño}</h4>
        <h3> $U ${elementos.Precio}</h3>
         <a type="button" class="btn btn-primary" id="product-${elementos.id}">Agregar al Carrito</a>
        </div>
        `;
    console.log(div);

    DivId.append(div);
  }
};
renderProductos(productos);


//FUNCION RECARGAR PAGINA

function recargar() {
  location.reload();
}
// ENVIAR PRODUCTOS AL CARRO 
// ARRAY DEL CARRO

let carro = [];

//AGREGO FUNCION A TODOS LOS BOTONES CON LA SIGUIENTE CLASE

let buttons = document.getElementsByClassName("btn btn-primary");
//EVENTO + Funcion
for (const btn of buttons) {
  btn.onclick = agregarCarro;
}

function agregarCarro(e) {
  const btn = e.target;
  const id = btn.id.split("-")[1];
  const product = productos.find((p) => p.id == id);

  //ENVIO AL ARRAY CARRO

  carro.push(product);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Producto agregado con exito'
  })

  renderizarCarro();

  localStorage.setItem("carrito", JSON.stringify(carro));
}
//UBICACION DEL CARRO EN EL HTML

let carroHTML = document.getElementById("carro");
let pFinalHTML = document.getElementById("totalCompra");

// FUNCION RENDER CARRO
function renderizarCarro() {
  let div = document.getElementById("carro");

  //VACIO EL DIV

  div.textContent = "";

  //QUITO LOS DUPLICADOS

  let carritoSinDuplicados = [...new Set(carro)];

  //LLAMO LA INFORMACION DEL CARRO

  carritoSinDuplicados.forEach((item) => {
    let nombres = item.Articulos;
    let imagen = item.img;
    let precioProducto = item.Precio;
    let Tamaño = item.Tamaño;

    //Metodo para que NO duplique los ITEM, sino que que sume si es el mismo producto

    let numeroUnidadesItem = carro.reduce((total, itemId) => {
      return itemId === item ? (total += 1) : total;
    }, 0);

    let precioTotal = numeroUnidadesItem * precioProducto;

    const pFinal = carro.reduce((acc, item) => acc + item.Precio, 0);



    // ENVIO LOS PRODCUTOS AL HTML 

    let enviarCarro = document.createElement("li");
    enviarCarro.innerHTML = `
        <img src="${imagen}" class="card-img-top" style="width:100px;height:100px;" alt="...">
        <div class="card-body">
        <h5 class="card-title">${numeroUnidadesItem} x ${nombres}</h5>
        <h4> Talle - ${Tamaño}</h4>
        <h3> $U ${precioTotal}</h3>`;
    div.appendChild(enviarCarro);

    pFinalHTML.innerHTML = `<h2> El total de tu compra es de $ ${pFinal} `
  });

}
renderizarCarro();

// FUNCION BORRAR STORAGE Y LIMPIAR CARRITO

function borrarStorage() {
  localStorage.clear();
  document.querySelector("#carro").innerText = " ";
  document.querySelector("#totalCompra").innerText = " ";
}

// BOTONES PARA CONFIRMAR Y CANCELAR COMPRA

const btnConfirmarCompra = document.getElementById('confirmarCompra');
const btnCancelarCompra = document.getElementById('cancelarCompra');

btnConfirmarCompra.addEventListener("click", () => {
  Swal.fire({
    icon: 'success',
    title: 'Tu compra ha sido realizada con exito',
  })
  borrarStorage();
  setTimeout(recargar, 3000);
})


btnCancelarCompra.addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Estas seguro que quieres cancelar tu compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      borrarStorage();
      swalWithBootstrapButtons.fire(
        'Tu compra se ha cancelado con exito',
      )
      setTimeout(recargar, 2500);

    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) { }

  })
})


const contenedor = document.querySelector('#contenedorTarjetas');
const container = document.querySelector('#cardContainer');
const selectTalle = document.querySelector('#talle');
const btnBuscar = document.getElementById('buscar');

// FILTRAR LAS RAZAS POR TALLES 
function filtrarTalle(array) {
  let talle = selectTalle.value;
  if (!talle) {
    return array;
  } else {
    resultado = array.filter((e) => e.Talle == talle);
    return resultado;
  }
}
// CREACION DE HTML CON TARJETAS DE LAS DIFERENTES RAZAS
function createHTML(array) {
  contenedor.innerHTML = ''
  container.innerHTML = ''
  array.forEach((raza) => {
    const card = `
            <div class="col">
                <div class="card tarjeta ">
                    <img src="${raza.imagen}" class="card-img-top" alt="${raza.Raza}">
                    <div class="card-body">
                        <h5 class="card-title">${raza.Raza}</h5>
                        <p class="card-text">Tamaño: ${raza.Tamaño}</p>
                        <p class="card-text">Peso: ${raza.Peso}</p>
                        <p class="card-text">Altura: ${raza.Altura}</p>
                        <p class="card-text">Talle: ${raza.Talle}</p>
                    </div>
                </div>
            </div>`
    container.innerHTML += card
  })
}
// TRAER DATOS DESDE LA API
async function traerDatos() {
  const respuesta = await fetch('./js/data.json');
  const datos = await respuesta.json();
  createHTML(filtrarTalle(datos));
}

btnBuscar.addEventListener('click', () => {
  traerDatos();
})

// SUBSCRIBIRTE A NEWSLETTER
const btnSuscribirse = document.getElementById('botonSuscribirse');


btnSuscribirse.addEventListener("click", () => {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  Swal.fire({
    title: 'Gracias por suscribirte ' + nombre,
    text: 'Te enviaremos un correo con nuestras novedades a ' + correo,
    imageUrl: 'imagenes/auto3.jpg',
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: 'logo',
  })
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('correo', correo);
});
