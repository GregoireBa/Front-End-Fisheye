import { PhotographerFactory } from "../factory/photographerFactory.js";
import { photographerTemplate } from "../templates/photographer.js"; // Assurez-vous que le chemin est correct

async function getPhotographers() {
    const response = await fetch('/data/photographers.json');
    const data = await response.json();
    return data;
}

async function displayData(photographersData) {
    const photographersSection = document.querySelector(".photographer_section");

    photographersData.forEach((photographerData) => {
        // Utilisez la factory pour créer un objet photographe
        const photographer = PhotographerFactory.createPhotographer(photographerData);
        // Utilisez photographerTemplate pour obtenir le DOM de la carte
        const userCardDOM = photographerTemplate(photographer).getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
