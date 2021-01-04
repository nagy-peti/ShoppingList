
# ShoppingList
Egy webes alkalmazás bevásáló listák egyszerű készítéséhez, megosztásához.
## Funkcionális követelmények

- A felhasználó létrehozhat bev. listákat, akár egyszerre többet is helytől, alkalomtól függően (pl otthonra, munkába, buliba...)
- Fel tud venni embereket barátoknak.
- Ezekkel a barátokkal a bevásárló listáit megoszthatja. Együtt szerkeszthetik.
- A felhasználó receptek között böngészhet, amihez több tárgy (item) tartozhat. Ahhoz adhat még, törölhet, módosíthat.

## Nem funkcionális követelmények
-   Felhasználóbarát, igényes felhasználói felület.
-   Több böngésző támogatása

### Könyvtárstruktúra

- Spring
    - backend keretrendszert tartalmazza
- Angular
    - frontend keretrendszert tartalmazza
- Database
    - az adatbázis inicializáló .sql fájlját, 
    illetve az adatbázis diagramját tartalmazza

## Backend megvalósítása

### Használt technológiák:
- adatbázis: h2
- backend: Spring
    - java 1.8
- CI: Travis
- Cloud: Heroku

### Adatbázis modell
![](/Database/db-diagram.jpg)

### Endpointok

- /users
    - GET /{id}/shoppingLists - felhasználó bevásárlólistái
    - GET /{id}/sharedShoppingLists - userrel megosztott bevásárlólisták
    - GET /{id}/friends - user kapcsolatai
    - POST /{id}/addFriend - kapcsolat felvétel
- /shopping_list
    - POST - új bevásárlólista felvétele
    - PUT /{id} - meglévő bevásárlólista módosítása
    - DELETE /{id} - bevásárlólista törlése
    - POST /{id}/addrecipe - recept hozzáadása bevásárlólistához
- /recipes
    - GET - recept lekérése
    - GET /{id}/items -recepthez tartozó 
    - POST - recept felvétele
    - PUT /{id} - recept módosítása
    - DELETE /{id} - recept törlése
- /items
    - POST - termék felvétele
    - PUT /{id} - termék módosítása
    - DELETE /{id} - termék törlése

### PUT /shopping_list/{id} endpoint szekvencia diagram

![](/Database/shopping_list_put.jpg)
   

## Frontend megvalósítása

### Használati eset
- Felhasználó: Bejelentkezés vagy regisztráció

    Bejelentkezve
    
        - Bevásárló listák kezelése, új felvétele, meglévő módosítása
        - Barátok között böngészés, új felvétele
        - Receptek kezelése, új felvétele, meglévő módosítása


### Fejlesztői környezet
[link](https://github.com/nagy-peti/ShoppingList/blob/angular-dev/Angular/static-ui/README.md)

### Könyvtárstruktúra
    .
    ├── ...
    ├──  app                   
    │   ├── login           # Bejelentkezés és regisztrációs komponensek
    │   ├── login-guard
    │   ├── main            # Főoldal komponens,   
    │   ├── item            # Item és mentés-módosítás komponensek, 
    │   ├── recipes         # Receptek és mentés-módosítás komponensek, 
    │   ├── social          # Barátok oldal és új hozzáadása komponens, 
    │   └── services
    └── ...
  
## Felhasználói dokumentáció


