export function attachLikeEventHandlers(container) {
    container.addEventListener('click', function(event) {
        const btnLike = event.target.closest('.btn_like');
        if (btnLike) {
            const totalLikes = btnLike.closest('.grp-like').querySelector('.total-likes');
            let likes = parseInt(totalLikes.textContent, 10);

            // Toggle le statut du like
            if (!btnLike.isLiked) {
                likes++;
                btnLike.isLiked = true; // Marque le bouton comme 'liké'
                btnLike.classList.add('liked');
            } else {
                likes--;
                btnLike.isLiked = false; // Retire le statut 'liké'
                btnLike.classList.remove('liked');
            }

            totalLikes.textContent = likes; // Met à jour le nombre de likes pour cette photo
            updateTotalLikes(); // Met à jour le total global des likes affiché
        }
    });
}

// Fonction pour mettre à jour le total global des likes
export function updateTotalLikes() {
    const totalLikesElements = document.querySelectorAll('.total-likes');
    const totalLikes = Array.from(totalLikesElements).reduce((acc, elem) => acc + parseInt(elem.textContent, 10), 0);
    
    const totalLikesDisplay = document.querySelector('.photographer_likes_count');
    if (totalLikesDisplay) {
        totalLikesDisplay.textContent = totalLikes; // Affiche le total des likes
    }
}
