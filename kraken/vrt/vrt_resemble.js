function createReport(fs) {
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

  // Definimos listas con imágenes de Ghost 4.5.0 y Ghost 5.96.0
  let directoryPath = "./kraken/screenshots";
  let imgGhost45 = fs.readdirSync(directoryPath + "/ghost-4.5");
  let imgGhost596 = fs.readdirSync(directoryPath + "/ghost-5.96");
  let imgComp = fs.readdirSync(directoryPath + "/comparisons");

  if (imgGhost45.length === imgGhost596.length) {
    for (let index = 0; index < imgGhost45.length; index++) {
      // Verificamos que estamos tomando las mismas imágenes
      let img1 = imgGhost45[index].slice(0, 7);
      let img2 = imgGhost596[index].slice(0, 7);
      let comp = imgComp[index].slice(0, 7);
      
      if (img1 === img2 && img2 === comp) {
        // Definimos rutas de imágenes
        let rutaImg1 = `./kraken/screenshots/ghost-4.5/${imgGhost45[index]}`;
        let rutaImg2 = `./kraken/screenshots/ghost-5.96/${imgGhost596[index]}`;
        let rutaComp = `./kraken/screenshots/comparisons/${imgComp[index]}`;

        // Extraemos el porcentaje de diferencia
        let porcentaje = imgComp[index].slice(-8, -4);

        // Extraemos el número de escenario
        let escenario = imgGhost45[index].slice(0, 5);

        // Pintamos las imágenes en tres columnas
        reportHTML += `
        <div class="row">
          <div class="col-12">
            <h2 class="bg-primary text-white text-center p-3 rounded"><strong>Escenario ${escenario}</strong></h2>
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
      } else {
        console.log("Las imágenes no coinciden");
        console.log(index, img1, img2, comp);
      }
    }
  } else {
    console.log("El tamaño de las listas no coincide");
  }

  // Cierre del HTML completo
  reportHTML += `
      </div>
    </body>
  </html>
  `;

  return reportHTML;
}

(async () => {
  const fs = require("fs");
  const compareImages = require("resemblejs/compareImages");
  const { options } = require("./config.json");

  const imagesDir = "./kraken/screenshots";
  const version1Dir = `${imagesDir}/ghost-4.5`;
  const version2Dir = `${imagesDir}/ghost-5.96`;
  const outputDir = `${imagesDir}/comparisons`;

  // Crear directorio de salida
  fs.mkdirSync(outputDir, { recursive: true });

  // Obtener nombres de las imágenes
  const version1Images = fs.readdirSync(version1Dir);
  const version2Images = fs.readdirSync(version2Dir);

  // Validar que las listas tengan el mismo tamaño
  if (version1Images.length !== version2Images.length) {
    console.error("Las listas de imágenes no coinciden en tamaño.");
    return;
  }

  // Comparar imágenes
  for (let index = 0; index < version1Images.length; index++) {
    const img1Path = `${version1Dir}/${version1Images[index]}`;
    const img2Path = `${version2Dir}/${version2Images[index]}`;

    const data = await compareImages(
      fs.readFileSync(img1Path),
      fs.readFileSync(img2Path),
      options
    );

    const nombreImagen = version1Images[index].slice(0, -4);
    const diffPercentage = data.misMatchPercentage;
    const diffPath = `${outputDir}/${nombreImagen}-${diffPercentage}.png`;

    fs.writeFileSync(diffPath, data.getBuffer());
  }

  // Generar el reporte
  const report = createReport(fs);
  fs.writeFileSync(`./report_kraken.html`, report);
})();