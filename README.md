# SummaX

Bienvenue sur le projet **BlogApp**. C'est une application complète de blog comprenant une API Backend robuste et une interface Frontend moderne.

## Structure du Projet

Le projet est divisé en deux parties principales :

-   **backend/** : L'API RESTful construite avec **FastAPI** (Python). Elle gère la base de données, l'authentification et la logique métier.
-   **frontend/** : L'interface utilisateur construite avec **Next.js** (React). Elle offre une expérience utilisateur fluide et responsive.

## Démarrage Rapide

Vous pouvez lancer chaque partie séparément ou utiliser Docker (si configuré).

### 1. Backend (API)

```bash
cd backend
# Activer l'environnement virtuel (voir backend/README.md pour les détails)
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend (UI)

```bash
cd frontend
npm install
npm run dev
```

### 3. Docker (Optionnel)

Si vous avez Docker installé, vous pouvez lancer tout le projet avec une seule commande à la racine :

```bash
docker-compose up --build
```

## Documentation Détaillée

Pour des instructions plus précises, veuillez consulter les fichiers README spécifiques :

-   [Documentation Backend](./backend/README.md)
-   [Documentation Frontend](./frontend/README.md)
