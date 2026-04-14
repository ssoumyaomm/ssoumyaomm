var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 5,
}).addTo(map);

// Load GeoJSON (for country shapes)
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(res => res.json())
  .then(geoData => {

    // Load your custom data.json
    fetch('data.json')
      .then(res => res.json())
      .then(countryData => {

        L.geoJSON(geoData, {
          onEachFeature: function (feature, layer) {

            layer.on('click', function () {
              let name = feature.properties.name;

              // Find matching country in your JSON
              let data = countryData.find(c => c.name === name);

              if (data) {
                document.getElementById("details").innerText =
                  `Country: ${name}
Alliances: ${data.alliances.join(", ")}
Conflicts: ${data.conflicts.join(", ")}
Trade: ${data.trade.join(", ")}`;
              } else {
                document.getElementById("details").innerText =
                  `Country: ${name} (No data available)`;
              }
            });

          }
        }).addTo(map);

      });

  });
