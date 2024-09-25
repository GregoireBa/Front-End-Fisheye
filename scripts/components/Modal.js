export function Modal(contentDOM) {
  const modalElement = document.createElement("div");

  modalElement.setAttribute("role", "dialog");
  modalElement.setAttribute("aria-modal", "true");
  modalElement.id = "contact_modal";
  modalElement.style.display = "none";

  modalElement.innerHTML = `
      <div class="modal" aria-labelledby="modal-heading">
        <div class="header-modal">
          <button class="close" type="button" aria-label="bouton fermer la modal">
            <img src="assets/icons/close.svg" alt="icone bouton fermer la modale" />
          </button>
        </div>

        <div class="modal-body"></div>
      </div>
    `;

  // Ajout du contenu passé en paramètre dans la modale
  if (contentDOM) {
    const modalBody = modalElement.querySelector(".modal-body");
    modalBody.appendChild(contentDOM);
  }

  // Fonction pour déplacer ou ajouter un élément dans le header de la modale
  modalElement.addToHeader = function (headerContent) {
    const headerModal = modalElement.querySelector(".header-modal");
    const closeButton = headerModal.querySelector(".close"); // Le bouton de fermeture
    if (headerModal && headerContent && closeButton) {
      // Insérer headerContent avant le bouton de fermeture
      headerModal.insertBefore(headerContent, closeButton);
    }
  };

  function displayModal() {
    // Empêcher le défilement
    document.body.classList.add("no-scroll");

    // Afficher la modal
    modalElement.style.display = "block";
    modalElement.setAttribute("aria-hidden", "false");

    // Focus sur le bouton de fermeture
    const closeBtn = modalElement.querySelector(".close");
    closeBtn.focus();

    // Ajouter les sentinelles pour piéger le focus
    trapFocus(modalElement);
  }

  function closeModal() {
    // Masquer la modal
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");

    // Restaurer le défilement
    document.body.classList.remove("no-scroll");

    // Restaurer l'accessibilité du reste du contenu pour les lecteurs d'écran
    const mainWrapper = document.getElementById("main");
    if (mainWrapper) {
      mainWrapper.setAttribute("aria-hidden", "false");
    }

    // Retirer le piège de focus
    removeTrapFocus();

    // Remettre le focus sur le bouton d'ouverture si disponible
    const openModal = document.getElementById("openModal");
    if (openModal) {
      openModal.focus();
    }
  }

  // Piège le focus à l'intérieur de la modale
  function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    function handleFocus(event) {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          // Si on appuie sur Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          // Si on appuie seulement sur Tab
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }

    function maintainFocus(event) {
      if (!modal.contains(event.target)) {
        event.stopPropagation();
        lastFocusableElement.focus();
      }
    }

    modal.addEventListener("keydown", handleFocus);
    modal.addEventListener("focusin", maintainFocus);

    // Sauvegarde des fonctions pour les supprimer lors de la fermeture de la modal
    modal._trapFocus = { handleFocus, maintainFocus };
  }

  function removeTrapFocus() {
    if (modalElement._trapFocus) {
      modalElement.removeEventListener(
        "keydown",
        modalElement._trapFocus.handleFocus
      );
      modalElement.removeEventListener(
        "focusin",
        modalElement._trapFocus.maintainFocus
      );
      delete modalElement._trapFocus;
    }
  }

  // Gestion de la touche "Échap" pour fermer la modale
  modalElement.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.code === "Escape") {
      if (modalElement.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    }
  });

  // Gestion de la fermeture en cliquant sur le bouton de fermeture
  modalElement.querySelector(".close").addEventListener("click", closeModal);

  return {
    modalElement,
    displayModal,
    closeModal,
    trapFocus,
    removeTrapFocus,
    addToHeader: modalElement.addToHeader,
  };
}
