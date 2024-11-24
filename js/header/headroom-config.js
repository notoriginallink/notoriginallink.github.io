document.addEventListener("DOMContentLoaded", function() {
    const myHeader = document.querySelector("header");

    if (myHeader) {
        const headroom = new Headroom(myHeader, {
            tolerance: 5, // Насколько быстро надо листать, чтобы header скрылся (выше = быстрее)
            offset: 50, // На сколько надо пролистать, чтобы header начинал скрываться
            classes: {
                initial: "header",
                pinned: "header--pinned",
                unpinned: "header--unpinned"
            }
        });

        headroom.init();
    }
});