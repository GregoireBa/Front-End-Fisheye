export function PhotographerSort(media) {
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
        data-filter-type="popularity"
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
      if (isDropdownOpen) {
        toggleDropdown();
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

    currentOption.scrollIntoView({
      block: "nearest",
    });

    elements.options.forEach((option) => {
      if (option !== currentOption) {
        option.classList.remove("current");
      }
    });
    announceOption(`Vous êtes actuellement focus sur ${optionLabel}`);
  };

  const selectCurrentOption = () => {
    const selectedOption = elements.options[currentOptionIndex];
    selectOptionByElement(selectedOption);
  };

  const selectOptionByElement = (optionElement) => {
    const optionValue = optionElement.textContent.trim().toLowerCase();

    elements.button.textContent = optionValue;
    elements.options.forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-selected", "false");
    });

    optionElement.classList.add("active");
    optionElement.setAttribute("aria-selected", "true");

    toggleDropdown();
    announceOption(optionValue);

    const sortedMedia = sortBy(media, optionValue);

    const sortChangeEvent = new CustomEvent("sortChange", {
      detail: { sortedMedia },
    });
    document.dispatchEvent(sortChangeEvent);
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
    }, 1000);
  };

  elements.button.addEventListener("keydown", handleKeyPress);
  document.addEventListener("click", handleDocumentInteraction);

  return { element: select, sortBy };
}

function sortBy(media, type) {
  switch (type.toLowerCase()) {
    case "popularité":
      return media.sort((a, b) => b.likes - a.likes);
    case "date":
      return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "titre":
      return media.sort((a, b) => a.title.localeCompare(b.title));
    default:
      throw Error("Veuillez fournir un type de tri valide");
  }
}
