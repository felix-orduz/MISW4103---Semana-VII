
async function fetchMemberData(count = 6, fields = []) {
  const apiKey = Cypress.env("MOCKAROO_API_KEY"); // Reemplaza con tu clave de API de Mockaroo

  try {
    const response = await fetch(
      `https://api.mockaroo.com/api/generate.json?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: count,
          fields: JSON.stringify(fields),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Mockaroo:", error.message);
    throw error;
  }
}

export default { fetchMemberData };
