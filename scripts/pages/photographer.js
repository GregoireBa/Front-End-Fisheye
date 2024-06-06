import MediasFactory from "../templates/mediaFactory.js";
import { getPhotographers, getMediaByPhotographer } from "../utils/api.js";
import { attachLikeEventHandlers, updateTotalLikes } from "../models/like.js";
import { sortByPopularity, sortByDate, sortByTitle } from "../models/filter.js";
import { likesState } from "../models/like.js";

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function displayPhotographer() {
  let id = parseInt(new URL(document.location).searchParams.get("id"));
  if (!id) {
      console.error("Photographer ID is missing in the URL");
      return null;
  }

  try {
      const photographers = await getPhotographers();
      const photographer = photographers.find(p => p.id === id);

      if (!photographer) {
          console.error("No photographer found with ID", id);
          return null;
      }

      updatePhotographerInfo(photographer);
      await displayPhotographerMedias(photographer);
      return photographer;
  } catch (error) {
      console.error("Error fetching photographer details: ", error);
      return null;
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

async function updateMediaDisplay(photographer, sortCriteria = 'popularity') {
  try {
      let medias = await getMediaByPhotographer(photographer.id);
      switch (sortCriteria) {
          case 'popularity':
              medias = sortByPopularity(medias);
              break;
          case 'date':
              medias = sortByDate(medias);
              break;
          case 'title':
              medias = sortByTitle(medias);
              break;
      }
      createPhotographerMedias(photographer, medias, likesState);
      attachLikeEventHandlers(document.querySelector(".content_medias"), likesState);
      updateTotalLikes(likesState);
  } catch (error) {
      console.error("Error fetching media details: ", error);
  }
}


async function displayPhotographerMedias(photographer, sortCriteria = 'popularity') {
  await updateMediaDisplay(photographer, sortCriteria);
}

function createPhotographerMedias(photographer, medias, likesState) {
  const profilePageContent = document.querySelector(".content_medias");

  if (!profilePageContent) {
      console.error("Element '.content_medias' not found in the DOM.");
      return;
  }

  const content = `
      <section class="gallery-photographer">
          ${medias.map(media => {
              const mediaContent = media.image
                  ? `<img class="thumbnail" src="./assets/images/photographers/${photographer.name}/${media.image}" alt="${media.alt}">`
                  : `<video class="thumbnail" aria-label="${media.alt}">
                      <source src="./assets/images/photographers/${photographer.name}/${media.video}" type="video/mp4">
                    </video>`;

              const likes = likesState[media.id] ? likesState[media.id].count : media.likes;
              const likedClass = likesState[media.id] && likesState[media.id].liked ? 'liked' : '';

              return `
                  <article class="card_galerry">
                      <a href="#" data-media="${media.id}" role="link" aria-label="View media large">
                          <figure>${mediaContent}</figure>
                      </a>
                      <figcaption>
                          <span class="span-card-gallery">${media.title}</span>
                          <div class="grp-like" role="group" aria-label="Nombre de likes total">
                              <span class="total-likes">${likes}</span>
                              <button class="btn_like ${likedClass}" type="button" aria-label="Like" data-id="${media.id}">
                                  <span class="fas fa-heart" aria-hidden="true"></span>
                              </button>
                          </div>
                      </figcaption>
                  </article>
              `;
          }).join('')}
      </section>
      <aside class="aside-photographer">
          <p class="photographer_Likes">
              <span class="photographer_likes_count"></span>
              <span class="fas fa-heart" aria-hidden="true"></span>
          </p>
          <span>${photographer.price}€ / jour</span>
      </aside>
  `;

  profilePageContent.innerHTML = content;
  attachLikeEventHandlers(profilePageContent); // Assurez-vous que cette fonction est appelée après que le contenu a été ajouté
  updateTotalLikes(); // Met à jour le total des likes immédiatement après le rendu
}

document.addEventListener("DOMContentLoaded", async () => {
  const photographer = await displayPhotographer();
  if (!photographer) {
      console.error("Failed to load photographer data.");
      return;
  }

  const sortSelector = document.getElementById('sort-selector');
  if (sortSelector) {
      const savedSort = localStorage.getItem('selectedSort') || 'popularity';
      sortSelector.value = savedSort;
      
      await updateMediaDisplay(photographer, savedSort, likesState); // Assurez-vous de passer likesState ici

      sortSelector.addEventListener('change', async () => {
          const selectedSort = sortSelector.value;
          await updateMediaDisplay(photographer, selectedSort, likesState); // et ici
      });
  } else {
      console.error("Sort selector not found in the DOM.");
  }
});






