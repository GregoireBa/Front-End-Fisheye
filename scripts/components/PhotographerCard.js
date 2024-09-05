import MediaFactory from '../templates/mediaFactory.js';
import Media from '../models/media.js';

export default class PhotographerCard {
    constructor(media, likesState) {
        this.media = new Media(mediaData);
        this.likesState = likesState;
    }

    createCard() {
        // Crée l'élément media via la MediaFactory
        const mediaElement = MediaFactory(this.media);

        // Création de la structure de la carte
        const article = document.createElement('article');
        article.className = 'card_gallery';

        const figure = document.createElement('figure');

        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = `<span class="span-card-gallery">${this.media.title}</span>`;

        const likes = this.likesState[this.media.id] ? this.likesState[this.media.id].count : this.media.likes;
        const likedClass = this.likesState[this.media.id] && this.likesState[this.media.id].liked ? 'liked' : '';

        const likeButton = document.createElement('button');
        likeButton.className = `btn_like ${likedClass}`;
        likeButton.type = 'button';
        likeButton.setAttribute('data-id', this.media.id);

        likeButton.innerHTML = `
            <span class="sr-only" aria-live="polite">Nombre de like total sur le média :</span>
            <span class="total-likes">${likes}</span>
            <span class="fas fa-heart" aria-hidden="true"></span>
        `;

        const likeGroup = document.createElement('div');
        likeGroup.className = 'grp-like';
        likeGroup.appendChild(likeButton);

        // Assembler la carte
        figure.appendChild(mediaElement);
        figure.appendChild(figcaption);
        figure.appendChild(likeGroup);

        article.appendChild(figure);

        return article; // Retourne l'élément article prêt à être inséré dans le DOM
    }
}