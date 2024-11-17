const { create } = require("domain");
let fs = require("fs");
let path = require("path");

function createReport() {
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
              <h1><strong>Pruebas de Regresión Visual con ResembleJS</strong></h1>
            </div>
          </div>
  `;

  try {
    let directoryPath = "./kraken/reports";

    // Leer directorios principales
    let files = fs.readdirSync(directoryPath, { withFileTypes: true });
    let folders = files
      .filter((file) => file.isDirectory())
      .map((folder) => folder.name);

      if (folders.length !== 2) {
      throw new Error("Se requieren al menos dos carpetas para comparar.");
    }
    
    // Leer imágenes de las dos carpetas y las de comparación
    let dir1 = fs.readdirSync(path.join(directoryPath, folders[0], 'screenshots'));
    let dir2 = fs.readdirSync(path.join(directoryPath, folders[1], 'screenshots'));
    let imgComp = fs.readdirSync(path.join('./kraken', "comparisons"));

    if (dir1.length === dir2.length) {
      for (let index = 0; index < dir1.length; index++) {
        let rutaImg1 = `${directoryPath}/${folders[0]}/screenshots/${dir1[index]}`;
        let rutaImg2 = `${directoryPath}/${folders[1]}/screenshots/${dir2[index]}`;
        let rutaComp = `kraken/comparisons/${imgComp[index]}`;
        let escenario = `Escenario ${index + 1}`;
        let porcentaje = 0; // Sustituir por la comparación real
        console.log(rutaImg1);
        reportHTML += `
          <div class="row">
            <div class="col-12">
              <h2 class="bg-primary text-white text-center p-3 rounded"><strong>${escenario}</strong></h2>
              <div class="row">
                  <div class="col-4 text-center">
                      <h3>Imagen 1 (Ghost 4.5)</h3>
                      <img src="${rutaImg1}" alt="Imagen 1" class="img-fluid">
                  </div>
                  <div class="col-4 text-center">
                      <h3>Imagen 2 (Ghost 5.96)</h3>
                      <img src="${rutaImg2}" alt="Imagen 2" class="img-fluid">
                  </div>
                  <div class="col-4 text-center">
                      <h3>Diferencia porcentual: ${porcentaje}%</h3>
                      <img src="${rutaComp}" alt="Diferencia" class="img-fluid">
                  </div>
              </div>
            </div>
          </div>
          <hr/>
        `;
      }
    } else {
      console.log("El tamaño de las listas no coincide.");
    }

    reportHTML += `
          </div>
        </body>
      </html>
    `;

    return reportHTML;
  } catch (err) {
    console.error("Error generando el reporte:", err);
    throw err;
  }
}

// Generar el reporte y guardarlo en un archivo
let report = createReport();
fs.writeFileSync("./report_kraken.html", report);
console.log("Reporte generado exitosamente.");