export function Modal() {

    const modalHTML = `
    <div role="dialog" aria-modal="true" id="contact_modal" style="display: none;">
      <div class="modal" aria-labelledby="modal-heading">
        <div class="header-modal">
          <h1 class="title-modal" id="modal-heading">Contactez-moi ${photographer.name}</h1 >
          <button class="close" type="button" aria-label="bouton fermer la modal" onclick="closeModal()">
            <img src="assets/icons/close.svg" alt="icone bouton fermer la modale" />
          </button>
        </div>
      </div>
    </div>
  `;

    // Ajouter la modale au document à la fin du body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}