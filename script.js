// Initialize map
const map = L.map('map').setView([20, 0], 2);

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 5,
}).addTo(map);

// Load country data
fetch('data.json')
  .then(res => res.json())
  .then(data => {

    data.forEach(country => {

      const marker = L.marker([country.lat, country.lng]).addTo(map);

      marker.on('click', () => {
        document.getElementById('details').innerHTML = `
          <strong>${country.name}</strong><br/>
          Alliances: ${country.alliances.join(", ")}<br/>
          Conflicts: ${country.conflicts.join(", ")}<br/>
          Trade: ${country.trade.join(", ")}
        `;
      });

    });

  });
