const hamburgerMenuButton = document.querySelector(".hamburger-menu");
hamburgerMenuButton.addEventListener("click", () => {
  const navbar = document.querySelector("header nav");
  navbar.classList.toggle("active");
});
