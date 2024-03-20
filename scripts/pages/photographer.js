document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'), 10);

    fetch("/data/photographers.json")
        .then(response => response.json())
        .then(data => {
            const photographer = data.photographers.find(p => p.id === photographerId);
            if (photographer) {
                fillPhotographerDetails(photographer);
            } else {
                console.error("Photographe non trouvé.");
            }
        })
        .catch(error => console.error("Erreur lors du chargement des données des photographes:", error));
});

function fillPhotographerDetails(photographer) {
    document.getElementById('photographerPortrait').src = `/assets/photographers/${photographer.portrait}`;
    document.getElementById('photographerName').textContent = photographer.name;
    document.getElementById('photographerLocation').textContent = `${photographer.city}, ${photographer.country}`;
    document.getElementById('photographerTagline').textContent = photographer.tagline;
}