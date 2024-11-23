document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('calculate__button')[0].addEventListener('click', () => {
        lookupNeedsInCache()
            .then((needs) => renderNeeds(needs))
            .catch(() => {
                hideNeeds();
                renderPreloader();

                setTimeout(() => {
                    fetch('https://dummyjson.com/c/0408-6d3d-4a67-ac37')
                        .then(response => response.json())
                        .then(json => extractNeeds(json))
                        .then(needs => renderNeeds(needs))
                        .catch(error => renderError(error));
                }, 1000);
            });
    });
});

function lookupNeedsInCache() {
    return new Promise((resolve, reject) => {
        const peopleParameter = parseInt(JSON.parse(localStorage.getItem('people_parameter') || '1'))
        const durationParameter = parseInt(JSON.parse(localStorage.getItem('duration_parameter') || '1'))
        const funParameter = parseInt(JSON.parse(localStorage.getItem('fun_parameter') || '1'))
        const cocktails = JSON.parse(localStorage.getItem('cocktails-menu') || '[]').map((item) => item.name);

        const cache = JSON.parse(localStorage.getItem('calculator_cache'));

        if (cache != null
            && cache.people === peopleParameter
            && cache.duration === durationParameter
            && cache.fun === funParameter
            && JSON.stringify(cache.cocktails) === JSON.stringify(cocktails)) {
            alert("Cache used!");
            return resolve(cache.needs);
        }

        reject();
    });
}

function renderError(error) {
    console.log(error);

    const errorElement = document.getElementsByClassName('calculate__error')[0];
    removePreloader();
    errorElement.classList.add('calculate__error_active');
    setTimeout(() => {
        errorElement.classList.remove('calculate__error_active');
    }, 4000);
}

function renderPreloader() {
    const preloaderElement = document.getElementsByClassName('calculate__preloader')[0];
    if (!preloaderElement.classList.contains('calculate__preloader_active')) {
        preloaderElement.classList.add('calculate__preloader_active');
    }
}

function removePreloader() {
    const preloaderElement = document.getElementsByClassName('calculate__preloader')[0];
    preloaderElement.classList.remove('calculate__preloader_active');
}

function saveNeedsInCache(needs) {
    const cache = {
        people: JSON.parse(localStorage.getItem('people_parameter') || '1'),
        duration: JSON.parse(localStorage.getItem('duration_parameter') || '1'),
        fun: JSON.parse(localStorage.getItem('fun_parameter') || '1'),
        cocktails: JSON.parse(localStorage.getItem('cocktails-menu') || '[]').map((item) => item.name),
        needs: needs
    };

    localStorage.setItem('calculator_cache', JSON.stringify(cache));
}

function hideNeeds() {
    const needsElement = document.getElementsByClassName('needs')[0];
    needsElement.classList.add('needs_empty');
    setTimeout(() => needsElement.replaceChildren(), 300)
}

function renderNeeds(needs) {
    const needsElement = document.getElementsByClassName('needs')[0];
    needsElement.replaceChildren();
    needs.forEach((need) => {
        const li = document.createElement('li');
        li.className = 'needs__item';

        const a = document.createElement('a');
        a.className = 'needs__item-name'
        a.innerText = need.ingredient;
        a.href = need.link;
        li.appendChild(a);

        const hr = document.createElement('hr');
        hr.className = 'needs__item-separator';
        li.appendChild(hr);

        const span = document.createElement('span');
        span.className = 'needs__item-amount';
        span.innerText = need.amount;
        li.appendChild(span);

        needsElement.appendChild(li);
    });

    if (needsElement.classList.contains('needs_empty')) {
        needsElement.classList.remove('needs_empty');
    }

    saveNeedsInCache(needs);
    removePreloader();
}

function extractNeeds(json) {
    return new Promise((resolve, reject) => {
        if (json.needs && json.needs.length > 0) {
            resolve(json.needs);
        } else {
            reject(new Error("Invalid response format"));
        }
    });
}