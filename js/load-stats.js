window.addEventListener('load', function() {
    const time = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart);

    // create title
    const title = document.createElement('h1');
    title.className = 'title title_medium title_footer';
    title.innerText = 'Время загрузки';

    // create divider
    const divider = document.createElement('hr');
    divider.className = 'footer__h-divider';

    // create new paragraph
    const p = document.createElement('p');
    p.innerText = `${time.toString()} ms.`;

    // create column
    const column = document.createElement('div');
    column.className = 'footer__column';
    column.appendChild(title);
    column.appendChild(divider);
    column.appendChild(p);

    // insert column to footer
    document.querySelector('footer').appendChild(column);
});