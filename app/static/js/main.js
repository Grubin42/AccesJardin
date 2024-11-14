document.addEventListener("DOMContentLoaded", () => {
    // Charger le module de navigation
    import('./ajax-link.js').then(module => {
        module.initAjaxNavigation();
    });

    // Charger la carte uniquement si on est sur la page de contact
    if (window.location.pathname.includes("/contact")) {
        import('./map.js').then(module => {
            module.loadMap();
        });
    }
});