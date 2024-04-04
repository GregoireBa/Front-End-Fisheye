import { PhotographerFactory } from "../factory/photographerFactory.js";

// Fonction pour charger les données des photographes depuis le JSON
async function getPhotographers() {
    const response = await fetch('../data/photographers.json');
    const data = await response.json();
    return data; // Retourne directement l'objet résultant, sans déstructuration ici
}

async function displayData(photographersData) {
    const photographersSection = document.querySelector(".photographer_section");

    photographersData.forEach((photographerData) => {
        const photographer = PhotographerFactory.createPhotographer(photographerData);
        const userCardDOM = photographer.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers(); // S'assure que getPhotographers retourne un objet avec une propriété photographers
  displayData(photographers);
}

init();