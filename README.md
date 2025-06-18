# BookVibe

**BookVibe** est une application web pour consulter, rechercher et critiquer des livres.  
Backend : Node.js, Express, MySQL, JWT.  
Frontend React prévu dans les prochaines versions.


## 🌐 Objectif

Offrir une plateforme moderne de critiques de livres avec authentification et API RESTful.


## 📁 Structure du projet

```plaintext
bookvibe/
├── client/               # React frontend (à venir)
└── server/
    ├── src/
    │   ├── config/       # Config (connexion DB, etc.)
    │   ├── controllers/  # Logique des routes
    │   ├── middlewares/  # Auth JWT, gestion erreurs
    │   ├── models/       # Schémas et requêtes SQL
    │   ├── routes/       # Définition des endpoints
    │   ├── utils/        # Fonctions utilitaires
    │   └── app.js        # Serveur Express
    ├── database/         # Scripts SQL (création BD/tables)
    ├── index.js          # Point d'entrée
    ├── .env              # Variables d’environnement
    ├── .env.example
    ├── package.json
└── README.md            

```

## 🚀 Fonctionnalités

### Utilisateurs non connectés
- Voir tous les livres
- Recherche par ISBN, titre, auteur
- Consulter les critiques
- S’inscrire et se connecter

### Utilisateurs connectés (JWT)
- Ajouter/modifier ses propre critiques
- Supprimer sa propre critique


## 🛠️ Technologies

- Backend : Node.js, Express.js  
- Base de données : MySQL  
- Connexion : mysql2/promise  
- Authentification : JWT (jsonwebtoken)  
- Gestion des variables d’environnement : dotenv


## ⚙️ Installation

1. Cloner le dépôt  
   ```bash
   git clone https://github.com/bilal-essafrioui/bookvibe.git
   cd bookvibe/server
   npm install
   ```
## ⚙️ Installation et lancement

### Configurer `.env` à partir de `.env.example`

Exemple de contenu à adapter :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=onlinebookreviews
PORT=5000
SECRET_KEY=your_secret_key
```

## ⚙️ Lancer le serveur

```bash
npm start
```
## 🔄 Endpoints principaux

### Livres (`/books`)
- `GET /books` — Tous les livres  
- `GET /books/isbn/:isbn` — Livre par ISBN  
- `GET /books/author/:author` — Livres par auteur  
- `GET /books/title/:title` — Livres par titre  

### Critiques (`/reviews`)
- `GET /reviews/:id_book` — Critiques d’un livre

### Utilisateurs (`/`)
- `POST /sign-up` — Inscription  
- `POST /log-in` — Connexion  

### Actions sécurisées (JWT requis)
- `POST /add/review/:id` — Ajouter une critique  
- `POST /update/review/:id` — Modifier sa critique  
- `DELETE /delete/review/:id` — Supprimer sa critique
