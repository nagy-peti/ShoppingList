
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

### "use-case" diagram


![](/Database/usecase.jpg)

### Regisztálás/Bejelentkezés

Érvényes felhasználói fiók szükséges az alkalmazás használatához, ezért először regisztrálás, majd bejelentkezés szükséges. Nélküle más oldalt nem is lehet megnyitni az alkalmazáson belül.

### Főoldal

A saját és velünk megosztott listáinkat láthatjuk itt. Jobboldali listában lévő különböző bevásárlási listákra kattintva a középső oszlopban a hozzátartozó hozzávalók megjelennek.
Módosítási nézet: A listák módosításához a jobb felső sarokban lévő négyzetet bepipálva aktiválhatjuk ezt a módot. Ekkor a saját listákat törölhetjük, módosíthatjuk, újat létrehozhatunk és azon belül, hozzávalókat is felvehetünk, módosíthatjuk, törölhetjük. Azt is megadhatjuk, hogy a listánk meg legyen e osztva (publikus) a barátainkkal, vagy ne.

![](/Database/main.jpg)

### Barátok oldal

A barátok oldalon az eddigi felvett barátokat találja. Az oldal alsó jobb szélén lévő ikonra kattintva új barátokat lehet felvenni felhasználónév megadásával. Ha megadott névhez nem tartozik felhasználó, akkor azt egy hibaüzenet jelzi. Sikeres hozzáadás esetén a listában láthatjuk.

![](/Database/social.jpg)

### Receptek oldal

Az oldal az eddig létrehozott recepteket tartalmazza létrehozás sorrendjében. Először csak a receptek nevei láthatók, amikre rákattintva a komponens lenyílik, és így láthatjuk az egyes receptekhez tartozó hozzávalókat. Ezt persze ugyanígy vissza lehet csukni. A receptet a jobb alsó sarokban a "+"-ra kattintva hozhatunk létre. A recept neve mellett a módosítás és a törlés gombot találjuk. Ugyanúgy a hozzávalókat a recept komponens lenyílt állapotában a "+1"-re kattintva tudunk hozzáadni, módosítani és törölni pedig a hozzájuk tartozó ikonok segítségével.


![](/Database/recipes.jpg)
