import { getPhotographers, getMediaByPhotographer } from "../utils/api.js";
import MediasFactory from "../templates/mediaFactory.js";
import { attachLikeEventHandlers, updateTotalLikes } from "../models/like.js";

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function displayPhotographer() {
  let id = parseInt(params.get("id"));
  if (!id) {
    console.error("Photographer ID is missing in the URL");
    return;
  }

  try {
    const photographers = await getPhotographers();
    const photographer = photographers.find((p) => p.id === id);

    if (!photographer) {
      console.error("No photographer found with ID", id);
      return;
    }

    updatePhotographerInfo(photographer);
    displayPhotographerMedias(photographer);
  } catch (error) {
    console.error("Error fetching photographer details: ", error);
  }
}

function updatePhotographerInfo(photographer) {
  const headerDiv = document.querySelector(".photograph-header");
  if (!headerDiv) {
    console.error("Div 'photograph-header' not found");
    return;
  }

  headerDiv.innerHTML = `
        <div>
          <h2 class="h2-photographerID">${photographer.name}</h2>
          <p class="p-city-country-photographerID">${photographer.city}, ${photographer.country}</p>
          <p class="p-tagline-photographerID">${photographer.tagline}</p>
        </div>

        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>

        <div id="contact_modal">
          <div class="modal">
            <header>
              <h2>Contactez-moi</h2>
              <img src="assets/icons/close.svg" onclick="closeModal()" />
            </header>
            <form>
              <div>
                <label>Prénom</label>
                <input />
              </div>
              <button class="contact_button">Envoyer</button>
            </form>
          </div>
		    </div>

        <img src="assets/images/photographers/${photographer.portrait}" alt="Portrait of ${photographer.name}">
    `;
}

async function displayPhotographerMedias(photographer) {
  try {
    const medias = await getMediaByPhotographer(photographer.id);
    createPhotographerMedias(photographer, medias);
  } catch (error) {
    console.error("Error fetching media details: ", error);
  }
}

function createPhotographerMedias(photographer, medias) {
  const profilePageContent = document.querySelector(".content_medias");
  const content = `
      <section class="gallery-photographer">
          ${medias
            .map((media) => {
              const mediaContent = media.image
                ? ` <img class="thumbnail" src="./assets/images/photographers/${photographer.name}/${media.image}" alt="${media.alt}">`
                : ` <video class="thumbnail" aria-label="${media.alt}">
                  <source src="./assets/images/photographers/${photographer.name}/${media.video}" type="video/mp4">
              </video>`;
              return `
              <article class="card_galerry">                           
                  <a href="#" data-media="${media.id}" role="link" aria-label="View media large">
                      <figure>${mediaContent}</figure>
                  </a>
                  <figcaption>
                      <span class="span-card-gallery" class>${media.title}</span>
                      <div class="grp-like" role="group" aria-label="Nombre de likes total">
                          <span class="total-likes">${media.likes}</span> 
                          <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                              <span class="fas fa-heart" aria-hidden="true"></span>
                          </button> 
                      </div>
                  </figcaption>
              </article>
          `;
            })
            .join("")}
      </section>
      <aside class="aside-photographer">
          <p class="photographer_Likes">
              <span class="photographer_likes_count"></span>
              <span class="fas fa-heart" aria-hidden="true"></span>
          </p>
          <span>${photographer.price}€ / jour</span>
      </aside>
  `;

  if (profilePageContent) {
    profilePageContent.innerHTML = content;
    attachLikeEventHandlers(profilePageContent); // Attache les gestionnaires d'événements pour les likes
    updateTotalLikes(); // Met à jour le total des likes immédiatement après le rendu
  }
}

document.addEventListener("DOMContentLoaded", displayPhotographer);
