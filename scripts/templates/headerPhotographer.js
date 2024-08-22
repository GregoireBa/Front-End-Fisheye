export function updatePhotographerInfo(photographer) {
  const headerDiv = document.querySelector(".photograph-header");
  if (!headerDiv) {
    console.error("Div 'photograph-header' not found");
    return;
  }

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

  // Ajouter la modale à la page
  const modalHTML = `
    <div role="dialog" aria-modal="true" id="contact_modal" style="display: none;">
      <div class="modal" aria-labelledby="modal-heading">
        <div class="header-modal">
          <h1 class="title-modal" id="modal-heading">Contactez-moi ${photographer.name}</h1 >
          <button class="close" type="button" aria-label="bouton fermer la modal" onclick="closeModal()">
            <img src="assets/icons/close.svg" alt="icone bouton fermer la modale" />
          </button>
        </div>
        <form id="contact_form">
          <div>
            <label for="lastname_input">Nom</label>
            <input type="text" id="lastname_input" name="lastname_input" />

            <label for="email">Email</label>
            <input type="email" id="email" name="email"/>

            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5"></textarea>
          </div>
          <button type="submit" class="contact_button">Envoyer</button>
        </form>
      </div>
    </div>
  `;

  // Ajouter la modale au document (par exemple, à la fin du body)
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Ajout d'un écouteur d'événements pour la soumission du formulaire
  document
    .getElementById("contact_form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche la soumission réelle du formulaire
      const lastName = document.getElementById("lastname_input").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      console.log("Nom saisi:", lastName, "Email saisi:", email, "Message saisi:", message); // Affiche la valeur saisie dans la console
    });
}
