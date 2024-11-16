import {cocktailsData} from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementsByClassName('form__input')[0];
    const hintsElement = document.getElementsByClassName('form__input-hints')[0];

    const cocktailsNames = cocktailsData.map(item => item.name);

    let currentIndex = -1;

    // on focus appears hints container
    inputElement.addEventListener('focus', () => {
        currentIndex = -1;

        if (inputElement.value.trim() !== "") {
            let cocks = filterInput(inputElement.value);
            if (cocks.length === 0) {
                return
            }

            updateHints(cocks);
            inputElement.classList.add('form__input_active');
            hintsElement.classList.add('form__input-hints_active');
        }
    });

    // when focus disappeared hints-container hidden
    inputElement.addEventListener('blur', () => {

        setTimeout(() => {
            hintsElement.classList.remove('form__input-hints_active');
            inputElement.classList.remove('form__input_active');
        }, 100);
    });

    // update hints-container with every change of input
    inputElement.addEventListener('input', () => {
        currentIndex = -1;

        let cocks = filterInput(inputElement.value);

        updateHints(cocks);
        if (cocks.length > 0 || inputElement.value.trim() !== "") {
            inputElement.classList.add('form__input_active');
            hintsElement.classList.add('form__input-hints_active');
        } else {
            inputElement.classList.remove('form__input_active');
            hintsElement.classList.remove('form__input-hints_active');
        }
    });

    // manipulation with arrows and enter
    inputElement.addEventListener('keydown', (e) => {
        const listItems = hintsElement.querySelectorAll('li');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex += 1;
            if (currentIndex >= listItems.length) {
                currentIndex = 0;
            }
            applyHighlight(listItems);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex -= 1;
            if (currentIndex < 0) {
                currentIndex = listItems.length - 1;
            }
            applyHighlight(listItems);
        } else if (e.key === 'Enter' && currentIndex >= 0) {
            e.preventDefault();
            listItems[currentIndex].click();
        }
    });

    function applyHighlight(items) {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('form__input-hints-item_highlight');
            } else {
                item.classList.remove('form__input-hints-item_highlight');
            }
        });
    }

    function updateHints(cocks) {
        hintsElement.innerHTML = '';
        cocks.map(function (cock) {
            const listItem = document.createElement('li');
            listItem.className = 'form__input-hints-item';
            listItem.innerText = cock;

            // add mouseover and click listeners
            listItem.addEventListener('click', () => {
                inputElement.value = cock;
                inputElement.classList.remove('form__input_active');
                hintsElement.classList.remove('form__input-hints_active');
            });

            listItem.addEventListener('mouseover', () => {
                const items = hintsElement.querySelectorAll('li');
                items.forEach((item, index) => {
                    if (item === listItem) {
                        currentIndex = index;
                    }
                });

                applyHighlight(items);
            });

            hintsElement.appendChild(listItem);
        });

        if (hintsElement.children.length > 0) {
            hintsElement.children[hintsElement.children.length - 1].classList.add('form__input-hints-item_last');
        } else {
            let notFound = document.createElement('li');
            notFound.classList.add('form__input-hints-item');
            notFound.classList.add('form__input-hints-item_last');
            notFound.classList.add('form__input-hints-item_error');
            notFound.innerText = 'Ничего не найдено :(';
            hintsElement.appendChild(notFound);
        }
    }

    function filterInput(inputValue) {
        if (inputValue.trim() === "") {
            return [];
        }
        inputValue = inputValue.toLowerCase();
        let filteredCocks = [];
        cocktailsNames.map(function (item) {
            let cock = item.toLowerCase().split(' ');
            let fl = false;
            cock.map(function (cockPart) {
                if (!fl && cockPart.startsWith(inputValue)) {
                    filteredCocks.push(item);
                    fl = true;
                }
            });
        });

        return filteredCocks;
    }
});