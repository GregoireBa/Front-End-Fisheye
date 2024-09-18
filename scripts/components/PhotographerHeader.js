export function PhotographerHeader(photographer){
    const headerDiv = document.createElement("div");
    headerDiv.classList.add('photograph-header');

  // Mettre à jour le contenu de l'en-tête du photographe
  headerDiv.innerHTML = `
    <div>
      <h1 class="h2-photographerID">${photographer.name}</h1>
      <p class="p-city-country-photographerID">${photographer.city}, ${photographer.country}</p>
      <p class="p-tagline-photographerID">${photographer.tagline}</p>
    </div>
    <button id="openModal" class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img class="portrait-header" src="assets/images/photographers/${photographer.portrait}" alt="Portrait of ${photographer.name}">
  `;

    return headerDiv
}