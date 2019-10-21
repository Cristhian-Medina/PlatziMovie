// convertir este codigo jQuery a VanilaJS
$.ajax({
  url: "http://......",
  context: document.body
}).done(function (e) {
  if (e.viajes) {
    var ulO = document.getElementById("listaID");
    if (ulO) {
      document.body.removeChild(ulO);
    }

    var ul = document.createElement("ul");
    ul.id = "listaID";

    e.viajes.forEach(function (_item) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.innerHTML = "Placa: " + _item.placa + " #Interno " + _item.nro_movil + " | viaje: " + _item.id_viaje;
      ul.appendChild(li);
      li.appendChild(span);
    });

    document.body.appendChild(ul);
  }
});

// Mi solución
fetch('http://......')
  .then(response => {
    if (response.viajes) {
      const ulO = document.getElementById("listaID");
      if (ulO) {
        document.body.removeChild(ulO);
      }

      const ul = document.createElement("ul");
      ul.id = "listaID";

      response.viajes.forEach(_item => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerHTML = `Placa: ${_item.placa} #Interno ${_item.nro_movil} | viaje: ${_item.id_viaje}`;
        ul.appendChild(li);
        li.appendChild(span);
      });

      document.body.appendChild(ul);
    }
  })