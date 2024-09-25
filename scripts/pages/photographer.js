import photographerTemplate from "../templates/photographer.js";
import { getPhotographerById } from "../utils/api.js";

async function init() {
  let photographerId = parseInt(
    new URL(document.location).searchParams.get("id")
  );

  if (!photographerId) {
    throw new Error("Photographer ID is missing in the URL");
  }
  const photographer = await getPhotographerById(photographerId);
  const templatePhotographer = photographerTemplate();
  templatePhotographer.createPhotographerPage(photographer);
}

init();
