export function NavBar(){
    const header = document.createElement("header");
    header.innerHTML = `<a href="/" title="Fisheye (retour à l’accueil)">
      <img src="assets/images/logo.png" class="logo" alt="fisheye logo" />
    </a>
    
    <h1>Nos photographes</h1>`

    return header
}