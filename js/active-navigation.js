document.addEventListener('DOMContentLoaded', function () {
    const currentPage = document.location.pathname.split('/').pop();

    const navItems = document.getElementsByClassName('nav__list-item');
    for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        if (item.firstChild.tagName.toLocaleLowerCase() === 'a' && item.firstChild.getAttribute('href') === currentPage) {
            item.classList.add('nav__list-item_active');
        }
    }
});