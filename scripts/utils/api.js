/**
 * Fetches data from a JSON file and returns the parsed data.
 * @param {string} url - The URL to the JSON file.
 * @returns {Promise<any>} The parsed JSON data.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch data: ", error);
        throw error;
    }
}

/**
 * Retrieves the list of all photographers from the JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of photographer objects.
 */
async function getPhotographers() {
    return fetchData('./data/photographers.json').then(data => data.photographers);
}


async function getPhotographerById(photographerId) {
    const data = await fetchData('./data/photographers.json')
    const photographer = data.photographers.find(p => p.id === photographerId)
    const media = data.media.filter(m => m.photographerId === photographerId)

    return { ...photographer,media }
}

export { getPhotographers, getPhotographerById };
