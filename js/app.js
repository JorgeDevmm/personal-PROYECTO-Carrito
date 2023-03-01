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
    // subo dos niveles al selector
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Leer el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
  console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('.info-card h4').textContent,
    precio: curso.querySelector('p span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'), //obtengo un atributo de un elemento
    cantidad: 1,
  };

  console.log(infoCurso);
}
