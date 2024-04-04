export class Photographer {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.portrait = data.portrait;
    }

    displayDetails() {
        document.getElementById('photographerPortrait').src = `/assets/photographers/${this.portrait}`;
        document.getElementById('photographerName').textContent = this.name;
        document.getElementById('photographerLocation').textContent = `${this.city}, ${this.country}`;
        document.getElementById('photographerTagline').textContent = this.tagline;
    }
}