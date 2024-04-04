import { PhotographerFactory } from "../factory/photographerFactory.js";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'), 10);

    fetch("/data/photographers.json")
        .then(response => response.json())
        .then(data => {
            const photographerData = data.photographers.find(p => p.id === photographerId);
            if (photographerData) {
                const photographer = PhotographerFactory.createPhotographer(photographerData);
                photographer.displayDetails();
            } else {
                console.error("Photographe non trouvé.");
            }
        })
        .catch(error => console.error("Erreur lors du chargement des données des photographes:", error));
});