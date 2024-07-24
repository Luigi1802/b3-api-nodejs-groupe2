# b3-api-nodejs-groupe2

## 1 Description de l'API

Ce dépôt propose une API de gestion d'une vidéothèque pour un utilisateur. Un jeu de données de 100 films est stocké en base. Ce sont ces films qu'un utilisateur peut ajouter à sa liste de lecture, dans ses favoris ou dans son historique. 

L'admnistration de l'application est gérée par le rôle admin qui a des droits d'ajout, modification et suppression de films. L'admin peut également consulter la liste et le détail des utilisateurs.

## 2 Démarrer et utiliser l'API

### 2.1 Environnemet de dev

Clonez le dépôt sur votre machine avec la commande `git clone git@github.com:Luigi1802/b3-api-nodejs-groupe2.git`.

Sur votre dépôt local, créez un fichier `config.json` sur le modèle du fichier `config.template.json`. Dans ce fichier config nouvellement créé, adaptez les infos de port *HOST* et de lien MongoDB *MONGODB_URL* (cf 2.2 Mise en place la base de données).

### 2.2 Mise en place la base de données
La base de donnnées utilise la technologie MongoDB, structure NoSQL.

La base se compose de trois collections:
- **Movie** un jeu de données de 100 films
- **User** les utilisateurs (identifiants et vidéothèque)
- **Admin** les administrateurs (identifiants)

Les fichiers dump des collections sont dans le répertoire `data` à la racine du projet. Dans une connexion MongoDB de votre choix (ex `mongodb://localhost:27017/`), créez une base de données `movies`. Dans cette base de données, créez les collections **Movie**, **User** et **Admin** et importez les données grâce aux dump du répertoire `data`:
- `movies.Admin.json`
- `movies.Movie.json`
- `movies.User.json`

Mettez l'URL de votre conexion MongoDB dans le champ `MONGODB_URL` de votre fichier `config.json` (cf 2.1 Environnemet de dev). Ici, notre URL serait `mongodb://localhost:27017/movies`.

### 2.3 Commande de lancement

Une fois votre base de données en place et votre fichier `config.json` paramétré, ouvrez le terminal de votre choix à l'emplacement du dépôt local (précédement cloné). Déplacez vous dans le fichier `backend` avec la commande `cd backend/`. Faites une installation avec la commande `npm install`. 

Pour lancer l'API, éxecutez la commande `npm run start`. En cas de succès, l'API tourne sur le port renseigné dans votre fichier `config`.

## 3 Route de l'API

L'API se compose de trois catégorie de route:
- Les routes publiques pour consulter la liste des films, consulter un film en détail, s'enregistrer/se connecter pour un utilisateur, se connecter pour un administrateur
- Les routes privés utilisateur, soit l'espace pesonnel pour un utilisateur connecté (favoris, infos utilisateur, liste de lecture, historique)
- Les routes privés administrateur, soit l'espace de l'administrateur (ajout, modification, suppression de films, administration des utilisateurs)

Swagger est mis en place pour le détail des routes et le format de données attendu.