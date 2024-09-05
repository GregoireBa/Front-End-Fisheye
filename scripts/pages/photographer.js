import { getPhotographers, getMediaByPhotographerId } from "../utils/api.js";
import { attachLikeEventHandlers, updateTotalLikes } from "../models/like.js";
import { sortByPopularity, sortByDate, sortByTitle } from "../models/filter.js";
import { updatePhotographerInfo } from "../templates/headerPhotographer.js";
import photographerTemplate from '../templates/photographer.js';
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

export async function updateMediaDisplay(photographer, sortCriteria = 'popularity') {
    try {
        let medias = await getMediaByPhotographerId(photographer.id);
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
            default:
                console.warn(`Filtre inconnu: ${sortCriteria}`);
                break;
        }

        // Utilise le template pour créer la galerie
        const { CreatePhotographerGallery } = photographerTemplate({
            ...photographer,
            medias,
            likesState
        });

        const profilePageContent = document.querySelector(".content_medias");
        profilePageContent.innerHTML = ''; // Nettoie le contenu existant
        const galleryElement = CreatePhotographerGallery(); // Créer la galerie
        profilePageContent.appendChild(galleryElement); // Ajoute la galerie générée
        attachLikeEventHandlers(profilePageContent, likesState);
        updateTotalLikes(likesState);
    } catch (error) {
        console.error("Error fetching media details: ", error);
    }
}

async function displayPhotographerMedias(photographer, sortCriteria = 'popularity') {
    await updateMediaDisplay(photographer, sortCriteria);
}

async function init() {
    const photographer = await displayPhotographer();
    if (!photographer) {
        console.error("Failed to load photographer data.");
        return;
    }

    initializeCustomSelect(photographer);

    const savedSort = localStorage.getItem('selectedSort') || 'popularity';
    await updateMediaDisplay(photographer, savedSort);

    document.querySelector('.js-select').addEventListener('change', function() {
        const selectedOption = document.querySelector('.js-select [aria-selected="true"]').innerText;
        localStorage.setItem('selectedSort', selectedOption);
    });
}

init();
