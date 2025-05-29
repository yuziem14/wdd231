(() => {
  const FINAL_URL_REGEX = /\/\w{0,}\.\w{0,}$/;
  const PATH = window.location.pathname.replace(FINAL_URL_REGEX, "");
  const MEMBERS_JSON_RELATIVE_PATH = getUrl("data/members.json");
  const MEMBERSHIP_LEVELS_BADGES = {
    L1: null,
    L2: getUrl("images/icons/silver-seal.svg"),
    L3: getUrl("images/icons/gold-seal.svg"),
  };
  const URL_ATTR_BY_VIEWTYPE = { list: "data-logourl", grid: "data-herourl" };
  const cardsDOM = document.querySelector(".cards");

  function getUrl(assetPathFromChamberRoot = "") {
    return [PATH, assetPathFromChamberRoot].join("/");
  }

  /** DOM Manipulation to create card element */
  function createImageElement({ cssClasses = [], attrs = {} }) {
    const imageDOM = document.createElement("img");
    Object.keys(attrs).forEach((key) => {
      imageDOM.setAttribute(key, attrs[key]);
    });
    const imgClassList = Array.isArray(cssClasses) ? cssClasses : [cssClasses];
    imgClassList.forEach((cssClass) => imageDOM.classList.add(cssClass));

    return imageDOM;
  }

  function createCardItemDOM() {
    const card = document.createElement("article");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardFooter = document.createElement("div");
    card.classList.add("card");
    cardHeader.classList.add("card-header");
    cardBody.classList.add("card-body");
    cardFooter.classList.add("card-footer");
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    return card;
  }

  function createCardHeaderContent(card, member = {}) {
    const businessName = member.name;
    const businessNameDOM = document.createElement("h1");
    businessNameDOM.textContent = businessName;

    const figureElement = document.createElement("figure");
    figureElement.classList.add("hero-image");
    const heroImage = createImageElement({
      attrs: {
        loading: "lazy",
        "data-herourl": getUrl(member.imageUrl),
        "data-logourl": getUrl(member.logoUrl),
        "data-business-name": businessName,
      },
    });
    figureElement.appendChild(heroImage);

    card.querySelector(".card-header").append(figureElement, businessNameDOM);
  }

  function createCardBodyContent(card, member) {
    const infoData = {
      Phone: member.phoneNumber,
      Address: member.address,
      Department: member.tagLine,
    };

    const description = document.createElement("p");
    description.textContent = member.description;
    const hr = document.createElement("hr");
    const contactInfo = document.createElement("div");
    contactInfo.classList.add("info");

    Object.keys(infoData).forEach((key) => {
      const infoElement = document.createElement("p");
      infoElement.innerHTML = `<span>${key}: </span> ${infoData[key]}`;
      contactInfo.appendChild(infoElement);
    });
    card.querySelector(".card-body").append(description, hr, contactInfo);
  }

  function createCardFooterContent(card, member) {
    const websiteLink = document.createElement("a");
    websiteLink.classList.add("button-link");
    websiteLink.setAttribute("target", "_blank");
    websiteLink.setAttribute("href", member.websiteUrl);

    const websiteLinkIcon = createImageElement({
      attrs: {
        src: getUrl("images/icons/network-globe.svg"),
        alt: "Open URL icon",
        loading: "lazy",
      },
    });
    const websiteLinkText = document.createElement("span");
    websiteLinkText.textContent = "Visit Website";

    websiteLink.append(websiteLinkIcon, websiteLinkText);

    card.querySelector(".card-footer").append(websiteLink);
  }

  function createMemberDOM(member = {}) {
    const card = createCardItemDOM();
    createCardHeaderContent(card, member);
    createCardBodyContent(card, member);
    createCardFooterContent(card, member);

    const membershipBadgeImageUrl =
      MEMBERSHIP_LEVELS_BADGES[`L${member.membershipLevel}`];
    if (membershipBadgeImageUrl) {
      const membershipBadge = document.createElement("img");
      membershipBadge.classList.add("membership-badge");
      membershipBadge.setAttribute("src", membershipBadgeImageUrl);
      membershipBadge.setAttribute(
        "alt",
        `Membership Level ${member.membershipLevel}`
      );
      membershipBadge.setAttribute("loading", "lazy");
      card.appendChild(membershipBadge);
    }

    return card;
  }

  function displayMembers(members = []) {
    members.forEach((member) => {
      const card = createMemberDOM(member);
      cardsDOM.appendChild(card);
    });

    updateImagesByViewType(cardsDOM.getAttribute("data-viewtype"));
  }
  /** END DOM Manipulation to create card element */

  function updateImagesByViewType(viewType = "grid") {
    const images = document.querySelectorAll(".hero-image img");

    images.forEach((img) => {
      const businessName = img.getAttribute("data-business-name");
      const imgType = viewType == "list" ? "Logo" : "Hero";

      const attrs = {
        src: img.getAttribute(URL_ATTR_BY_VIEWTYPE[viewType]),
        alt: `${imgType} Image for ${businessName}`,
      };

      Object.keys(attrs).forEach((key) => img.setAttribute(key, attrs[key]));
    });
  }

  function registerEventListeners() {
    const viewSelectorButtons = document.querySelectorAll(
      ".view-selector button"
    );
    viewSelectorButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const pressedButton = event.target;
        const viewType = pressedButton.getAttribute("data-type");
        pressedButton.classList.add("active");

        document
          .querySelector(`.view-selector button:not([data-type=${viewType}])`)
          .classList.remove("active");

        cardsDOM.setAttribute("data-viewtype", viewType);
        updateImagesByViewType(viewType);
      });
    });
  }

  async function getMembers() {
    const response = await fetch(MEMBERS_JSON_RELATIVE_PATH);
    const members = await response.json();

    return members;
  }

  registerEventListeners();
  getMembers().then(displayMembers);
})();
