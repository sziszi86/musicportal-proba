# Medior Frontend Developer

## Cél

Egy **modern zenei webapp** (“MusicPortal”) megvalósítása, amely:

- publikus oldalakkal (albumlista, kritikák, főoldal, stb.)
- és egy admin felülettel (dashboard, CRUD műveletek) rendelkezik.

Minden adat **Next.js API route**-ból érkezik (faker.js-sel generált).

---

## Tech Stack

- **Next.js 15+ (App Router)**
- **React 19+**
- **Tailwind CSS 4+**
- **shadcn/ui**
- **Redux Toolkit**
- **Zod** (form validációhoz)
- **faker.js** (mock adatok generálása)

---

## Projekt szerkezet

```
A szerkezet kialakítása a te feladatod. Használj layout routingot.
```

---

## Publikus oldalak

### Főoldal (Landing Page)

Cél: több komponens, látványos elrendezés, “app feeling”.

#### Ajánló blokk (hero)

Cél: megmutassa az ajánlott albumot vagy napi zenét. A tartalma minden rendereléskor ugyanaz az album.

Elemek:

- Nagy albumborító
- Cím, előadó, rövid leírás / idézet
- Gomb: “Hallgasd meg” (link /albums/[id]) és “További részletek” (link /reviews/[id])
- Kis play ikon a borítón hover esetén, ami a globális Zenelejátszó állapotot indítja (lásd album oldal) kattintásra

#### Legnépszerűbb albumok (carousel)

Cél: albumok megjelenítése (véletlenszerű a rendereléskor).

Elemek:

- 4–6 album kártya (borító, cím, előadó)
- Hover állapotban a kártyán megjelenő gomb: “Hallgasd meg” (link /albums/[id])
- Kis play ikon a borítón hover esetén, ami a globális Zenelejátszó állapotot indítja (lásd album oldal) kattintásra
- Kisebb Badge komponensek: pl. “Újdonság”, “Népszerű” (nem minden elemen)
- album lista oldal

#### Legújabb kritikák (grid)

Cél: bemutatni a kritikákat. A tartalma minden rendereléskor ugyanaz.

Elemek:

- 3 kritika kártya (borító, cím, előadó, szerző, értékelés (⭐️))
- CTA: “Olvasd tovább” gomb (link /reviews/[slug])
- kritika lista oldal

#### Zenei műfajok / Kategóriák (tag list)

Cél: az album oldalon megjelenő tételek szűrése.

Elemek:

- Műfaj szűrő: Pop, Jazz, Rock, Indie, Electronic stb.
- Kattintásra: album lista oldal az aktuális kategóriának megfelelő tételekkel

#### Feliratkozás űrlap (email)

Cél: feliratkozás kezelése. A komponens nem küld adatokat, csak saját state-et kezel.

Elemek:

- Email mező (Zod validációval)
- CTA gomb: “Feliratkozom”
- Sikeres submit után (érvényes email cím) köszönő üzenet 5 másodpercig, majd az eredeti nézet.

#### Idézet (a képen Featured artist)

Cél: “magazin” hangulatot hozni, extra vizualitás. 10 másodpercenként cserélődik.

Elemek:

- Faker.js generált zenésznév, idézet, portré kép
- Design: gradient háttér, italic betűstílus az idézet szövegén

#### _Opcionális_: Közösségi szekció / Top listeners

Cél: közösségi hangulat. Nincs külön interakció.

Elemek:

- Faker.js user lista (név, avatar, “kedvenc album”)
- Grid kártyák, hover funkció (album oldal / lejátszás)

#### Footer

Cél: lezárás, navigáció + információ.

Elemek:

- Linkek (Albums, Reviews, Admin)
- Social ikonok (lucide-react)

---

### Album lista oldal

Cél: SSR render az aktuális albumok alapján. Szűrés műfajra. Egyszerre 20 album jelenjen meg, lapozással.

Elemek:

- borító, cím, előadó, dalok száma, teljes időtartam, leírás
- Az egyes albumok az adott album oldalára navigálnak

Egyéb:

- `GET /api/albums` → faker generált adatok build előtt (100 db)
- Az album adatszerkezet (JSON) kialakítása a te feladatod, hogy az oldal minden részével együtt tudjon működni.

---

### Album oldal

Cél: ISR render, naponta frissül

Elemek:

- header
- album kép, cím, előadó
- leírás
- tracklista
- idézet
- Zenelejátszó komponens
- Rövid kritika infó (Szerző, értékelés (⭐️), rövid összefoglaló) és “További részletek” link a kritikára (az album id megegyezik a kritika id-vel)
- footer

Zenelejátszó komponens:

- Kis lejátszó UI (<AudioPlayer> komponens) — nem kell valódi hang, csak dummy progress bar animáció.
- Album oldalon jelenjen meg, de a lejátszás állapota globálisan legyen kezelve Redux-ban.
- UseState / UseEffect
- Start / Stop / Előző / Következő gombok, idővonal.
- Hangerő szabályzó
- Adott szám kijelzése

### Kritika lista oldal

Cél: SSR render az elérhető kritikák alapján. Egyszerre 20 kritika jelenjen meg lapozással.

Elemek:

- Szerző, értékelés (⭐️), rövid összefoglaló
- Az egyes kritikák az adott kritika oldalra navigálnak

Egyéb:

- `GET /api/reviews` → faker generált adatok build előtt a kritikákhoz (100 db)
- Az kritika adatszerkezet (JSON) kialakítása a te feladatod, hogy az oldal minden részével együtt tudjon működni.

---

### Kritika oldal

Cél: ISR render, naponta frissül. Légy kreatív! Ez az az oldal, ahol megmutathatod a designer tudásod.

Elemek:

- header
- kritika cím, szerző, időpont, értékelés (⭐️)
- album és zenelejátszó komponens
- kritika szövege
- tracklista
- footer

---

## Admin felület

Belépés logika:

- Header “Log in” gomb
- Redux store-ban tárolja a felhasználó adatokat (lehet beégetett)
- Ha be van jelentkezve → `/dashboard` elérhető
- Ha nincs → átirányítás a főoldalra
- A headerben a "Log in" és "Log out" gombok kezelése a redux state alapján
- A "Log out" gomb törli a reduxban tárolt felhasználói adatokat

---

### Dashboard (nyitóoldal)

Elemek:

- 3 statisztikai kártya (Albums / Reviews / Users) (véletlenszerű adatok)
- Albumok táblázat (az api alapján, egyszerre 10 elem lapozással, Szerkesztés/Törlés gombok - nem működnek)
- Kritikák táblázat (az api alapján, egyszerre 10 elem lapozással, Szerkesztés/Törlés gombok - nem működnek)
- Felhasználók táblázat (redux store-ban beégetett 10 felhasználó, Törlés gomb)
- “Új felhasználó” gomb egy sorban a táblázat nevével a jobb oldalon

Felhasználó létrehozás:

- Modál ablak nyitása
- Űrlap elemek: név, email, szerepkör (admin/user), mentés gomb
- Zod validáció
- Redux store frissítése

Felhasználó törlése:

- Modál ablak nyitása, megerősítés
- Redux store frissítése

---

## Bónusz feladatok (extra pontért)

| Téma                            | Leírás                          |
| ------------------------------- | ------------------------------- |
| **Reszponzivitás**              | mobil / tablet optimalizálás    |
| **Dark / light mode beállítás** | állapot mentése localStorage-be |
| **Breadcrumb navigáció**        | az összes oldalon               |
| **Közösségi szekció**           | a kezdő oldalon                 |

---

## Értékelési szempontok

| Kategória                                     | Pont |
| --------------------------------------------- | ---- |
| Projektstruktúra, kód tisztasága              | 20   |
| Next.js ISR / SSR helyes használata           | 15   |
| Tailwind + shadcn UI minőség                  | 15   |
| Redux kezelés (state logika, user management) | 15   |
| Form validáció (Zod)                          | 10   |
| AudioPlayer komponens                         | 10   |
| CRUD működés                                  | 10   |
| Bónusz funkciók (extra)                       | +15  |
