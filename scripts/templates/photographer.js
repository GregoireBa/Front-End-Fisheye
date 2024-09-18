import UserCard from "../components/UserCard.js";
import { NavBar } from "../components/NavBar.js";
import { PhotographerHeader } from "../components/PhotographerHeader.js";

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
    const header = document.createElement("header")
    root.prepend(header)
    const navbar = NavBar();
    header.appendChild(navbar);

    const headerDiv = PhotographerHeader(photographer);
    header.appendChild(headerDiv);

    const main = document.getElementById("main");
  }

  // Retourner les deux parties du template
  return { createHomePage, createPhotographerPage };
}

export default photographerTemplate;
