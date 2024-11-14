// navigation.js
export function initAjaxNavigation() {
    document.querySelectorAll(".ajax-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const url = event.target.href;
            const targetSelector = event.target.getAttribute("data-target") || "main";
            loadContent(url, targetSelector, true);
        });
    });

    window.addEventListener("popstate", (event) => {
        const targetSelector = event.state ? event.state.targetSelector : "main";
        loadContent(window.location.href, targetSelector, false);
    });
}

export function loadContent(url, targetSelector, addHistory = true) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newContent = doc.querySelector(targetSelector);

            if (newContent) {
                document.querySelector(targetSelector).innerHTML = newContent.innerHTML;

                if (addHistory) {
                    window.history.pushState({ targetSelector: targetSelector }, "", url);
                }

                if (url.includes("/contact")) {
                    import('./map.js').then(({ loadMap }) => {
                        loadMap();
                    }).catch(error => console.error("Erreur lors du chargement de la carte :", error));
                }
            }
        })
        .catch(error => console.error("Erreur lors du chargement :", error));
}