const apiKey = 'FlAVJpQLrWTkmDlXilgCIzvFnji3BvKAVKilWIns';
const url = 'https://api.nasa.gov/planetary/apod';

fetch(`${url}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('fotoDelDia').innerHTML = `
        <div class="card">
            <h3>${data.title}</h3>
            <img src="${data.url}" alt="${data.title}">
            <p>${data.explanation}</p>
            <p>Fecha: ${data.date}</p>
        </div>`;
    });

document.getElementById('btnFecha').addEventListener('click', () => {
    const fecha = document.getElementById('fecha').value;
    if(!fecha) {
        alert('Poné una fecha');
        return;
    }
    fetch(`${url}?api_key=${apiKey}&date=${fecha}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('fotoFecha').innerHTML = `
            <div class="card">
                <h3>${data.title}</h3>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
                <p>Date: ${data.date}</p>
            </div>`;
        });
});

document.getElementById('btnRandom').addEventListener('click', () => {
    const cant = document.getElementById('cantidad').value;
    if(cant < 1 || cant > 10) {
        alert('Entre 1 y 10');
        return;
    }
    fetch(`${url}?api_key=${apiKey}&count=${cant}`)
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(f => {
                html += `
                <div class="card">
                    <h3>${f.title}</h3>
                    <img src="${f.url}" alt="${f.title}">
                    <p>${f.explanation}</p>
                    <p>Date: ${f.date}</p>
                </div>`;
            });
            document.getElementById('fotosRandom').innerHTML = html;
        });
});
