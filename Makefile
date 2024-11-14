# Makefile

HUGO_VERSION=latest
DOCKER_HUGO_IMAGE=ghcr.io/gohugoio/hugo:${HUGO_VERSION}

.PHONY: help init build-dev build-prod up-dev up-prod down logs-dev logs-prod clean new-post new-page new-archetype

help:
	@echo "Commandes disponibles :"
	@echo "  make init            Initialiser le projet Hugo"
	@echo "  make build-dev       Construire l'image de développement"
	@echo "  make build-prod      Construire l'image de production"
	@echo "  make up-dev          Démarrer le service de développement"
	@echo "  make up-prod         Démarrer le service de production"
	@echo "  make down            Arrêter les services"
	@echo "  make logs-dev        Voir les logs du service de développement"
	@echo "  make logs-prod       Voir les logs du service de production"
	@echo "  make clean           Supprimer les images et les conteneurs"
	@echo "  make new-post        Créer un nouvel article de blog"
	@echo "  make new-page        Créer une nouvelle page"
	@echo "  make new-archetype   Créer un nouvel archétype de contenu"
	@echo "  make serve           Démarrer le serveur de développement"
	@echo "  make build           Générer le site statique"

# Initialiser le projet Hugo
init:
	@echo "Initialisation du projet Hugo..."
	@if [ -f "app/hugo.toml" ]; then \
		echo "Le projet semble déjà être initialisé (hugo.toml trouvé)."; \
	else \
		mkdir -p app && docker run --rm -v $(PWD)/app:/project -w /project ${DOCKER_HUGO_IMAGE} new site .; \
		echo "Projet Hugo initialisé dans le dossier 'app'."; \
	fi

build-dev:
	docker compose build dev

build-prod:
	docker compose build prod

up-dev:
	docker compose up dev

up-prod:
	docker compose up -d prod

down:
	docker compose down

logs-dev:
	docker compose logs -f dev

logs-prod:
	docker compose logs -f prod

clean:
	docker compose down --rmi all --volumes --remove-orphans

# Créer un nouvel article de blog
new-post:
	@read -p "Entrez le nom du nouvel article de blog (ex: mon_article.md) : " name; \
	docker run --rm -v $(PWD)/app:/project -w /project ${DOCKER_HUGO_IMAGE} new posts/$$name

# Créer une nouvelle page
new-page:
	@read -p "Entrez le nom de la nouvelle page (ex: ma_page.md) : " name; \
	docker run --rm -v $(PWD)/app:/project -w /project ${DOCKER_HUGO_IMAGE} new $$name

# Créer un nouvel archétype de contenu
new-archetype:
	@read -p "Entrez le nom du nouvel archétype (ex: produit.md) : " name; \
	docker run --rm -v $(PWD)/app:/project -w /project ${DOCKER_HUGO_IMAGE} new archetype/$$name