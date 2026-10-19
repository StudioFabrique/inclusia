# INCLUS-IA — Astro + Tailwind CSS

Migration de la landing page validée vers **Astro 7.4.0**, **Tailwind CSS 4.3.3** et TypeScript. Les composants, textes, couleurs, polices, médias et interactions reprennent la dernière version de la page HTML.

## Démarrer

Prérequis : Node.js **22.22 ou plus récent** (vérifié avec Node 24).

```bash
npm ci
npm run dev
```

Ouvrir [la version française](http://127.0.0.1:4321/fr/) ou [la version espagnole](http://127.0.0.1:4321/es/).

```bash
npm run check   # Vérification Astro et TypeScript
npm run build   # Génération statique dans dist/
npm test        # Tests sur le résultat du build
npm run preview # Prévisualisation du build
```

En environnement automatisé sans accès au dossier de configuration personnel, préfixer les commandes Astro par `ASTRO_TELEMETRY_DISABLED=1`.

## Locales et traductions

Le routage utilise l'i18n native d'Astro : `locales: ['fr', 'es']`, français par défaut et préfixe pour chaque locale.

- `/fr/` : page française.
- `/es/` : page espagnole.
- `/` : redirection vers `/fr/` (page de redirection statique après compilation).
- Les anciens paramètres `?lang=fr` / `?lang=es` sont remplacés par les routes de locale.

Les pages `src/pages/fr/index.astro` et `src/pages/es/index.astro` utilisent le même composant `LandingPage.astro`. Celui-ci choisit la traduction avec `Astro.currentLocale`. Les liens de langue sont générés avec `getRelativeLocaleUrl()` de `astro:i18n`.

Les textes restent éditables en JSON dans :

- `src/i18n/locales/fr.json`
- `src/i18n/locales/es.json`

Les traductions sont intégrées au HTML lors de la compilation : aucun chargement JSON côté navigateur, aucun remplacement du texte avec `innerHTML`, aucune dépendance à JavaScript pour lire la page. Les liens de langue fonctionnent sans JavaScript ; lorsqu'il est actif, la section courante (`#program`, etc.) est conservée lors d'un changement de langue.

## Structure

```text
astro.config.mjs          Configuration Astro, locales, plugin Vite Tailwind
src/
  components/            Sections et composants réutilisables
  layouts/BaseLayout.astro  Métadonnées, langue HTML, alternates, styles
  pages/fr/index.astro   Route française
  pages/es/index.astro   Route espagnole
  pages/index.astro      Redirection de l'entrée
  i18n/locales/          Dictionnaires JSON
  scripts/interactions.ts  Menu, vidéo, animations et navigation active
  styles/global.css     Thème Tailwind, styles partagés et responsive
  config.ts             URL application et chemins des médias/logos
public/assets/           Vidéo, affiche de secours, Inter et licence
tests/                  Tests du build statique
```

## Styles et charte

Tailwind est branché via `@tailwindcss/vite`, avec `@import "tailwindcss"`. Les classes utilitaires sont utilisées dans les composants et les styles communs sont factorisés avec `@apply`. Le fichier CSS historique n'est pas chargé.

Les couleurs et le rayon des blocs sont déclarés dans `@theme` :

- `brand` : `#DD6365`
- `blush` : `#F3B6BD`
- `pale` : `#FAE1E2`
- `ink` : `#202024`
- `paper` : `#F6F6F6`

Inter variable est embarquée localement dans `public/assets/InterVariable.woff2`, avec sa licence `OFL-Inter.txt`. Les seuils responsive de la page précédente sont conservés : 1100 px pour le menu compact, 760 px pour la disposition mobile.

## Vidéo et interactions

La vidéo locale est conservée dans `public/assets/INCLUS-IA.mp4`.

- Fond vidéo muet, en boucle, sans recadrage.
- Boutons de lecture et pause/reprise dans le cadre, sur un dégradé anthracite.
- Titre et description dans le bloc arrondi anthracite sous la vidéo ; CTA dans le cadre vidéo.
- Vidéo et bloc hero centrés et limités à 1040 px, titre à 760 px et description à 620 px, avec des marges adaptées au mobile.
- Lecteur avec son et contrôles natifs dans un dialogue accessible au clavier.
- La vidéo de fond s'arrête pendant la lecture dans le dialogue et reprend ensuite si elle jouait auparavant.
- La préférence de mouvement réduit désactive la lecture automatique et les apparitions animées.

Sans JavaScript, tout le contenu et les liens restent disponibles ; le menu interactif et les commandes vidéo enrichies nécessitent JavaScript.

Le contenu de la navbar est centré avec une largeur maximale de 1240 px. Son fond translucide flouté et sa bordure au défilement couvrent toute la page. Le défilement à la molette et les liens d’ancrage sont fluides ; la préférence de réduction des animations est respectée. Le tactile et le clavier conservent leur comportement natif.

## Logos et liens

Modifier `src/config.ts` :

- `brandLogo` : `/logos/Logo INCLUSIA.png`, utilisé dans la navbar et le pied de page.
- `applicationUrl` : `https://fnp.lxp.andria.ovh/`.
- `partnerLogos` : cinq chemins, dans l'ordre Gobierno de Navarra, TASUBINSA, Fundación TeReSA, STEP, EL MOLINO.
- `associatedLogos` : sept chemins, dans l'ordre CRIC Pyrénées, ADAPEI64, LesPEP64, Cap Emploi Béarn, IA Pau, French Tech Pau Béarn, NASERTIC.
- `institutionalLogo` : un seul logo combiné Interreg POCTEFA / Union européenne.

Placer les fichiers dans `public/assets/` et utiliser des chemins commençant par `/assets/`. Une valeur `null` conserve l'emplacement traduit.

Le contact reste un lien de messagerie, sans envoi serveur. Les coordonnées et l'objet traduit se modifient dans les JSON.

## Déploiement

Après `npm run build`, servir le dossier `dist/` avec un hébergement statique. Aucun adaptateur serveur n'est requis. Les liens de routes utilisent `/fr/` et `/es/` avec une barre oblique finale ; l'hébergement doit servir leurs fichiers `index.html`.

Les ressources utilisent des chemins à la racine (`/assets/`), pour un déploiement à la racine d'un domaine. Pour un hébergement dans un sous-dossier, adapter la configuration `base` et la génération des chemins des médias.

Aucune publication distante n'a été effectuée. La version HTML précédente est conservée dans le dossier voisin `inclus-ia/`.

## Références techniques

- [i18n Astro](https://docs.astro.build/en/guides/internationalization/)
- [Tailwind avec Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)

## Logos ajoutés

Les fichiers fournis sont dans `public/logos/partners/` et `public/logos/associated/`. Les chemins correspondants sont déjà renseignés dans `src/config.ts`, sans le préfixe `public` (exemple : `/logos/partners/step.png`). NASERTIC est inclus dans les associés français et espagnols. Le logo institutionnel Interreg POCTEFA / Union européenne est intégré depuis `/logos/poctefa.webp`.
