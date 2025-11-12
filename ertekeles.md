# Értékelés

## Értékelési szempontok

| Kategória                                     | Pont | Elért |
|-----------------------------------------------|------|-------|
| Projektstruktúra, kód tisztasága              | 20   | 4     |
| Next.js ISR / SSR helyes használata           | 15   | 5     |
| Tailwind + shadcn UI minőség                  | 15   | 15    |
| Redux kezelés (state logika, user management) | 15   | 10    |
| Form validáció (Zod)                          | 10   | 10    |
| AudioPlayer komponens                         | 10   | 7     |
| CRUD működés                                  | 10   | 10    |
| Bónusz funkciók (extra)                       | +15  | 0     |
| **Összesen**                                  | 110  | 61    |
| Levonások (kritikus hibák)                    |      | -61   |
| **Végeredmény**                               |      | 0     |

## Részletek

### Kritikus hibák

- **_az oldal nem buildelhető_**
    - linter probléma
    - type probléma
- oldal paraméter hibás kezelése
- hibakezelés hiánya api hívásoknál
- hidratációs hiba
- error boundaries hiánya
- az albumok és kritikák újra vannak generálva működés közben
- AI használat

### Hiányzó előírt funkciók, működés

Projektstruktúra, kód tisztasága:

- hiányzó layout routing (app/(public|private)/*)
- felesleges paraméterek (AlbumAudioPlayer)
- hibás szervezés (lejátszó gomb album borítón / track listában / album és kritika oldalon)
- hibás szervezés (Read Full Review gomb)
- hibás szervezés (⭐️ komponens)
- hibás szervezés (lapozó komponens)
- hibás szervezés (track lista komponens)
- hibás szervezés (genre badge)
- hibás szervezés (featured artist komponens)
- kevert kontrollált / nem kontrollált űrlap vezérlés (newsletter)
- konfiguráció hiánya (pl. genres)
- hibás szervezés (api-k elkülönítése)
- hiányzó lapozás (dashboard)
- hibás szervezés (login / logout gomb)

Next.js ISR / SSR helyes használata:

- ISR hiánya az album / kritika oldalon

Redux kezelés:

- hibás szervezés (auth / user store keverése)

AudioPlayer komponens:

- több funkcionális komponensre kellett volna szétszedni

#### Egyéb

- az oldal több ok miatt is nem buildelhető, ezért a végeredmény pontszáma 0.

## Javaslatok

- az AI által generált kód annyira lesz jó, mint te magad. Előbb neked kell a megfelelő szintre fejlődnöd.
- a komponenseknek sokkal kisebbnek kell lennie. Egy komponens egy dologért feleljen -> separation of concerns (SoC).
- az egy nagyobb egységhez tartozó komponenseket szervezd egy mappa alá, ide kerüljenek az esetleges hozzá tartozó konfigurációk is.
- egy okos (vezérlő) komponenshez több buta (csak megjelenítő / view) tartozhat

### Szervezés

Ugyanazt a funkciót érdemes kiszervezni egy külön komponensbe. Ilyen az album/szám lejátszása is.
Jelenleg az AlbumDetails, AlbumHeader, ReviewAlbum, stb. is kliens komponens, mivel mindegyik direkt használja a reduxot.
Egy lejátszó komponens album és track paraméterekkel a megjelenítés pedig a kapott children elemmel
egy csapásra megoldja a problémát.

### Olvasnivaló

- https://nextjs.org/docs/15/app/guides/incremental-static-regeneration
- https://en.wikipedia.org/wiki/Separation_of_concerns
- https://app.daily.dev/