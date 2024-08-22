import MediasFactory from "../templates/mediaFactory.js";
import { getPhotographers, getMediaByPhotographer } from "../utils/api.js";
import { attachLikeEventHandlers, updateTotalLikes } from "../models/like.js";
import { sortByPopularity, sortByDate, sortByTitle } from "../models/filter.js";
import { updatePhotographerInfo } from "../templates/headerPhotographer.js"; 
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
            ? `<a href="#" class="media-link" data-media="${media.id}" role="button">
                 <img class="thumbnail" src="./assets/images/photographers/${photographer.name}/${media.image}" alt="${media.title}">
               </a>`
            : `<div class="video-container" tabindex="0" role="button" data-media="${media.id}" aria-label="Play video">
                 <video class="thumbnail">
                   <source src="./assets/images/photographers/${photographer.name}/${media.video}" type="video/mp4">
                 </video>
               </div>`;
          const likes = likesState[media.id] ? likesState[media.id].count : media.likes;
          const likedClass = likesState[media.id] && likesState[media.id].liked ? 'liked' : '';
  
          return `
            <article class="card_gallery">
              <figure>
                ${mediaContent}
                <figcaption><span class="span-card-gallery">${media.title}</span></figcaption>
                <div class="grp-like" role="group" aria-label="Nombre de likes total">
                  <span class="total-likes">${likes}</span>
                  <button class="btn_like ${likedClass}" type="button" aria-label="Like" data-id="${media.id}">
                    <span class="fas fa-heart" aria-hidden="true"></span>
                  </button>
                </div>
              </figure>
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
    attachLikeEventHandlers(profilePageContent);
    updateTotalLikes();
    attachMediaClickHandlers(profilePageContent);
  }
  
  function attachMediaClickHandlers(profilePageContent) {
    const mediaLinks = profilePageContent.querySelectorAll('.media-link, .video-container');
  
    mediaLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const mediaId = link.getAttribute('data-media');
        openLightbox(mediaId); // Fonction pour ouvrir la lightbox
      });
  
      link.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const mediaId = link.getAttribute('data-media');
          openLightbox(mediaId);
        }
      });
    });
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






