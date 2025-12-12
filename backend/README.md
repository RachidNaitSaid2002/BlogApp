# Backend BlogApp

Ce dossier contient l'API Backend de l'application BlogApp, développée avec **FastAPI**.

## Prérequis

- Python 3.8 ou supérieur
- PostgreSQL (si utilisé comme base de données)

## Installation

1.  **Naviguer dans le dossier backend :**
    ```bash
    cd backend
    ```

2.  **Créer un environnement virtuel :**
    ```bash
    python -m venv venv
    ```

3.  **Activer l'environnement virtuel :**
    -   Sur Windows :
        ```bash
        venv\Scripts\activate
        ```
    -   Sur macOS/Linux :
        ```bash
        source venv/bin/activate
        ```

4.  **Installer les dépendances :**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configuration :**
    Assurez-vous d'avoir un fichier `.env` à la racine du dossier `backend` avec les variables nécessaires (ex: `DATABASE_URL`, `SECRET_KEY`, etc.).

## Lancement

Pour lancer le serveur de développement :

```bash
uvicorn main:app --reload
```

L'API sera accessible à l'adresse : `http://127.0.0.1:8000`
La documentation interactive (Swagger UI) est disponible sur : `http://127.0.0.1:8000/docs`
