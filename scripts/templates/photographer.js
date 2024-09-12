import UserCard from "../components/UserCard.js";
import { NavBar } from "../components/NavBar.js";
import { PhotograherHeader } from "../components/PhotographerHeader.js";

function photographerTemplate() {
  function createHomePage(photographers) {
    const root = document.getElementById("root");
    const main = document.getElementById("main");
    const navbar = NavBar();
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
    const main = document.getElementById("main");
    const header = PhotograherHeader(photographer);
    root.prepend(header);
    console.log("photograher", photographer);
  }

  // Retourner les deux parties du template
  return { createHomePage, createPhotographerPage };
}

export default photographerTemplate;
