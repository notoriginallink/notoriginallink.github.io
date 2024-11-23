import {cocktailsData} from "../data.js";

document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementsByClassName('form')[0];
    const inputElement = document.getElementsByClassName('form__input')[0];
    const menuElement = document.getElementsByClassName('menu')[0];

    loadDataFromLocalStorage(menuElement);

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const cocktailName = inputElement.value.trim();

        const cocktailData = cocktailsData.find((cock) => cock.name === cocktailName);

        if (cocktailData && !isInLocalStorage(cocktailData)) {
            saveToLocalStorage(cocktailData);

            addToMenu(menuElement, cocktailData);

            formElement.reset();
        }
    });
});

function removeFromMenu(menuElement, cocktailElement) {
    menuElement.removeChild(cocktailElement);
    removeFromLocalStorage(cocktailElement);

    if (menuElement.children.length === 0) {
        menuElement.classList.add('menu_empty');
    } else {
        menuElement.children[menuElement.children.length - 1].classList.add('menu-item_last');
    }
}

function addToMenu(menuElement, cocktailData) {
    menuElement.classList.remove('menu_empty');

    if (menuElement.children.length > 0) {
        menuElement.children[menuElement.children.length - 1].classList.remove('menu-item_last');
    }

    const cocktailElement = createCocktail(cocktailData);
    cocktailElement.classList.add('menu-item_last');
    cocktailElement.querySelector('button').addEventListener('click', () => {
        removeFromMenu(menuElement, cocktailElement);
    });

    menuElement.appendChild(cocktailElement);
}

function createCocktail(cocktailData) {
    // Create box with name and photo
    const nameBox = document.createElement('div');
    nameBox.className = 'menu-item__name';

    const photoBox = document.createElement('div');
    photoBox.classList.add('content__photo-box');
    photoBox.classList.add('content__photo_square');

    const img = document.createElement('img');
    img.classList.add('content__photo-img');
    img.classList.add('content__photo-img_cut');
    img.src = cocktailData.image;

    photoBox.appendChild(img);

    const name = document.createElement('h1');
    name.classList.add('title_large');
    name.classList.add('title_medium');
    name.innerText = cocktailData.name;

    nameBox.appendChild(photoBox);
    nameBox.appendChild(name);

    // Create delete button
    const button = document.createElement('button');
    button.className = 'menu-item__delete';

    const buttonImg = document.createElement('img');
    buttonImg.className = 'menu-item__delete-img';
    buttonImg.src = '../img/calculator/trash_bin_icon.svg';

    button.appendChild(buttonImg);

    // collect everything
    const cocktailElement = document.createElement('li');
    cocktailElement.className = 'menu-item';

    cocktailElement.appendChild(nameBox);
    cocktailElement.appendChild(button);

    return cocktailElement;
}

function elementToData(cocktailElement) {
    return {
        name: cocktailElement.querySelector('h1').innerText,
        image: cocktailElement.querySelector('img').src,
    };
}

function loadDataFromLocalStorage(menuElement) {
    const cocktails = JSON.parse(localStorage.getItem('cocktails-menu') || '[]');
    cocktails.forEach((cocktailData) => {
        addToMenu(menuElement, cocktailData);
    });
}

function saveToLocalStorage(cocktailData) {
    const cocktails = JSON.parse(localStorage.getItem('cocktails-menu') || '[]');
    cocktails.push(cocktailData);
    localStorage.setItem('cocktails-menu', JSON.stringify(cocktails));
}

function removeFromLocalStorage(cocktailElement) {
    const cocktails = JSON
        .parse(localStorage.getItem('cocktails-menu') || '[]')
        .filter(item => item.name !== cocktailElement.querySelector('h1').innerText);

    localStorage.setItem('cocktails-menu', JSON.stringify(cocktails));
}

function isInLocalStorage(cocktailData) {
    return JSON
        .parse(localStorage.getItem('cocktails-menu') || '[]')
        .findIndex(item => item.name === cocktailData.name) !== -1;
}