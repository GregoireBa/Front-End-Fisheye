function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const link = document.createElement('a');
        link.href = "photographer.html?id=" + id;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt', '');
        
        const spanLink = document.createElement('span')
        spanLink.textContent = "Page de "
        spanLink.classList.add('sr-only');

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.classList.add('p-city-country')

        const description = document.createElement('p');
        description.textContent = tagline;
        description.classList.add('p-tagline');

        const priceDay = document.createElement('p');
        priceDay.textContent = price + "€/jour";
        priceDay.classList.add('p-price')

        link.appendChild(img);
        link.appendChild(spanLink);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(priceDay);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}