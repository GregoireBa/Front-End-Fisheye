export let likesState = {};

export function attachLikeEventHandlers(container) {
    if (!container) {
        console.error("Container for attaching event handlers not found.");
        return;
    }

    // Retirer les anciens gestionnaires d'événements pour éviter des doublons
    container.removeEventListener('click', handleLikeClick);

    // Attacher un nouvel écouteur d'événements
    container.addEventListener('click', handleLikeClick);
}

function handleLikeClick(event) {
    const btnLike = event.target.closest('.btn_like');
    if (btnLike) {
        const mediaId = btnLike.getAttribute('data-id');
        if (!likesState[mediaId]) {
            likesState[mediaId] = { liked: false, count: parseInt(btnLike.parentElement.querySelector('.total-likes').textContent, 10) };
        }

        if (!likesState[mediaId].liked) {
            likesState[mediaId].count++;
            likesState[mediaId].liked = true;
            btnLike.classList.add('liked');
        } else {
            likesState[mediaId].count--;
            likesState[mediaId].liked = false;
            btnLike.classList.remove('liked');
        }

        btnLike.parentElement.querySelector('.total-likes').textContent = likesState[mediaId].count;
        updateTotalLikes();
    }
}

export function updateTotalLikes() {
    const totalLikesElements = document.querySelectorAll('.total-likes');
    const totalLikes = Array.from(totalLikesElements).reduce((acc, elem) => acc + parseInt(elem.textContent, 10), 0);
    
    const totalLikesDisplay = document.querySelector('.photographer_likes_count');
    if (totalLikesDisplay) {
        totalLikesDisplay.innerHTML = '<span class="sr-only">Nombre de like total sur la page : </span>' + totalLikes;
    }
}
