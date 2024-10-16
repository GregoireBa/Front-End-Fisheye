export function AsidePhotographer(photographer, media) {
  const asideDiv = document.createElement("div");
  asideDiv.classList.add("aside-likes-price");

  // Calculer le nombre total de likes
  const totalLikes = media.reduce((acc, m) => acc + (m.likes || 0), 0);

  asideDiv.innerHTML = `
      <aside class="aside-photographer">
        <div class="total-likes" aria-label="Nombre total de likes des medias sur la page ">
          <span class="total-likes-count">${totalLikes}</span> 
          <span class="fas fa-heart" aria-hidden="true"></span>
        </div>
        <div class="price">${photographer.price}€ / jour</div>
      </aside>
    `;

  return asideDiv;
}

// Fonction pour mettre à jour l'aside
export function updateAsideLikes(media) {
  const totalLikes = media.reduce((acc, m) => acc + (m.likes || 0), 0);
  const totalLikesElement = document.querySelector(".total-likes-count");

  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
  }
}
