# Application nodeJS de films

## Utilisation

Cette application marche en utilisant mongoDB, avec une API REST NodeJS + Express.

## Installation

Cette application nécessite des dépendances de plusieurs genres pour tourner. Avec NodeJS, vous devez les installer avec les dépendances
   ```bash
   npm install express mongoose bcrypt jsonwebtoken dotenv multer
   ```

Ainsi, vous pourrez lancer cette commande pour demarrer l'appli !
```bash
    npm run start
```

## Chemins de l'API

### Chemins publics (Accessibles par tout le monde)

#### api/users/register (Type: POST)

Données nécessaires: name, email, password
Format:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```
Utilisation: Permet de créer un compte.

#### api/users/login (Type: POST)

Données nécessaires: email, password
Format:
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
Utilisation: Permet de se connecter à un compte existant.

#### api/users/(id utilisateur) (Type: POST)

Données nécessaires: name, password
Format:
```json
{
    "name": "John Doe",
    "password": "password123"
}
```
Utilisation: Permet de retrouver les infos de son compte.

#### api/movies/list (Type: GET)

Données nécessaires: aucune

Utilisation: Permet de retrouver un liste de films.

#### api/movies/list (Type: POST)

Données nécessaires: aucune
Données optionelles: name, director, genre, description, releaseDate, ageRating
Format:
```json
{
    "name": "Lorem Ipsum",
    "director": "John Doe",
    "genre": "",
    "description": "",
    "releaseDate": "",
    "ageRating": 0,
}
```
Utilisation: Permet de retrouver un liste de films avec des critères specifiques.

#### api/movies/(id du film) (Type: GET)

Données nécessaires: aucune

Utilisation: Permet de retrouver des informations d'un film en spécifique

### Chemins privés (Utilisateur ou Administrateur)

#### api/users/login/(id de l'utilisateur) (Type: PATCH)

Données nécessaires: name, password
Format:
```json
{
    "name": "John Doe",
    "password": "password123",
}
```
Utilisation: Permet de modifier son nom ou mot de passe dans le site.

#### api/users/(nom de liste)/list (Type: GET)

Données nécessaires: aucune
Noms de listes: favorites, watchlater, watched, watching

Utilisation: Permet d'afficher notre liste de films preferés, à voir ultérieurement, vus ou en train de visionnage.

#### api/users/(nom de liste)/(id du film) (Type: PATCH)

Données nécessaires: aucune
Noms de listes: favorites, watchlater, watched, watching

Utilisation: Permet de rajouter un film dans la liste choisie ou de le supprimer si elle est déjà présente dans la salle.
Notes:
- Dans le cas des films à voir, vus ou en train de visionnage, le film sera supprimé de toutes nos listes (Sauf la liste des films preferés), puis il sera ajouté dans la liste desirée dans le cas où il serait présent dans une autre liste.
- L'API stocke la date de visionnage d'un film que pour la liste de films visionnés

#### api/users/accdel/(id de l'utilisateur) (Type: DELETE)

Données nécessaires: email, password
Format:
```json
{
    "email": "john.doe@example.com",
    "password": "password123",
}
```
Utilisation: Permet de supprimer son compte. Le renseignement de son email ou son mot de passe est une mesure de sécurité.

#### api/users/login/(id de l'utilisateur) (Type: GET)

Données nécessaires: aucune

Utilisation: Affiche des films du même genre que celles dans votre liste de favoris. Si vous n'avez pas de films preferés, vous ne verrez rien qui est affiché.

### Chemins privés (Administrateur)

#### api/users/regusers (Type: GET)

Données nécessaires: aucune

Utilisation: Permet d'avoir la liste d'utilisateurs

#### api/users/regusers/(id de l'utilisateur) (Type: GET)

Données nécessaires: aucune

Utilisation: Permet d'avoir TOUTES les informations en rapport à l'utilisateur specifié

#### api/movies/register (Type: POST)

Données nécessaires: name, director, genre
Données optionnelles: description, releaseDate, ageRating
Format:
```json
{
    "name": "Lorem Ipsum",
    "director": "John Doe",
    "genre": "TBD",
    "description": "",
    "releaseDate": "",
    "ageRating": 0,
}
```
Utilisation: Permet de renseigner un film dans la base de données

#### api/movies/edit/(id du film) (Type: POST)

Données nécessaires: aucune
Données optionelles: name, director, genre, description, releaseDate, ageRating
Format:
```json
{
    "name": "Lorem Ipsum",
    "director": "John Doe",
    "genre": "",
    "description": "",
    "releaseDate": "",
    "ageRating": 0,
}
```
Utilisation: Permet de modifier les informations d'un film

#### api/movies/del/(id du film) (Type: DELETE)

Données nécessaires: aucune

Utilisation: Permet d'effacer un film de la base de données.