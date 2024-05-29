import { getPhotographers } from '../utils/api.js';

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = photographerTemplate(photographer).getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    try {
        const photographers = await getPhotographers();
        displayData(photographers);
    } catch (error) {
        console.error("Failed to load photographers: ", error);
    }
}

init();
