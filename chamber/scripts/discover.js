const FINAL_URL_REGEX = /\/\w{0,}\.\w{0,}$/;
const PATH = window.location.pathname.replace(FINAL_URL_REGEX, "");
const LOCATION_JSON_RELATIVE_PATH = [PATH, "data/locations.json"].join("/");

async function fetchLocations() {
  const response = await fetch(LOCATION_JSON_RELATIVE_PATH);
  return await response.json();
}

function populateGallery(locations = []) {
  const imageGallery = document.querySelector(".image-gallery");
  const locationsHtml = locations.map(
    (location) => `
        <article>
            <figure>
                <img data-src="${location.imageUrl}" alt="${location.title} Photo" />
                <figcaption class="hidden">${location.description}</figcaption>
            </figure>
            <h2>${location.title}</h2>
            <p>${location.description}</p>
            <address>${location.address}</address>
            <button class="learn-more-btn">Learn More</button>
        </article>
    `
  );
  imageGallery.innerHTML = locationsHtml.join("\n");
  loadImages(document.querySelectorAll("img[data-src]"));
}

function loadImages(imageElements) {
  const IMG_OPTIONS = {
    threshold: 0.5, // Load when 50% of the image is visible
    rootMargin: "0px 0px 50px 0px", // Load images 50px before they reach the viewport
  };

  const loadImg = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded"); // Add class to trigger fade-in CSS
        observer.unobserve(img); // Stop observing once loaded
      }
    });
  };

  const imgObserver = new IntersectionObserver(loadImg, IMG_OPTIONS);

  imageElements.forEach((img) => {
    imgObserver.observe(img);
  });
}

function updateLastVisitMessage(lastVisitElement, storageKey) {
  const MESSAGES = [
    "Welcome! Let us know if you have any questions.",
    "Welcome back! You visited today.",
    "Back so soon! Awesome!",
    "You last visited {0} days ago. Welcome back!",
  ];
  const lastVisitString = localStorage.getItem(storageKey);
  const currentDate = Date.now();

  if (!lastVisitString) {
    lastVisitElement.textContent = MESSAGES[0];
    return;
  }

  const lastVisitDate = Number(lastVisitString);
  const differenceInMs = currentDate - lastVisitDate;
  const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

  if (differenceInDays <= 1) {
    lastVisitElement.textContent = MESSAGES[differenceInDays + 1];
    return;
  }

  lastVisitElement.textContent = MESSAGES[3].replace("{0}", differenceInDays);
}

document.addEventListener("DOMContentLoaded", () => {
  const lastVisitMessage = document.getElementById("last-visit-message");
  const LAST_VISIT_KEY = "chamberLastVisitDate";
  fetchLocations().then((locations) => {
    populateGallery(locations);
  });

  updateLastVisitMessage(lastVisitMessage, LAST_VISIT_KEY);
  localStorage.setItem(LAST_VISIT_KEY, Date.now());
});
