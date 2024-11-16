import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from '../vrt/vrt.config.js';

// Ruta de las imagenes
const imagesDir = './cypress/screenshots';
const version1Dir = `${imagesDir}/ghost-4.5`;
const version2Dir = `${imagesDir}/ghost-5.96`;
const outputDir = `${imagesDir}/comparisons`;

// Asegúrate de que el directorio de salida exista
fs.mkdirSync(outputDir, { recursive: true });

// Obtener los nombres de las imágenes
const version1Images = fs.readdirSync(version1Dir);
const version2Images = fs.readdirSync(version2Dir);

version1Images.forEach((image, index) => {
  const img1Path = `${version1Dir}/${image}`;
  const img2Path = `${version2Dir}/${version2Images[index]}`;

  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));
  const { width, height } = img1;

  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data, img2.data, diff.data, width, height, options
  );

  const totalPixels = width * height;
  const diffPercentage = String(((numDiffPixels / totalPixels) * 100).toFixed(2));

  let nombreImagen = image.slice(0, -4);
  let diffPath = `${outputDir}` + '/' + nombreImagen + '-' + diffPercentage + '.png';

  fs.writeFileSync(diffPath, PNG.sync.write(diff));
});
