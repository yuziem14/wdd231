const FINAL_URL_REGEX = /\/\w{0,}\.\w{0,}$/;
const PATH = window.location.pathname.replace(FINAL_URL_REGEX, "");
const MEMBERS_JSON_RELATIVE_PATH = [PATH, "data", "members.json"].join("/");

async function getMembers() {
  const response = await fetch(MEMBERS_JSON_RELATIVE_PATH);
  const members = await response.json();

  return members;
}

function getRandomMembers(members = [], numberOfMembers = 3, minLevel = 1) {
  const filteredAndShuffled = members
    .filter((m) => m.membershipLevel >= minLevel)
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfMembers);

  return filteredAndShuffled;
}

function displaySpotlightMembers(members = [], selector = "") {
  const parent = document.querySelector(selector);
  parent.innerHTML = "";
  members.forEach((member) => {
    const article = document.createElement("article");
    article.classList.add("member-card");
    article.setAttribute("data-member-level", member.membershipLevel);

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    const logoImage = document.createElement("img");
    logoImage.setAttribute("src", [PATH, member.logoUrl].join("/"));
    logoImage.setAttribute("alt", `Logo Image For ${member.name}`);
    logoImage.setAttribute("loading", `lazy`);
    const title = document.createElement("p");
    title.textContent = member.name;
    cardHeader.appendChild(logoImage);
    cardHeader.appendChild(title);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const description = document.createElement("p");
    description.textContent = member.description;
    cardBody.appendChild(description);

    article.appendChild(cardHeader);
    article.appendChild(cardBody);

    parent.appendChild(article);
  });
}

export { getMembers, getRandomMembers, displaySpotlightMembers };
