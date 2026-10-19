# INCLUS-IA

Landing page du projet de coopération transfrontalière INCLUS-IA, consacrée à l’inclusion professionnelle par le numérique et l’intelligence artificielle. Le site est disponible en français et en espagnol.

Le projet utilise **Astro 7.4.0**, **Tailwind CSS 4.3.3** et **TypeScript**. Il génère un site statique, avec des composants partagés et des contenus éditoriaux en JSON.

## Installation et démarrage

Prérequis : **Node.js ≥ 22.22.0** et npm.

Dans le dossier du projet, à côté de `package.json` :

```bash
npm ci
npm run dev
```

Le serveur démarre sur le port **4321** :

- [Version française](http://127.0.0.1:4321/fr/)
- [Version espagnole](http://127.0.0.1:4321/es/)

La route `/` affiche directement la landing page française, sans page de redirection. Les routes `/fr/` et `/es/` restent disponibles. Les modifications des sources sont actualisées automatiquement pendant le développement.

## Commandes

| Commande | Utilité |
| --- | --- |
| `npm ci` | Installer les dépendances à partir du fichier de verrouillage |
| `npm run dev` | Démarrer le serveur de développement |
| `npm run check` | Vérifier les composants Astro et les types TypeScript |
| `npm run build` | Générer le site statique dans `dist/` |
| `npm test` | Vérifier le HTML et les ressources du dernier build |
| `npm run preview` | Servir le dernier build sur le port 4321 |

Les tests nécessitent un build préalable :

```bash
npm run check
npm run build
npm test
```

Pour prévisualiser la version compilée, arrêter le serveur de développement avec `Ctrl+C`, puis lancer `npm run preview` : les deux commandes utilisent le même port.

## Structure du projet

```text
astro.config.mjs             Configuration Astro, i18n et Tailwind
package.json                 Dépendances et commandes npm
src/
  components/                Navbar, hero, sections, footer et lecteur vidéo
  layouts/BaseLayout.astro   Structure HTML, métadonnées et styles
  pages/
    index.astro              Landing page française à la racine
    fr/index.astro           Page française
    es/index.astro           Page espagnole
  i18n/
    index.ts                 Locales et accès aux traductions
    locales/fr.json          Contenus français
    locales/es.json          Contenus espagnols
  config.ts                  URL de l’application, médias et logos
  scripts/interactions.ts    Menu, vidéo, défilement et animations
  styles/global.css          Thème Tailwind et styles responsive
public/
  assets/                    Vidéo, image de secours et police Inter
  favicon/                   Icônes navigateur, Apple et manifeste web
  logos/
    partners/                Logos des cinq partenaires
    associated/              Logos des sept associés
    Logo INCLUSIA.png        Logo du projet
    poctefa.webp             Logo Interreg POCTEFA / Union européenne
tests/site.test.mjs           Vérifications du site compilé
qa/                          Captures de vérification visuelle
design-qa.md                 Notes de vérification
```

## Modifier les textes et les langues

Les contenus sont dans `src/i18n/locales/fr.json` et `src/i18n/locales/es.json`. Modifier les mêmes clés dans les deux fichiers pour garder les traductions cohérentes.

Exemple de contenu à modifier dans le JSON français :

```json
"hero": {
  "title": "Le numérique ouvre les possibles.",
  "text": "Votre texte de présentation"
}
```

Les routes utilisent l’i18n native d’Astro : `/fr/` et `/es/`. Les deux pages partagent `LandingPage.astro`. Les textes sont intégrés au HTML à la compilation et restent lisibles sans JavaScript. Le sélecteur de langue conserve la section courante lorsque JavaScript est actif.

Les coordonnées de contact, l’objet du courriel et les textes du footer se modifient également dans ces JSON. Le bouton de contact ouvre un lien `mailto:` ; aucun serveur d’envoi de courriels n’est configuré.

## Remplacer les logos et les médias

Les chemins sont centralisés dans `src/config.ts` :

| Clé | Ressource |
| --- | --- |
| `brandLogo` | Logo INCLUS-IA dans la navbar et le footer |
| `applicationUrl` | Lien « Accéder à l’application » |
| `videoUrl` | Vidéo locale du hero |
| `posterUrl` | Image de secours de la vidéo |
| `partnerLogos` | Logos des partenaires, dans l’ordre des contenus JSON |
| `associatedLogos` | Logos des associés, dans l’ordre des contenus JSON |
| `institutionalLogo` | Logo Interreg POCTEFA / Union européenne du footer |

Un fichier placé dans `public/` est référencé **sans le préfixe `public`**. Par exemple :

```ts
brandLogo: "/logos/Logo INCLUSIA.png",
institutionalLogo: "/logos/poctefa.webp",
videoUrl: "/assets/INCLUS-IA.mp4",
```

Pour remplacer un logo, remplacer le fichier existant ou modifier son chemin dans la configuration. Respecter les majuscules et les extensions des noms de fichiers.

Les logos des partenaires suivent cet ordre : Gobierno de Navarra, TASUBINSA, Fundación TeReSA, STEP, EL MOLINO.

Les associés suivent cet ordre : CRIC Pyrénées, ADAPEI64, LesPEP64, Cap Emploi Béarn, IA Pau, French Tech Pau Béarn, NASERTIC.

Pour ajouter un partenaire ou un associé, ajouter son contenu dans **les deux JSON** et son chemin au même index dans le tableau de logos correspondant. Une valeur `null` affiche un emplacement provisoire pour ces logos. Si `institutionalLogo` vaut `null`, le logo institutionnel est masqué.

## Favicon

Les icônes du projet sont dans `public/favicon/` et déclarées dans le layout commun `src/layouts/BaseLayout.astro` pour les deux langues : ICO, PNG 16/32 px, icône Apple et manifeste web. Les icônes Android 192/512 px sont référencées dans `public/favicon/site.webmanifest`.

Pour les remplacer, conserver les noms des fichiers ou mettre à jour les chemins du layout et du manifeste. Si l’ancienne icône reste visible, effectuer un rechargement forcé ou rouvrir l’onglet : les navigateurs peuvent conserver les favicons en cache.

## Personnaliser le style et les interactions

Le thème se trouve dans `src/styles/global.css`, avec les couleurs déclarées dans `@theme` :

| Couleur | Valeur |
| --- | --- |
| `brand` | `#DD6365` |
| `blush` | `#F3B6BD` |
| `pale` | `#FAE1E2` |
| `ink` | `#202024` |
| `paper` | `#F6F6F6` |

La police **Inter** est hébergée localement dans `public/assets/InterVariable.woff2`. Sa licence est fournie dans `OFL-Inter.txt`.

Les composants utilisent les classes Tailwind ; les styles partagés utilisent `@apply`. La navbar possède un contenu centré de 1240 px maximum, avec un fond flouté translucide et une bordure pleine largeur au défilement. Les dimensions du hero se règlent avec `.video-frame`, `.hero-intro` et leurs sélecteurs enfants.

La section contact empile l’adresse e-mail et le bouton sur les écrans de 760 px ou moins. Le bouton occupe la largeur disponible ; le titre et les textes peuvent revenir à la ligne sans déborder.

Les interactions sont dans `src/scripts/interactions.ts` : menu mobile, navigation active, défilement fluide, apparitions et lecteur vidéo. La vidéo de fond est muette et en boucle ; le dialogue de lecture propose le son et les contrôles natifs. La préférence système de réduction des animations désactive la lecture automatique, les apparitions et le défilement animé.

## Génération et hébergement

```bash
npm run build
npm run preview
```

Publier le **contenu du dossier `dist/`** sur un hébergement statique. Aucun serveur Node.js ni adaptateur Astro n’est nécessaire pour servir le site généré.

L’hébergement doit servir les fichiers `index.html` des dossiers `/fr/` et `/es/`. Conserver tous les fichiers générés, notamment les dossiers `assets/`, `logos/` et les ressources compilées par Astro.

Les liens et médias utilisent des chemins absolus à la racine du domaine. Pour publier dans un sous-dossier, adapter `base` dans `astro.config.mjs` et les chemins de navigation et de ressources.

## Résoudre les problèmes courants

- **Port 4321 déjà utilisé** : arrêter l’autre serveur ou utiliser `npm run dev -- --port 4322`.
- **Logo absent** : vérifier le fichier dans `public/`, son nom exact et son chemin sans `public` dans `src/config.ts`.
- **Ancien contenu en prévisualisation** : relancer `npm run build`, puis recharger la page ; `preview` sert le build existant.
- **Tests en échec faute de fichiers `dist/`** : exécuter `npm run build` avant `npm test`.
- **Accès au dossier de configuration Astro bloqué dans un environnement automatisé** : utiliser `ASTRO_TELEMETRY_DISABLED=1 npm run build` (ou la même variable avec `dev` et `check`).
