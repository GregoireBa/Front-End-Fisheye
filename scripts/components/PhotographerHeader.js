export function PhotographerHeader(photographer, displayModal){
    const headerDiv = document.createElement("div");
    headerDiv.classList.add('photograph-header');

  headerDiv.innerHTML = `
    <div>
      <h1 class="h2-photographerID">${photographer.name}</h1>
      <p class="p-city-country-photographerID">${photographer.city}, ${photographer.country}</p>
      <p class="p-tagline-photographerID">${photographer.tagline}</p>
    </div>
    <button id="openModal" class="contact_button">Contactez-moi</button>
    <img class="portrait-header" src="assets/images/photographers/${photographer.portrait}" alt="Portrait of ${photographer.name}">
  `;

  // Utilisation de la fonction displayModal passée en argument
  const openModalButton = headerDiv.querySelector('#openModal');
  openModalButton.addEventListener('click', displayModal);

    return headerDiv
}