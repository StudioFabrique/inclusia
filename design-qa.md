# Vérification de la migration Astro

final result: passed

## Sources de vérité

Dernière version de la page HTML du dossier voisin `inclus-ia`, incluant toutes les annotations acceptées. La demande porte sur une migration technique : aucune nouvelle direction visuelle n'a été introduite.

- Source visual truth : `qa/reference-hero.png`, `qa/reference-program.png`.
- Implementation screenshots : `qa/desktop.png`, `qa/program.png`, `qa/mobile.png`.
- Full-view comparison evidence : `qa/comparison-hero.jpg`.
- Focused comparison evidence : `qa/comparison-program.jpg`, comparaison des titres, grilles, séparateurs et note du calendrier.
- Desktop : viewport CSS 1104 × 847 ; captures source et implémentation de 1089 × 835 pixels, même densité et même navigateur. Pas de redimensionnement entre les fichiers comparés. Les montages sont de 2178 × 835 pixels.
- Mobile : viewport CSS 390 × 844, espagnol.
- États : thème clair, menu fermé ; programme français avec détails fermés pour la comparaison. Les scènes vidéo diffèrent car le même média continue sa lecture, ce qui ne constitue pas un écart visuel de la migration.

## Historique

1. Première compilation : styles Tailwind et contenu prérendu validés. Un avertissement de conflit sur la route `/` a été résolu en laissant la page index gérer explicitement sa redirection plutôt qu'en la dupliquant avec le routage automatique.
2. Comparaison du programme : environ 14 px de hauteur supplémentaire dus au line-height par défaut Tailwind. Correction des années et des titres sur `leading-[normal]`, nouvelle compilation et nouvelle capture.
3. Comparaison finale : même rythme de grille et bord inférieur commun après correction. Les trois bords inférieurs du programme sont à 672,21875 px dans la vue contrôlée. Aucun P0/P1/P2 restant.

## Surfaces de fidélité

- Typographie : Inter variable locale, tailles, graisses et interlignages conservés. Titres et césures comparés dans les captures.
- Espacement : cadre vidéo, bloc arrondi anthracite sous la vidéo, marges des sections, grilles, CTA et responsive repris avec des utilitaires Tailwind et `@apply`.
- Couleurs : #DD6365, #F3B6BD, #FAE1E2, #202024, #F6F6F6 ; mêmes placements, dégradé de commandes et contrastes.
- Images : même vidéo, même affiche de secours, mêmes placeholders ; ressources locales, aucune substitution générée pendant la migration.
- Contenu : JSON FR/ES conservés et intégrés lors du build ; mêmes chiffres, partenaires, calendrier et adresse de contact.

## Contrôles fonctionnels

- `npm run check` : 0 erreur, 0 avertissement, 0 indication.
- `npm run build` : trois pages statiques générées, sans avertissement de route sur la dernière compilation.
- `npm test` : 5 tests réussis (locales prérendues, contenu et commandes, sections sans JS, médias locaux, redirection de l'entrée).
- HTTP 200 sur `/fr/` et `/es/`.
- Sélecteur de langue : navigation vers `/es/` et `/fr/`, titres et contenu traduits ; fragment `#program` conservé.
- Menu mobile : ouverture/fermeture, `aria-expanded`, lien vers l'application visible.
- Vidéo : pause/reprise du fond, ouverture et lecture du dialogue, pause du fond pendant le dialogue et reprise à la fermeture.
- Détails du programme : ouverture vérifiée et bords inférieurs alignés.
- Aucune bordure supérieure sur la note du calendrier.
- Aucun débordement horizontal observé sur ordinateur ou mobile ; deux colonnes de chiffres sur mobile.
- Console : aucun avertissement ni erreur relevé lors des contrôles.

## Limites

Contrôles effectués dans le navigateur intégré, sans matrice complète Safari/Firefox. La préférence de mouvement réduit est conservée dans le code ; pas de simulation OS pendant cette migration. L'accès authentifié à l'application externe n'a pas été testé, seul son lien a été conservé.


## Intégration des logos fournis

final result: passed

Les chemins de cinq partenaires et sept associés sont renseignés dans src/config.ts à partir de public/logos/. NASERTIC est présent dans les deux locales. Les douze images sont chargées dans le navigateur (complete et naturalWidth vérifiés), sans débordement horizontal observé. Capture : qa/logos.png. Vérifications Astro/TypeScript, build et tests existants réussis.


## Largeur du hero — 19 octobre 2026

Vidéo et bloc anthracite centrés à 1040 px maximum ; titre limité à 760 px et description à 620 px. Vérification navigateur à 1280 px et 390 px : aucun débordement horizontal, commandes vidéo dans le cadre. Captures : `qa/hero-narrow-desktop.png` et `qa/hero-narrow-mobile.png`. Astro check : 0 erreur, 0 avertissement ; build et test réussis.


## Logo et navbar — 19 octobre 2026

Logo fourni intégré à la navbar et au pied de page. Navbar centrée et limitée à 1240 px (mesuré dans un viewport de 1440 px), logo responsive à 160 / 130 / 110 px. Aucun débordement horizontal à 390 px. Astro check sans diagnostic ; build et test réussis. Capture : `qa/navbar-logo.png`.


## Défilement et navbar verre — 19 octobre 2026

Header extérieur pleine largeur, contenu intérieur limité à 1240 px. Après défilement : fond à 70 %, flou 20 px, saturation 150 % et trait inférieur sur toute la largeur. Molette adoucie avec requestAnimationFrame, sans interception du tactile, du clavier, des zones défilantes internes ni du dialogue vidéo ; réduction des animations respectée. Vérifié à 1440 px : header de 1425 px (hors scrollbar) et contenu de 1240 px. Navigation vers le programme positionnée à 105 px sous le haut de fenêtre. Menu mobile ouverture/fermeture fonctionnel, aucun débordement à 390 px. Astro check sans diagnostic, build et test réussis. Capture : `qa/navbar-glass.png`.


## Logo Interreg POCTEFA — 19 octobre 2026

Logo fourni `public/logos/poctefa.webp` intégré au footer FR/ES via institutionalLogo, largeur 300 px maximum et proportions conservées, sans bordure. Vérification visuelle ordinateur/mobile, image chargée, aucun débordement à 390 px. Check Astro, compilation et test réussis. Capture : `qa/footer-poctefa.png`.
