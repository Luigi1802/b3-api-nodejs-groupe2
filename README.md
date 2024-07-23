# b3-api-nodejs-groupe2

## Routes
### Routes publiques

**POST** `/user/register/`

**POST** `/user/login/`

**POST** `/admin/login/`

**GET** `/movies/getAll/`

**GET** `/movies/getOne?id={id du film}`

**GET** `/movies/search?title={titre du film}&genre={genre du film}&year={année de sortie}`

> Chaque paramètre de la route est indépendant

### Routes privées (utilisateur)

**PATCH** `/user/`

**POST** `/user/favorites/`

**GET** `/user/favorites/`

**DELETE** `/user/favorites?id={id du film}`

**POST** `/user/watchlist/`

**GET** `/user/history/`

**PATCH** `/user/deleteAccount/`

### Routes privées (admin)

**POST** `/admin/movies/`

**PATCH** `/admin/movies?id={id du film}`

**DELETE** `/admin/movies?id={id du film}`

**GET** `/admin/users/getAll`

**GET** `/admin/users/getOne`

## Données

- Sur mongoDB créer une base de données movies et configurer l'accès dans backend/config.json.
- Créer la collection Movie et importer les données via le fichier data/movies.json