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

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //reseteamos el arreglo

    // limipiar HTML
    limpiarHTML();
  });
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

// Elimina un curso del carrito
function eliminarCurso(e) {
  console.log(e.target.classList);
  // si contiene la clase borrar curso clase del enlace
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id'); //obtengo el id a eliminar

    // Eliminar del arreglo de articulosCarrito por data-id

    articulosCarrito = articulosCarrito.filter((curso) => {
      if (curso.id === cursoId) {
        if (curso.cantidad > 1) {
          curso.cantidad -= 1;

          return curso;
        } else {
          delete curso; //elimina arreglo
        }
      } else {
        return curso;
      }
    });

    carritoHTML(); //iterar sobre el carrito y mostrar su HTML
  }
}

// Leer el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
  //curso seleccionado
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('.info-card h4').textContent,
    precio: curso.querySelector('p span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'), //obtengo un atributo de un elemento
    cantidad: 1,
  };

  // Revisa si el elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad += 1;

        return curso; //retorna el objeto actualizado
      } else {
        return curso; //Retorna los objetos que no son los duplicados
      }
    });

    articulosCarrito = [...cursos]; //agregamos el objeto actualizado sea el caso o no
  } else {
    // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; //para no perder la referencia de los cursos agregados
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    // aplicamos destructuring para obtener las propiedades del objeto
    const { imagen, titulo, precio, cantidad, id } = curso;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100" >
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> x </a>
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
