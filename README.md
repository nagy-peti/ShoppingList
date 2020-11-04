
# ShoppingList
Egy webes alkalmazás bevásáló listák egyszerű készítéséhez, megosztásához.
## Funkcionális követelmények

- A felhasználó létrehozhat bev. listákat, akár egyszerre többet is helytől, alkalomtól függően (pl otthonra, munkába, buliba...)
- Fel tud venni embereket barátoknak.
- Ezekkel a barátokkal a bevásárló listáit megoszthatja. Együtt szerkeszthetik.
- Különböző bevásárlási 'szett'-ek (pl.: receptek) között böngészhet. Ezeket kiválasztva egyszerre több item felkerül a bevásárlási listára. A felhasználó újat is létre hozhat. Sajátjait módosíthatja.

## Nem funkcionális követelmények
-   Felhasználóbarát, igényes felhasználói felület.
-   Több böngésző támogatása
## Fogalomjegyzék


## Szerepkörök
- Pintér Gergő: ...
- Nagy Péter: ...

## Backend megvalósítása

### Használt technológiák:
- adatbázis: PostgreSql
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