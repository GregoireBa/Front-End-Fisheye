// Fonction pour créer la galerie du photographe (PhotographerGallery)
export function PhotographerGallery() {
    const gallery = document.createElement('section');
    gallery.className = 'gallery-photographer';

    medias.forEach(mediaData => {
        const media = new PhotographerCard(mediaData, name, likesState);
        const cardElement = media.createCard();
        gallery.appendChild(cardElement);
    });

    return gallery;
}