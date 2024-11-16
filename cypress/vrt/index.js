const fs = require('fs');

// Definimos los escenarios que queremos pintar
let escenarios = ["E0001", "E0002", "E0003", "E0004"];

function createReport(escenarios) {
  let reportHTML = `
  <html>
    <head>
      <title>Comparación de Imágenes</title>
      <link rel="stylesheet" href="index.css">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    </head>
    <body>
      <div class='container'>
        <div class='row'>
          <div class='col'>
            <h1><strong>Pruebas de Regresión Visual</strong></h1>
          </div>
        </div>
  `;

  for (let esc of escenarios) {
    //Declaramos contador
    let contador = 1;
    let flag = false;

    while (!flag) {
      try {
        //Definimos rutas de imágenes
        let rutaImg1 = `./cypress/screenshots/ghost-4.5/${esc}-${contador}-BS.png`;
        let rutaImg2 = `./cypress/screenshots/ghost-5.96/${esc}-${contador}-RC.png`;

        //Leer los archivos del directorio
        let directoryPath = './cypress/screenshots/comparisons';
        const files = fs.readdirSync(directoryPath);

        //Filtrar los archivos que contienen la cadena con porcentaje
        let searchString = `${esc}-${contador}-BS`;
        const filteredFiles = files.filter(file => file.includes(searchString));
        let porcentaje = filteredFiles[0].slice(-8, -4);
        let diff = `./cypress/screenshots/comparisons/${esc}-${contador}-BS-${porcentaje}.png`;

        //Verificamos que las rutas existan
        fs.accessSync(rutaImg1, fs.constants.F_OK);
        fs.accessSync(rutaImg2, fs.constants.F_OK);
        fs.accessSync(diff, fs.constants.F_OK);

        //Pintamos las imágenes en tres columnas
        reportHTML += `
        <div class="row">
          <div class="col-12">
            <h2 class="bg-primary text-white text-center p-3 rounded" align = "center"><strong>Escenario ${esc}</strong></h2>
            <div class="row">
                <div class="col-4" align="center">
                    <h3>Imagen 1 (Ghost 4.5.0)</h3>
                    <img src="${rutaImg1}" alt="Imagen 1" class="img-fluid">
                </div>
                <div class="col-4" align="center">
                    <h3>Imagen 2 (Ghost 5.96.0)</h3>
                    <img src="${rutaImg2}" alt="Imagen 2" class="img-fluid">
                </div>
                <div class="col-4" align="center">
                    <h3>Diferencia porcentual: ${porcentaje}%</h3>
                    <img src="${diff}" alt="Diferencia" class="img-fluid">
                </div>
            </div>
          </div>
        </div>
      <hr/>
        `;
        
        //Incrementamos el contador
        contador++;
      } catch (error) {
        //Si archivo no encontrado, dejamos de iterar
        flag = true;
      }
    }
  }

  //Cerrar la etiqueta HTML
  reportHTML += `
      </div>
    </body>
  </html>
  `;

  return reportHTML;
}

//Generar el reporte y guardarlo en un archivo
let report = createReport(escenarios);  // Cambié el nombre a 'report' para evitar sobreescribir
fs.writeFileSync(`./report_cypress.html`, report);
console.log("Reporte generado exitosamente.");
