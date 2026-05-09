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
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">

            <a class="navbar-brand d-flex align-items-center" href="index.html">
                <img src="img/logo.png" alt="logo" width="60" class="me-2">
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
        <a href="login.html" class="btn btn-outline-light me-2">
            Login
        </a>

        <a href="registro.html" class="btn btn-success">
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
const productos = [
    {
        nombre: "Fruta Milenaria",
        descripcion: "Una fruta antigua muy valiosa.",
        precio: 550,
        imagen: "img/Ancient_fruit.webp"
    },

    {
        nombre: "Leche Grande",
        descripcion: "Leche fresca de alta calidad.",
        precio: 350,
        imagen: "img/Large_Milk.webp"
    },

    {
        nombre: "Pez Glacial",
        descripcion: "Un pez raro encontrado en invierno.",
        precio: 1000,
        imagen: "img/Glacierfish.webp"
    }
];

const contenedor = document.getElementById("productos");

if (contenedor) {

    productos.forEach(p => {

        contenedor.innerHTML += `
        
        <div class="col-md-4">

            <div class="card h-100 text-center shadow">

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

                    <button class="btn-comprar">
                        Comprar
                    </button>

                </div>

            </div>

        </div>

        `;

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