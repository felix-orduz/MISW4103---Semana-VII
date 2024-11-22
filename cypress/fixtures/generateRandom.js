import { faker } from "@faker-js/faker";

export class FakerGenerador {
  //Mapas de categorías y métodos de faker
  static categoryMethods = {
    name: ["fullName", "firstName", "lastName", "jobTitle"],
    address: ["streetAddress", "city", "state", "country", "zipCode"],
    internet: ["email", "userName", "url", "domainName", "password"],
    commerce: ["productName", "price", "department", "productDescription"],
    company: ["companyName", "catchPhrase", "industry"],
    finance: ["account", "amount", "currencyCode"],
    phone: ["phoneNumber"],
    lorem: ["word", "sentence", "paragraph"],
  };

    // Lista de códigos de idiomas ISO 639-1
  static languageCodes = [
    "en", // English
    "es", // Spanish
    "fr", // French
    "de", // German
    "zh", // Chinese
    "ja", // Japanese
    "ko", // Korean
    "ru", // Russian
    "ar", // Arabic
    "hi", // Hindi
    "pt", // Portuguese
    "it", // Italian
  ];

  //Metodo para generar un código de idioma aleatorio
  static getRandomLanguage() {
    return faker.helpers.arrayElement(languageCodes);
  }

  //Metodo para generar datos aleatorios
  static generateRandomData() {
    //Reseteamos la semilla
    faker.seed();

    //Seleccionamos una categoría aleatoria de las categorías definidas
    let categories = Object.keys(this.categoryMethods);
    let randomCategory = faker.helpers.arrayElement(categories);

    //Seleccionamos un método aleatorio de la categoría
    let randomMethod = faker.helpers.arrayElement(
      this.categoryMethods[randomCategory]
    );

    //Invocamos el método aleatorio
    let randomData;
    if (faker[randomCategory] && faker[randomCategory][randomMethod]) {
      randomData = faker[randomCategory][randomMethod]();
    } else {
      //Si el método no es válido, generamos palabras aleatorias
      randomData = faker.lorem.words();
    }

    return randomData;
  }
}
