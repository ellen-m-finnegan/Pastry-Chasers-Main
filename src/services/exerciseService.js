// Helper function to construct a query string from an object of parameters
function constructQueryString(params) {
  return new URLSearchParams(params).toString();
}

// API key and base URL for the exercise API
const API_KEY = "d23c+r1ELW1wx72q4S+UVg==lie4avxP7aBrkZiv";
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

// Fetches exercises from the API using optional query parameters
export async function getExercises(params = {}) {
  // Build the query string from params
  const queryString = constructQueryString(params);
  // Construct the full API URL
  const fullURL = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  try {
    // Make the GET request to the API
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
      },
    });

    // Throw an error if the response is not OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return the JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    // Log any errors and return null
    console.error("Error fetching exercises:", error);
    return null;
  }
}
