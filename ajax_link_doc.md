
# Documentation : Utilisation de `ajax-link` et `data-target` pour la Navigation Dynamique

Cette méthode permet de charger du contenu de manière dynamique dans des sections spécifiques de la page sans recharger toute la page. La classe `ajax-link` et l’attribut `data-target` permettent de définir le comportement des liens et de choisir précisément où le contenu sera injecté.

## 1. Structure et Préparation du Site

Assurez-vous d’avoir une structure HTML avec des sections bien définies où le contenu sera injecté. Par exemple :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site Hugo</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <header>
        <nav>
            <!-- Liens avec `ajax-link` et `data-target` définissant où insérer le contenu -->
            <a href="/" class="ajax-link" data-target="#main-content">Accueil</a>
            <a href="/services" class="ajax-link" data-target="#services-content">Services</a>
            <a href="/contact" class="ajax-link" data-target="#contact-content">Contact</a>
            <a href="/realisations" class="ajax-link" data-target="#portfolio-content">Réalisations</a>
        </nav>
    </header>

    <!-- Contenu principal où les sections seront injectées -->
    <main id="main-content">
        <div id="services-content"></div>
        <div id="contact-content"></div>
        <div id="portfolio-content"></div>
    </main>

    <footer>
        <p>&copy; 2024 Gaël. Tous droits réservés.</p>
    </footer>

    <script src="/js/navigation.js"></script>
</body>
</html>
```

## 2. Fonctionnement de `ajax-link` et `data-target`

- **`ajax-link`** : La classe `ajax-link` identifie les liens qui doivent être gérés par JavaScript pour éviter le rechargement complet de la page.
- **`data-target`** : L’attribut `data-target` indique l’élément où le contenu HTML de la page liée sera injecté. Le sélecteur peut être un identifiant (`#element-id`) ou une classe (`.element-class`).

## 3. JavaScript pour Charger le Contenu Dynamique

Le script `navigation.js` intercepte les clics sur les liens ayant la classe `ajax-link`, charge le contenu de la page liée et l’injecte dans le conteneur spécifié dans `data-target`.

```javascript
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
```

## 4. Exemples d’Utilisation : Composants à Charger dans des Emplacements Spécifiques

Voici quelques exemples concrets d’utilisation de `ajax-link` et `data-target`.

### Exemple 1 : Chargement d’une Liste de Services

Lien vers la page Services :

```html
<a href="/services" class="ajax-link" data-target="#services-content">Services</a>
```

**Page Services (`content/services.md`)** :

```markdown
---
title: "Services"
---

<div class="service-list">
  <h2>Nos Services</h2>
  <ul>
    <li>Développement Web</li>
    <li>Design Graphique</li>
    <li>Consulting SEO</li>
  </ul>
</div>
```

Le contenu de la liste sera injecté dans `<div id="services-content"></div>` sans recharger toute la page.

### Exemple 2 : Chargement d’une Carte de Contact

Lien vers la page Contact :

```html
<a href="/contact" class="ajax-link" data-target="#contact-content">Contact</a>
```

**Page Contact (`content/contact.md`)** :

```markdown
---
title: "Contact"
---

<div class="contact-info">
  <h2>Nous Contacter</h2>
  <p>Adresse : 123 Rue Exemple, Paris</p>
  <p>Téléphone : 01 23 45 67 89</p>
  <div class="map">
    <!-- Code de la carte, par exemple un iframe Google Maps -->
    <iframe src="https://www.google.com/maps/embed?..."></iframe>
  </div>
</div>
```

Le contenu de cette page sera injecté dans `<div id="contact-content"></div>`, permettant un chargement dynamique de la carte.

### Exemple 3 : Chargement du Portfolio

Lien vers la page Réalisations :

```html
<a href="/realisations" class="ajax-link" data-target="#portfolio-content">Réalisations</a>
```

**Page Réalisations (`content/realisations.md`)** :

```markdown
---
title: "Réalisations"
---

<div class="portfolio">
  <h2>Nos Réalisations</h2>
  <ul>
    <li>Projet A - Site Web</li>
    <li>Projet B - Application Mobile</li>
    <li>Projet C - E-commerce</li>
  </ul>
</div>
```

Le contenu sera injecté dans `<div id="portfolio-content"></div>`, rendant la navigation vers le portfolio rapide et fluide.

---

## 5. Résumé des Étapes

1. Ajoutez la classe `ajax-link` aux liens que vous souhaitez charger dynamiquement.
2. Utilisez `data-target` pour spécifier le conteneur de destination.
3. Assurez-vous que le script `navigation.js` est chargé pour gérer les clics sur les liens et insérer le contenu de manière dynamique.

Avec cette structure, vous pouvez gérer le chargement de contenu dynamique dans différentes sections de la page, offrant ainsi une expérience utilisateur plus fluide et réactive.
