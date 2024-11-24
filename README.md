# MISW4103-Semana-VII
- Daniel Andrade Suárez - d.andrades@uniandes.edu.co
- Daniel Oicatá Hernández - d.oicata@uniandes.edu.co
- Felix Orduz - f.orduz@uniandes.edu.co
- Nixon Ortiz - nf.ortiz@uniandes.edu.co

## Ejecutar las pruebas

### Prerequisitios
- Node JS (versión superior a la 15.0)
- Ghost ejecutandose (versión 5.96.0)
- Git (versión 2.46.0)

### Clone del repositorio
A través del comando git clone, se debe clonar el repositorio a un directorio local. 

### Recomendaciones para la ejecución de las pruebas:**
- **Condiciones iniciales para ejecutar pruebas en Ghost:** Las pruebas deben ejecutarse en la versión de Ghost 5.96 y se enfocan en las funcionalidades principales de la ABP (Posts, Pages, Tags, Members, Settings y Diseño de Ghost). Para evitar interferencias en los resultados, se recomienda que estas secciones estén vacías y sin contenido en drafts, ya que elementos existentes pueden afectar la ejecución correcta de las pruebas. Aplica para Cypress como a Kraken.

- **Manejo de errores iniciales en Cypress y Kraken:** Al ejecutar las pruebas por primera vez, Cypress y Kraken pueden presentar errores inesperados, como problemas para cargar Ghost a tiempo. Si las dos primeras ejecuciones fallan, se recomienda reintentarlas, ya que en la mayoría de los casos, las pruebas logran completarse exitosamente después de estos dos intentos.

### Instalación de dependencias:
- Las dependencias del proyecto están definidas en los archivos package.json y package-lock.json. Para instalarlas, primero se debe ejecutar `npm install` para descargar e instalar todas las dependencias especificadas.

### Instalacion de Ghost
- Primero: Instalar Ghost-CLI 
`npm install ghost-cli@latest -g`

- Luego, en su terminal, acceda a un directorio vacío y ejecute el comando de instalación:
`ghost install local`

- Una vez finalizada la instalación, dirigase a  `http://localhost:2368/ghost` para acceder a Ghost Admin.

### Ejecución en Cypress
- **Instalación de Cypress:** Cypress se instala con el comando `npm install cypress --save-dev`. Una vez instalado, puede verificar la versión en el archivo package.json la cual debe ser `13.5.2` para asegurar la compatibilidad con este repositorio.
  
- **Configuración de credenciales:** En la ruta `cypress/fixtures/`, se encuentra el archivo `properties.json`, donde es necesario reemplazar los valores de `email`, `password` y `apiKey` con las credenciales para ejecutar las pruebas correctamente. Está key se usa para la ejecución de pruebas que usan Mockaroo, especificamente en las pruebas que usan la generación de datos **data pool Pseudo aleatorio**. **El valor de la `apiKey` se encuentra en la entrega de coursera**.

- **Ejecución de pruebas**: Para iniciar las pruebas, se abre una terminal y se ejecuta el comando `npx cypress open`, lo que lanzará la interfaz de Cypress. A continuación, cree un nuevo proyecto apuntando al directorio donde se clonó el repositorio.

 - Para ejecutar las pruebas, seleccione cada archivo `*.cy.js` y haga clic para ejecutarlo. Se recomienda realizar la ejecución de los archivos uno por uno para garantizar la ejecución exitosa de cada funcionalidad de Ghost.
  
### Ejecución en Kraken
- **Instalación de Kraken:** Para instalar Kraken, utiliza el comando `npm install kraken-node`. Después de la instalación, es importante verificar que todos los prerequisitos necesarios estén cumplidos. Ejecutar el comando `npx kraken-node doctor` para confirmar que todos los componentes requeridos están instalados. Si algún prerequisito falta, se debe instalar antes de ejecutar las pruebas. Se recomienda tener una versión de Node de `16`.
  
- **Configuración de credenciales:** En la ruta `kraken\features\web\properties.json`, se encuentra el archivo `properties.json`, donde es necesario reemplazar los valores de `email` y `password` con las credenciales para ejecutar las pruebas correctamente.

- **Ejecución de pruebas**: En primera instancia, se debe ingresar a la carpeta de Kraken. Para ello, desde la terminal se debe correr el comando `cd kraken`. Luego, en la ruta `kraken\features\features` existen 13 pruebas con el formato de nombre `E000XXX.feature`.

 - Para poder correr las pruebas es necesario ir copiando cada escenario, es decir, tomar cada `E000XXX.feature` y pegar su contenido en el archivo `features\ghost.feature` y luego ejecutar la prueba con el comando `npx kraken-node run`.
