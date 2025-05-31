const menuButton = document.querySelector('header button.menu-button');

function toggleNavbar() {
    const navbar = document.querySelector('header nav.menu-bar');

    const isActive = navbar.classList.contains('active');
    
    navbar.classList.remove('active')

    if(!isActive) {
        navbar.classList.add('active');
    }
}

menuButton.addEventListener('click', toggleNavbar);