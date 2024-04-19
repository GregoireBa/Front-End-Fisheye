async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
}


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = photographerTemplate(photographer).getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}


async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();