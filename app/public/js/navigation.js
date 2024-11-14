document.addEventListener("DOMContentLoaded", () => {
    let isManualNavigation = true; // Variable pour détecter si la navigation est manuelle

    const loadContent = (url, targetSelector, addHistory = true) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newContent = doc.querySelector(targetSelector);

                if (newContent) {
                    document.querySelector(targetSelector).innerHTML = newContent.innerHTML;

                    // Ajoute une entrée dans l'historique uniquement si addHistory est true
                    if (addHistory) {
                        window.history.pushState({ targetSelector: targetSelector }, "", url);
                    }
                }
            })
            .catch(error => console.error("Erreur lors du chargement :", error));
    };

    document.querySelectorAll(".ajax-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            isManualNavigation = true; // Indique que la navigation est déclenchée manuellement

            const url = event.target.href;
            const targetSelector = event.target.getAttribute("data-target") || "main";
            loadContent(url, targetSelector, true); // Charge le contenu et ajoute une entrée dans l'historique
        });
    });

    // Gère l'historique du navigateur pour la navigation avant/arrière
    window.addEventListener("popstate", (event) => {
        isManualNavigation = false; // Navigation déclenchée automatiquement par popstate

        // Utilise le sélecteur cible enregistré dans l'état, ou "main" par défaut
        const targetSelector = event.state ? event.state.targetSelector : "main";
        loadContent(window.location.href, targetSelector, false); // Ne pas ajouter d'entrée dans l'historique
    });
});