export function ContactForm(photographer) {
  const form = document.createElement("form");
  form.id = "contact_form";

  form.innerHTML = `
          <div class="header-modal">
            <h1 class="title-modal" id="modal-heading">Contactez-moi ${photographer.name}</h1>
            <button class="close" type="button" aria-label="bouton fermer la modal">
              <img src="assets/icons/close.svg" alt="icone bouton fermer la modale" />
            </button>
          </div>
          <div>
            <label for="lastname_input">Nom</label>
            <input type="text" id="lastname_input" name="lastname_input" />

            <label for="email">Email</label>
            <input type="email" id="email" name="email"/>

            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5"></textarea>
          </div>

          <button type="submit" class="contact_button">Envoyer</button>
    `;

  // Ajout de l'écouteur d'événement pour la soumission du formulaire
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission réelle du formulaire
    const lastName = form.querySelector("#lastname_input").value;
    const email = form.querySelector("#email").value;
    const message = form.querySelector("#message").value;

    console.log({ lastName, email, message });
  });

  return form;
}
