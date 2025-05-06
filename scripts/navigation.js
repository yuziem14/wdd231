const menuButton = document.querySelector('header button.menu-button');

function toggleNavbar() {
    const navbar = document.querySelector('header nav.menu-bar');

    const isActive = navbar.classList.contains('active');
    
    navbar.classList.remove('active')
    document.querySelector('main').classList.remove('hidden')
    document.querySelector('footer').classList.remove('hidden')

    if(!isActive) {
        navbar.classList.add('active');
        document.querySelector('main').classList.add('hidden');
        document.querySelector('footer').classList.add('hidden');
    }
}

menuButton.addEventListener('click', toggleNavbar);