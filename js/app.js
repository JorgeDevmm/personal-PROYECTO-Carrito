//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#listaCarrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

// Eventos
cargarEventListener();

function cargarEventListener() {
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e) {
  // prevenir acción por defecto de enlazar al id
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    console.log('Agregando...');
  }
}
