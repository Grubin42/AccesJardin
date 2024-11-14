
# Introduction à Hugo pour la Création de Sites Statique

Hugo est un générateur de site statique rapide et flexible, idéal pour créer des blogs, portfolios, et documentations. Ce guide présente les bases pour comprendre Hugo et démarrer la création de contenu.

## 1. Créer un Site Hugo

Pour commencer un projet Hugo, exécute la commande suivante dans ton terminal :

```bash
hugo new site nom_du_site
```

Cela crée une structure de dossiers comme suit :

```
nom_du_site/
├── archetypes/
├── content/
├── layouts/
├── static/
├── config.toml
```

## 2. Structure et Concepts de Base

### Les Pages et les Posts

- **Pages** : Des pages statiques comme l’accueil, « À propos », ou contact.
- **Posts** : Des articles de blog, ajoutés sous `content/posts`. Chaque post contient un fichier Markdown (`.md`) avec du contenu et un *front matter* pour les métadonnées (titre, date, auteur, etc.).

#### Création de contenu

Pour créer un nouvel article ou une page :

```bash
hugo new posts/mon_article.md
```
ou
```bash
hugo new ma_page.md
```

### Les Archetypes (Archétypes)

Les **archétypes** sont des modèles pour générer des pages avec des métadonnées (*front matter*) prédéfinies. Exemple : un archétype `produit.md` pour ajouter automatiquement des champs `prix`, `description`, etc.

Créer un archétype :
```bash
hugo new archetype produit.md
```

Utiliser cet archétype :
```bash
hugo new --kind produit content/produits/nouveau_produit.md
```

### Layouts (Modèles)

Les layouts (modèles) définissent la mise en page des pages de ton site :

- **Single** : pour afficher une page individuelle (ex. un article).
- **List** : pour afficher une liste de contenu (ex. liste de posts).
- **Partials** : pour des composants réutilisables (header, footer).

## 3. Configurer le Site avec config.toml

Le fichier `config.toml` contient la configuration globale de ton site :

```toml
baseURL = "https://votresite.com"
title = "Mon Blog Hugo"
theme = "mon-theme"
languageCode = "fr-FR"
```

## 4. Ajouter du Contenu

Ajoute des articles ou des pages avec les commandes Hugo. Chaque fichier de contenu aura un front matter avec les métadonnées.

Exemple de fichier Markdown pour un article :

```markdown
---
title: "Mon Premier Article"
date: 2024-11-14
draft: true
---

# Bienvenue sur mon premier article

Ceci est un exemple d’article sur mon blog Hugo.
```

## 5. Démarrer le Serveur de Développement

Pour prévisualiser les modifications en direct, lance le serveur de développement :

```bash
hugo server
```

Le site sera accessible à `http://localhost:1313`.

## 6. Générer le Site Statique

Lorsque ton site est prêt pour la production :

```bash
hugo
```

Les fichiers statiques seront générés dans le dossier `public`, prêt à être déployé.

## 7. Thèmes et Personnalisation

Hugo prend en charge les **thèmes** pour personnaliser le design. Tu peux trouver des thèmes sur [themes.gohugo.io](https://themes.gohugo.io/).

Pour appliquer un thème :

```toml
theme = "nom-du-theme"
```

## Récapitulatif des Étapes

1. **Créer un site** : `hugo new site mon_site`
2. **Configurer** : modifie `config.toml`.
3. **Ajouter du contenu** :
   - Articles de blog : `hugo new posts/mon_article.md`
   - Pages : `hugo new ma_page.md`
4. **Utiliser les archétypes** pour des modèles de contenu.
5. **Personnaliser les layouts** dans `layouts/`.
6. **Démarrer le serveur** : `hugo server`
7. **Générer le site statique** : `hugo`

Avec Hugo, tu peux facilement gérer du contenu, personnaliser le design avec des thèmes et des layouts, et générer des sites statiques prêts à être déployés.
