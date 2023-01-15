const API_ENDPOINT = "https://ausfin-api-production.up.railway.app/";
// const API_ENDPOINT = "http://localhost:8080/";

export const camelCase = (string) => {
  return string
    .split(" ")
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

export const fetchFromApi = async (endpoint, formData) => {
  // Convert formData to an Object
  const plainFormData = Object.fromEntries(formData.entries());

  console.log(plainFormData);
  // Convert object to JSON to send in body
  const json = JSON.stringify(plainFormData).replaceAll('"on"', "true");

  console.log(json);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  };
  const response = await fetch(`${API_ENDPOINT}${endpoint}`, options);
  const result = await response.json();
  return result;
};

export const flattenResult = (nested) => {
  const result = {};

  for (const [key, value] of Object.entries(nested)) {
    if (typeof value != "object") {
      result[key] = value;
    } else {
      for (const [subkey, subval] of Object.entries(value)) {
        result[subkey] = subval;
      }
    }
  }
  return result;
};
