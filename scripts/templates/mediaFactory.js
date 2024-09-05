function MediaFactory(mediaType, mediaSrc, data, altText = '') {
    let mediaElement;
  
    // Choix du type de média à créer
    if (mediaType === 'image') {
      mediaElement = document.createElement('img');
      mediaElement.src = mediaSrc;
      mediaElement.alt = altText;
    } else if (mediaType === 'video') {
      mediaElement = document.createElement('video');
      mediaElement.src = mediaSrc;
      mediaElement.autoplay = true;
      mediaElement.muted = true;
      mediaElement.loop = true;
    } else {
      throw new Error('Unsupported media type');
    }
  
    // Ajout de la classe commune
    mediaElement.className = 'media';
  
    return mediaElement; // Retourne l'élément créé
  }
  
  export default MediaFactory;