import MediaFactory from "../factories/media.js";
import { updateAsideLikes } from "./AsidePhotographer.js";

export function PhotographerGallery(photographer, media, asideContainer) {
  const profilePageContent = document.createElement("div");
  profilePageContent.classList.add("content_medias");

  // Fonction pour gérer l'incrémentation/décrémentation des likes
  const handleLikeClick = (event) => {
    const mediaId = parseInt(event.currentTarget.getAttribute("data-id"));
    const mediaItem = media.find((m) => m.id === mediaId);

    if (mediaItem) {
      const likeElement = event.currentTarget.previousElementSibling;

      // Gestion du like/dislike
      if (!mediaItem.isLiked) {
        mediaItem.likes++;
        mediaItem.isLiked = true;
      } else {
        mediaItem.likes--;
        mediaItem.isLiked = false;
      }

      // Mettre à jour l'UI du nombre de likes pour ce média
      likeElement.textContent = mediaItem.likes;

      // Mettre à jour le nombre total de likes dans l'aside
      updateAsideLikes(media); // Appel direct sans besoin de asideContainer
    }
  };

  const content = `
    <section class="gallery">
      ${media
        .map((mediaItem) => {
          const mediaElement = mediaItem.image
            ? MediaFactory(
                "image",
                `./assets/images/photographers/${photographer.name}/${mediaItem.image}`,
                mediaItem.alt
              ).outerHTML
            : MediaFactory(
                "video",
                `./assets/images/photographers/${photographer.name}/${mediaItem.video}`,
                mediaItem.alt
              ).outerHTML;

          return `
            <div class="gallery_card">
              <a href="#" data-media="${mediaItem.id}" aria-label="${mediaItem.title}">
                ${mediaElement}
              </a>
              <div class="figcaption-gallery">
                <h2>${mediaItem.title}</h2>
                <div class="grp-like">
                  <span class="nbLike">${mediaItem.likes}</span>
                  <button class="btn_like" type="button" aria-label="Nombre de likes pour le média ${mediaItem.title}" data-id="${mediaItem.id}">
                    <span class="fas fa-heart" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </section>
  `;

  profilePageContent.innerHTML = content;

  // Ajouter des écouteurs d'événements pour les boutons de like sur chaque carte
  profilePageContent.querySelectorAll(".btn_like").forEach((button) => {
    button.addEventListener("click", handleLikeClick);
  });

  return profilePageContent;
}
