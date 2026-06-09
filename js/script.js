const paginas = [
    { nombre: "Home", link: "index.html" },
    { nombre: "Cultivos", link: "cultivos.html" },
    { nombre: "Productos animales", link: "animales.html" },
    { nombre: "Peces", link: "peces.html" }
];

function logout() {

    localStorage.removeItem("logueado");

    window.location.href = "login.html";

}

const navbar = document.getElementById("navbar");

if (navbar) {

    let contenido = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-1">
        <div class="container-fluid">

            <a class="navbar-brand d-flex align-items-center" href="index.html">
                <img src="assets/img/logo.png" alt="logo" width="50" class="me-2">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav me-auto">
    `;

    paginas.forEach(p => {

        contenido += `
        <li class="nav-item">
            <a class="nav-link" href="${p.link}">
                ${p.nombre}
            </a>
        </li>
        `;

    });

    contenido += `
                </ul>
    `;

    if (localStorage.getItem("logueado")) {

        contenido += `
        <button onclick="logout()" class="btn btn-danger">
            Logout
        </button>
        `;

    } else {

        contenido += `
        <a href="login.html" class="btn btn-outline-light btn-sm me-2">
            Login
        </a>

        <a href="registro.html" class="btn btn-success btn-sm">
            Sign up
        </a>
        `;

    }

    contenido += `
            </div>
        </div>
    </nav>
    `;

    navbar.innerHTML = contenido;

}
/*
const productos = [
    {
        nombre: "Fruta Milenaria",
        descripcion: "Una fruta antigua muy valiosa.",
        precio: 550,
        imagen: "assets/img/Ancient_fruit.webp"
    },

    {
        nombre: "Leche Grande",
        descripcion: "Leche fresca de alta calidad.",
        precio: 350,
        imagen: "assets/img/Large_Milk.webp"
    },

    {
        nombre: "Pez Glacial",
        descripcion: "Un pez raro encontrado en invierno.",
        precio: 1000,
        imagen: "assets/img/Glacierfish.webp"
    }
];
*/

const contenedorCultivos = document.getElementById("cultivos");
const contenedorAnimales = document.getElementById("animales");
const contenedorPeces = document.getElementById("peces");

function crearCard(p) {

    return `
    
    <div class="col-md-4">

        <div class="card card-stardew h-100 text-center shadow">

            <img src="${p.imagen}" class="card-img-top">

            <div class="card-body">

                <h5 class="card-title">
                    ${p.nombre}
                </h5>

                <p class="card-text">
                    ${p.descripcion}
                </p>

                <p class="fw-bold">
                    $${p.precio}
                </p>

                <div class="d-flex justify-content-center align-items-center gap-2 mb-3">

                    <button class="btn btn-danger" onclick="cambiarCantidad(this, -1)">
                        -
                    </button>

                    <span class="cantidad">1</span>

                    <button class="btn btn-success" onclick="cambiarCantidad(this, 1)">
                        +
                    </button>

                </div>

                <div class="contenedor-boton">

                    <button class="btn-carrito" onclick='agregarAlCarrito(this, ${JSON.stringify(p)})'>
                        🛒
                    </button>

                    <button class="btn-comprar" onclick='comprarAhora(this, ${JSON.stringify(p)})'>
                        Comprar
                    </button>

</div>

            </div>

        </div>

    </div>

    `;
}

if (contenedorCultivos) {

    fetch("assets/data/cultivos.json")
        .then(response => response.json())
        .then(productos => {

            productos.forEach(p => {

                contenedorCultivos.innerHTML += crearCard(p);

            });

        });

}

if (contenedorAnimales) {

    fetch("assets/data/animales.json")
        .then(response => response.json())
        .then(productos => {

            productos.forEach(p => {

                contenedorAnimales.innerHTML += crearCard(p);

            });

        });

}

if (contenedorPeces) {

    fetch("assets/data/peces.json")
        .then(response => response.json())
        .then(productos => {

            productos.forEach(p => {

                contenedorPeces.innerHTML += crearCard(p);

            });

        });

}


function cambiarCantidad(boton, cambio) {

    let contenedor = boton.parentElement;

    let cantidadTexto = contenedor.querySelector(".cantidad");

    let cantidad = parseInt(cantidadTexto.innerText);

    cantidad += cambio;

    if (cantidad < 1) {
        cantidad = 1;
    }

    cantidadTexto.innerText = cantidad;

}

const formulario = document.querySelector("form");

if (formulario) {

    formulario.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("email").value;

        localStorage.setItem("logueado", "true");

        sessionStorage.setItem("usuario", email);

        window.location.href = "index.html";

    });

}

const formularioRegistro = document.querySelector("form");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(e) {

        e.preventDefault();

        localStorage.setItem("logueado", "true");

        window.location.href = "index.html";

    });
}

function agregarAlCarrito(boton, producto) {

    let card = boton.closest(".card");

    let cantidad = parseInt(
        card.querySelector(".cantidad").innerText
    );

    producto.cantidad = cantidad;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

}

function comprarAhora(boton, producto) {

    agregarAlCarrito(boton, producto);

    window.location.href = "carrito.html";

}

function actualizarContador() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let contador = document.getElementById("contador-carrito");

    if (contador) {

        let total = 0;

        carrito.forEach(producto => {
            total += producto.cantidad || 1;
        });

        contador.textContent = total;

    }

}

    actualizarContador();

    const contenedorCarrito = document.getElementById("productos-carrito");

if (contenedorCarrito) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach((producto, indice) => {

    contenedorCarrito.innerHTML += crearCardCarrito(producto, indice);

    });

}

function crearCardCarrito(p, indice) {

    return `
    
    <div class="col-md-4">

        <div class="card card-stardew h-100 text-center shadow">

            <img src="${p.imagen}" class="card-img-top">

            <div class="card-body">

                <h5 class="card-title">
                    ${p.nombre}
                </h5>

                <p class="card-text">
                    ${p.descripcion}
                </p>

                <p class="fw-bold">
                    $${p.precio}
                </p>

                <div class="d-flex justify-content-center align-items-center gap-2 mb-3">

                <button class="btn btn-danger"
                onclick="cambiarCantidadCarrito(${indice}, -1)">
                    -
                </button>

                <span>${p.cantidad}</span>

                <button class="btn btn-success"
                onclick="cambiarCantidadCarrito(${indice}, 1)">
                    +
                </button>

            </div>

                <p class="fw-bold">
                    Subtotal: $${p.precio * p.cantidad}
                </p>

                <button class="btn btn-danger btn-eliminar"
                        onclick="eliminarDelCarrito(${indice})">
                    Eliminar
                </button>

            </div>

        </div>

    </div>

    `;
}

function eliminarDelCarrito(indice) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(indice, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}

function irAlCarrito() {

    window.location.href = "carrito.html";

}

function actualizarResumen() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let resumen = document.getElementById("resumen-productos");
    let totalTexto = document.getElementById("total-carrito");

    if (!resumen) return;

    resumen.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        let subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        resumen.innerHTML += `
            <p>
                ${producto.nombre} x${producto.cantidad}
                <br>
                $${subtotal}
            </p>
        `;

    });

    totalTexto.textContent = `Total: $${total}`;
}

actualizarResumen();

function vaciarCarrito() {

    localStorage.removeItem("carrito");

    location.reload();

}

function cambiarCantidadCarrito(indice, cambio) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad < 1) {
        carrito[indice].cantidad = 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}

function finalizarCompra() {

    alert("¡Gracias por tu compra!");

    localStorage.removeItem("carrito");

    window.location.href = "index.html";

}