const apiUrl = "https://digimon-api.vercel.app/api/digimon";

async function digiApi() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Error ${res.status} al buscar el digimon`);
    }

    const datos = await res.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}

digiApi();
