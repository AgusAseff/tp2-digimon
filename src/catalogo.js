import "./style.css";

const apiUrl = "https://digimon-api.vercel.app/api/digimonx";

let digimons = [];

const $grid = document.querySelector("#grilla");
const $estado = document.querySelector("#estado");
const $buscador = document.querySelector("#buscador");
const $filtro = document.querySelector("#filtro-nivel");
const $form = document.querySelector("#controles");

async function digiApi() {
  $estado.textContent = "Cargando....";
  $estado.className = "estado estado--cargando";

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const datos = await res.json();
    digimons = datos;
    mostrarDigimon(digimons);
    mostrarNiveles(digimons);

    $estado.textContent = `${digimons.length} Digimon`;
    $estado.className = "estado";
  } catch (error) {
    console.error(error);
    $estado.textContent =
      "No se pudieron cargar los Digimon. Revisá tu conexión y probá de nuevo.";
    $estado.className = "estado estado--error";
  }
}

function mostrarDigimon(lista) {
  $grid.replaceChildren();
  for (const digimon of lista) {
    const $articulo = document.createElement("article");
    const $h2 = document.createElement("h2");
    const $p = document.createElement("p");
    const $img = document.createElement("img");

    $articulo.className = "tarjeta";
    $p.className = "nivel";
    $p.textContent = digimon.level;
    $h2.textContent = digimon.name;
    $img.src = digimon.img;
    $img.alt = `Imagen de ${digimon.name}`;
    $img.loading = "lazy";

    $articulo.append($img, $h2, $p);
    $grid.appendChild($articulo);
  }
}

function mostrarNiveles(lista) {
  const niveles = [...new Set(lista.map((digimon) => digimon.level))];
  for (const nivel of niveles) {
    const $option = document.createElement("option");
    $option.value = nivel;
    $option.textContent = nivel;
    $filtro.appendChild($option);
  }
}

function aplicarFiltros() {
  const nivel = $filtro.value;
  const texto = $buscador.value.trim().toLowerCase();
  const filtrados = digimons.filter(
    (digimon) =>
      digimon.name.toLowerCase().includes(texto) &&
      (nivel === "todos" || digimon.level === nivel),
  );

  mostrarDigimon(filtrados);

  if (filtrados.length === 0) {
    $estado.textContent = "Sin resultado.";
    $estado.className = "estado";
  } else {
    $estado.textContent = `${filtrados.length} Digimon`;
    $estado.className = "estado";
  }
}
$buscador.addEventListener("input", aplicarFiltros);
$filtro.addEventListener("change", aplicarFiltros);
$form.addEventListener("submit", (e) => e.preventDefault());

digiApi();
