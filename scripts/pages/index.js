fetch("/data/photographers.json")
  .then(response => response.json())
  .then(data => {
    const photographers = data.photographers;
    const container = document.querySelector(".photographer_section");
    let htmlContent = ""; // Initialise une chaîne de caractères vide pour assembler le HTML

    photographers.forEach(photographer => {
      // Ajoute chaque carte de photographe à la chaîne htmlContent sans modifier le DOM directement
      htmlContent += `
        <article class="photographer__card">
            <div class="card">
                <a href="/photographer.html?id=${photographer.id}">
                    <img class="photographer__avatar" src="/assets/photographers/${photographer.portrait}" alt="${photographer.name}">
                    <h2>${photographer.name}</h2>
                </a>
                <p class="p-location">${photographer.city}, ${photographer.country}</p>
                <p>${photographer.tagline}</p>
                <p class="p-price">${photographer.price}€/jour</p>
            </div>
        </article>
      `;
    });

    // Après avoir terminé la boucle, insère tout le HTML en une seule fois
    container.innerHTML = htmlContent;
  })
  .catch(error => {
    console.error("Erreur lors du chargement des données des photographes:", error);
    // Considère d'afficher un message d'erreur à l'utilisateur ici
  });
