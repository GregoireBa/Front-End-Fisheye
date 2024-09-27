import UserCard from "../components/UserCard.js";
import { NavBar } from "../components/NavBar.js";
import { PhotographerHeader } from "../components/PhotographerHeader.js";
import { Modal } from "../components/Modal.js";
import { ContactForm } from "../components/ContactForm.js";

function photographerTemplate() {
  function createHomePage(photographers) {
    const root = document.getElementById("root");
    const main = document.getElementById("main");
    const navbar = NavBar(true);
    root.prepend(navbar);
    const photographer_section = document.createElement("div");
    photographer_section.classList.add("photographer_section");
    photographers.forEach((photographer) => {
      photographer_section.appendChild(UserCard(photographer));
    });
    main.appendChild(photographer_section);
  }

  function createPhotographerPage(photographer) {
    const root = document.getElementById("root");

    const header = document.createElement("header");
    root.prepend(header);

    const navbar = NavBar();
    header.appendChild(navbar);

    // Modal + le composant ContactForm
    const { displayModal, modalElement } = Modal(ContactForm(photographer));
    root.appendChild(modalElement);

    // Header de la page photographer
    const headerdiv = PhotographerHeader(photographer, displayModal);
    header.appendChild(headerdiv);

    // To do , element select + gallery
    const main = document.getElementById("main");
  }

  // Retourner les deux parties du template
  return { createHomePage, createPhotographerPage };
}

export default photographerTemplate;
