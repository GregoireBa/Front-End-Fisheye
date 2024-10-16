export function NavBar(showTitle = false) {
  const navbar = document.createElement("nav");

  navbar.innerHTML = `
    <div class="navBar">
    <a href="/" title="Logo Fisheye (retour à l’accueil)">
      <img src="assets/images/logo.png" class="logo" alt="Logo Fisheye" />
    </a>
    
    ${showTitle ? "<h1>Nos photographes</h1>" : ""}
    </div>`;

  return navbar;
}
