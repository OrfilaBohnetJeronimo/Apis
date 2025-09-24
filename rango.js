const apiKey = "FlAVJpQLrWTkmDlXilgCIzvFnji3BvKAVKilWIns";
const url = "https://api.nasa.gov/planetary/apod";

const fechaMin = "1995-06-16";
const fechaHoy = new Date().toISOString().split("T")[0];

const inputInicio = document.getElementById("fechaInicio");
const inputFin = document.getElementById("fechaFin");

if (inputInicio && inputFin) {
  inputInicio.setAttribute("min", fechaMin);
  inputInicio.setAttribute("max", fechaHoy);
  inputFin.setAttribute("min", fechaMin);
  inputFin.setAttribute("max", fechaHoy);
}

const btnRango = document.getElementById("btnRango");
if (btnRango) {
  btnRango.addEventListener("click", () => {
    const inicio = inputInicio.value;
    const fin = inputFin.value;

    if (!inicio || !fin) {
      alert("Elegí ambas fechas");
      return;
    }
    if (inicio > fin) {
      alert("La fecha de inicio no puede ser mayor a la de fin");
      return;
    }

    fetch(`${url}?api_key=${apiKey}&start_date=${inicio}&end_date=${fin}`)
      .then(res => res.json())
      .then(data => {
        let html = "";
        data.forEach(f => {
          html += `
            <div class="card">
              <h3>${f.title}</h3>
              <img src="${f.url}" alt="${f.title}">
              <p>${f.explanation}</p>
              <p>Fecha: ${f.date}</p>
            </div>
          `;
        });
        document.getElementById("fotosRango").innerHTML = html;
      })
      .catch(err => {
        console.error(err);
        alert("Hubo un error al cargar las fotos");
      });
  });
}
