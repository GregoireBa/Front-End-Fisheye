export function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const pictureUrl = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer__card');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const link = document.createElement('a');
        link.setAttribute('href', `/photographer.html?id=${id}`);

        const img = document.createElement('img');
        img.classList.add('photographer__avatar');
        img.setAttribute('src', pictureUrl);
        img.setAttribute('alt', name);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pLocation = document.createElement('p');
        pLocation.classList.add('p-location');
        pLocation.textContent = `${city}, ${country}`;

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;

        const pPrice = document.createElement('p');
        pPrice.classList.add('p-price');
        pPrice.textContent = `${price}€/jour`;

        // Assembler les éléments
        link.appendChild(img);
        link.appendChild(h2);
        cardDiv.appendChild(link);
        cardDiv.appendChild(pLocation);
        cardDiv.appendChild(pTagline);
        cardDiv.appendChild(pPrice);
        article.appendChild(cardDiv);

        return article;
    }

    return { getUserCardDOM };
}
