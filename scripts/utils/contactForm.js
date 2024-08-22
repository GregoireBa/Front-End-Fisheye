function displayModal() {
    const modal = document.getElementById("contact_modal"); 
    const closeBtn = document.querySelector('.close');
    
    // Empêcher le défilement
    document.body.classList.add("no-scroll");
    
    // Afficher la modal
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus sur le bouton de fermeture
    closeBtn.focus();

    // Ajouter les sentinelles pour piéger le focus
    trapFocus(modal);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const openModal = document.getElementById('openModal');
    
    // Masquer la modal
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    
    // Restaurer le défilement
    document.body.classList.remove("no-scroll");

    // Restaurer l'accessibilité du reste du contenu pour les lecteurs d'écran
    const mainWrapper = document.getElementById("main");
    mainWrapper.setAttribute("aria-hidden", "false");
    
    // Retirer le piège de focus
    removeTrapFocus();
    
     // Remet le focus sur le bouton d'ouverture
    openModal.focus();
}

function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    function handleFocus(event) {
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

    function maintainFocus(event) {
        if (!modal.contains(event.target)) {
            event.stopPropagation();
            lastFocusableElement.focus();
        }
    }

    modal.addEventListener('keydown', handleFocus);
    document.addEventListener('focusin', maintainFocus);

    // Sauvegarde des fonctions pour les supprimer lors de la fermeture de la modal
    modal._trapFocus = { handleFocus, maintainFocus };
}

function removeTrapFocus() {
    const modal = document.getElementById("contact_modal");
    if (modal._trapFocus) {
        modal.removeEventListener('keydown', modal._trapFocus.handleFocus);
        document.removeEventListener('focusin', modal._trapFocus.maintainFocus);
        delete modal._trapFocus;
    }
}

// Gestion de la touche "Échap" pour fermer la modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.code === 'Escape') {
        const modal = document.getElementById('contact_modal');
        if (modal && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    }
});
