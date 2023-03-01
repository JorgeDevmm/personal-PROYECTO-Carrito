//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; //donde llenaremos nuestros productos

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
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('.info-card h4').textContent,
    precio: curso.querySelector('p span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'), //obtengo un atributo de un elemento
    cantidad: 1,
  };

  // Agrega elementos al arreglo de carrito
  articulosCarrito = [...articulosCarrito, infoCurso]; //para no perder la referencia de los cursos agregados
  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        ${curso.titulo}
      </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos dle tbody
function limpiarHTML() {
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  // limpia o remueve el primer elemento de un arreglo
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
