
# Projet Hugo avec Docker

Ce projet utilise Docker pour gérer un site Hugo en environnement de développement et de production. Ce `Makefile` fournit des commandes pour initialiser, construire et exécuter le site, ainsi que pour créer facilement du contenu.

## Prérequis

- **Docker** et **Docker Compose** doivent être installés sur votre machine.

## Commandes disponibles

Les commandes principales sont accessibles via le Makefile pour simplifier la gestion du projet.

| Commande           | Description                                                     |
|--------------------|-----------------------------------------------------------------|
| `make init`        | Initialiser le projet Hugo                                      |
| `make build-dev`   | Construire l'image Docker pour l'environnement de développement |
| `make build-prod`  | Construire l'image Docker pour l'environnement de production    |
| `make up-dev`      | Démarrer le service en mode développement                       |
| `make up-prod`     | Démarrer le service en mode production                          |
| `make down`        | Arrêter les services actifs                                     |
| `make logs-dev`    | Voir les logs en direct du service de développement             |
| `make logs-prod`   | Voir les logs en direct du service de production                |
| `make clean`       | Supprimer les images, conteneurs, volumes et orphelins          |
| `make new-post`    | Créer un nouvel article de blog                                 |
| `make new-page`    | Créer une nouvelle page                                         |
| `make new-archetype`| Créer un nouvel archétype de contenu                           |
| `make serve`       | Démarrer le serveur de développement                            |
| `make build`       | Générer le site statique dans le dossier `public`               |

## Guide d'utilisation

### 1. Initialiser le projet Hugo

Pour initialiser un nouveau projet Hugo, exécutez :

```bash
make init
```

Cela vérifiera si le projet est déjà initialisé dans le dossier `app`. Si ce n'est pas le cas, un nouveau projet Hugo sera créé.

### 2. Construire l'image Docker de développement

Pour construire l'image Docker pour l'environnement de développement, lancez :

```bash
make build-dev
```

### 3. Démarrer le service en mode développement

Pour lancer le conteneur de développement, utilisez :

```bash
make up-dev
```

Le service de développement sera disponible sur `http://localhost:1313`. Toutes les modifications dans le dossier local seront immédiatement reflétées dans le conteneur grâce au montage du volume.

### 4. Créer du contenu

#### Créer un nouvel article de blog

Pour créer un nouvel article, utilisez la commande :

```bash
make new-post
```

Un message vous invitera à entrer le nom du fichier (par exemple, `mon_article.md`). Le fichier sera créé dans le dossier `content/posts`.

#### Créer une nouvelle page

Pour ajouter une nouvelle page au site, exécutez :

```bash
make new-page
```

Entrez le nom du fichier lorsque demandé (par exemple, `ma_page.md`). Le fichier sera créé à la racine du dossier `content`.

#### Créer un nouvel archétype de contenu

Pour définir un archétype personnalisé, lancez :

```bash
make new-archetype
```

Indiquez le nom de l'archétype (par exemple, `produit.md`). Le fichier sera créé dans le dossier `archetypes`, prêt à être utilisé comme modèle de contenu.

### 5. Démarrer le serveur de développement

Pour démarrer le serveur de développement Hugo :

```bash
make serve
```

Cela démarre le serveur et rend le site accessible sur `http://localhost:1313`, avec un rafraîchissement automatique pour voir les modifications en direct.

### 6. Générer le site statique

Pour créer la version statique du site, prête pour la production, exécutez :

```bash
make build
```

Les fichiers générés seront dans le dossier `public`.

### 7. Passer en mode production

Si vous souhaitez tester ou déployer le site en mode production :

- Construire l'image de production :
  ```bash
  make build-prod
  ```
- Démarrer le conteneur en mode production :
  ```bash
  make up-prod
  ```

Le site sera servi via Nginx sur le port 80 et accessible sur `http://localhost`.

### 8. Nettoyer les ressources Docker

Pour supprimer les conteneurs, images, volumes et conteneurs orphelins, utilisez :

```bash
make clean
```

---

Avec ce Makefile, tu peux facilement gérer les aspects de création, développement et déploiement de ton site Hugo en utilisant Docker, sans avoir besoin d'installer Hugo localement.
