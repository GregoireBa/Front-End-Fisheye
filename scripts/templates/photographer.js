import UserCard from '../components/UserCard.js';
import PhotographerCard from '../components/PhotographerCard.js';
import { NavBar } from '../components/NavBar.js';

function photographerTemplate() {
    
    // Fonction pour créer la galerie du photographe (PhotographerGallery)
    function CreatePhotographerGallery() {
        const gallery = document.createElement('section');
        gallery.className = 'gallery-photographer';
    
        medias.forEach(mediaData => {
            const media = new PhotographerCard(mediaData, name, likesState);
            const cardElement = media.createCard();
            gallery.appendChild(cardElement);
        });
    
        return gallery;
    }

    function createHomePage (photographers){
        
        const root = document.getElementById("root")
        const main = document.getElementById("main");
        const navbar = NavBar();
        root.prepend(navbar)
        const photographer_section = document.createElement("div");
        photographer_section.classList.add("photographer_section");
        photographers.forEach(photographer => {
            photographer_section.appendChild(UserCard(photographer))
        })
            main.appendChild(photographer_section);
        }

    // Retourner les deux parties du template
    return { CreatePhotographerGallery, createHomePage };
}

export default photographerTemplate;
