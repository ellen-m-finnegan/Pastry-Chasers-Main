function constructQueryString(params) {
  return new URLSearchParams(params).toString();
}

const API_KEY = "d23c+r1ELW1wx72q4S+UVg==lie4avxP7aBrkZiv";
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

export async function getExercises(params = {}) {
  const queryString = constructQueryString(params);
  const fullURL = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  try {
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
}

// Exported function for searching exercises
export async function searchExercises(params) {
  return getExercises(params);
}
