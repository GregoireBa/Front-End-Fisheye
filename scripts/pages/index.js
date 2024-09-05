import { getPhotographers } from '../utils/api.js';
import photographerTemplate from '../templates/photographer.js';

async function init() {
    try {
        const photographers = await getPhotographers();
        const templatePhotographer = photographerTemplate();
        templatePhotographer.createHomePage(photographers);
    } catch (error) {
        console.error("Failed to load photographers: ", error);
    }
}

init();
