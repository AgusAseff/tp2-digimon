import "./style.css";

const apiUrl = "https://digimon-api.vercel.app/api/digimon";

let digimons = [];

const $grid = document.querySelector("#grilla");
const $estado = document.querySelector("#estado");

async function digiApi() {
  $estado.textContent = "Cargando....";
  $estado.className = "estado estado--cargando";

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Error ${res.status} al buscar el digimon`);
    }

    const datos = await res.json();
    digimons = datos;
    mostrarDigimon(digimons);

    $estado.textContent = `${digimons.length} Digimon`;
    $estado.className = "estado";
  } catch (error) {
    console.error(error);
    $estado.textContent = error;
    $estado.className = "estado estado--error";
  }
}

function mostrarDigimon(lista) {
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

digiApi();
