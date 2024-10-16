export function PhotographerSort() {
  const select = document.createElement("div");
  select.classList.add("custom-select");

  select.innerHTML = `
  <label for="select">Trier par</label>
    <div class="container-select">
        <button
        role="combobox"
        id="select"
        value="Popularité"
        aria-controls="listbox"
        aria-haspopup="listbox"
        tabindex="0"
        aria-expanded="false">
        Popularité
        </button>
    <div id="announcement" aria-live="assertive" role="alert"></div>
        <ul role="listbox" id="listbox">
        <li role="option" aria-selected="true"><p>Popularité</p></li>
        <li role="option"><p>Date</p></li>
        <li role="option"><p>Titre</p></li>
        </ul>
    </div>
    `;

  const elements = {
    button: select.querySelector('[role="combobox"]'),
    dropdown: select.querySelector('[role="listbox"]'),
    options: select.querySelectorAll('[role="option"]'),
    announcement: select.querySelector("#announcement"),
  };

  let isDropdownOpen = false;
  let currentOptionIndex = 0;
  let lastTypedChar = "";
  let lastMatchingIndex = 0;

  const toggleDropdown = () => {
    elements.dropdown.classList.toggle("active");
    isDropdownOpen = !isDropdownOpen;
    elements.button.setAttribute("aria-expanded", isDropdownOpen.toString());

    if (isDropdownOpen) {
      focusCurrentOption();
    } else {
      elements.button.focus();
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "];

    if (key === "Tab") {
      // Ne pas empêcher le comportement par défaut de la touche Tab pour permettre de sortir du composant
      if (isDropdownOpen) {
        toggleDropdown(); // Fermer le dropdown lorsqu'on appuie sur Tab
      }
      return;
    }

    if (!isDropdownOpen && openKeys.includes(key)) {
      event.preventDefault();
      toggleDropdown();
    } else if (isDropdownOpen) {
      event.preventDefault();
      switch (key) {
        case "Escape":
          toggleDropdown();
          break;
        case "ArrowDown":
          moveFocusDown();
          break;
        case "ArrowUp":
          moveFocusUp();
          break;
        case "Enter":
        case " ":
          selectCurrentOption();
          break;
        default:
          handleAlphanumericKeyPress(key);
          break;
      }
    }
  };

  const handleDocumentInteraction = (event) => {
    const isClickInsideButton = elements.button.contains(event.target);
    const isClickInsideDropdown = elements.dropdown.contains(event.target);

    if (isClickInsideButton || (!isClickInsideDropdown && isDropdownOpen)) {
      toggleDropdown();
    }

    // Check if the click is on an option
    const clickedOption = event.target.closest('[role="option"]');
    if (clickedOption) {
      selectOptionByElement(clickedOption);
    }
  };

  const moveFocusDown = () => {
    if (currentOptionIndex < elements.options.length - 1) {
      currentOptionIndex++;
    } else {
      currentOptionIndex = 0;
    }
    focusCurrentOption();
  };

  const moveFocusUp = () => {
    if (currentOptionIndex > 0) {
      currentOptionIndex--;
    } else {
      currentOptionIndex = elements.options.length - 1;
    }
    focusCurrentOption();
  };

  const focusCurrentOption = () => {
    const currentOption = elements.options[currentOptionIndex];
    const optionLabel = currentOption.textContent;

    currentOption.classList.add("current");
    currentOption.focus();

    // Scroll the current option into view
    currentOption.scrollIntoView({
      block: "nearest",
    });

    elements.options.forEach((option, index) => {
      if (option !== currentOption) {
        option.classList.remove("current");
      }
    });
    announceOption(`Vous êtes actuellement focus sur ${optionLabel}`); // Announce the selected option within a delayed period
  };

  const selectCurrentOption = () => {
    const selectedOption = elements.options[currentOptionIndex];
    selectOptionByElement(selectedOption);
  };

  const selectOptionByElement = (optionElement) => {
    const optionValue = optionElement.textContent;

    elements.button.textContent = optionValue;
    elements.options.forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-selected", "false");
    });

    optionElement.classList.add("active");
    optionElement.setAttribute("aria-selected", "true");

    toggleDropdown();
    announceOption(optionValue); // Announce the selected option
  };

  const handleAlphanumericKeyPress = (key) => {
    const typedChar = key.toLowerCase();

    if (lastTypedChar !== typedChar) {
      lastMatchingIndex = 0;
    }

    const matchingOptions = Array.from(elements.options).filter((option) =>
      option.textContent.toLowerCase().startsWith(typedChar)
    );

    if (matchingOptions.length) {
      if (lastMatchingIndex === matchingOptions.length) {
        lastMatchingIndex = 0;
      }
      let value = matchingOptions[lastMatchingIndex];
      const index = Array.from(elements.options).indexOf(value);
      currentOptionIndex = index;
      focusCurrentOption();
      lastMatchingIndex += 1;
    }
    lastTypedChar = typedChar;
  };

  const announceOption = (text) => {
    elements.announcement.textContent = text;
    elements.announcement.setAttribute("aria-live", "assertive");
    setTimeout(() => {
      elements.announcement.textContent = "";
      elements.announcement.setAttribute("aria-live", "off");
    }, 1000); // Announce and clear after 1 second (adjust as needed)
  };

  elements.button.addEventListener("keydown", handleKeyPress);
  document.addEventListener("click", handleDocumentInteraction);

  return select;
}
