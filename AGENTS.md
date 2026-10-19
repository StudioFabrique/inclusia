# INCLUS-IA Astro

- Astro avec i18n native : routes `/fr/` et `/es/`, dictionnaires JSON et `Astro.currentLocale`.
- Tailwind CSS v4 via le plugin Vite ; ne pas réintroduire le CSS historique ni le changement de langue par fetch/innerHTML.
- Conserver le rendu et le contenu de la landing page approuvée, les interactions et le menu responsive.
- Inter locale ; palette #DD6365, #F3B6BD, #FAE1E2, #202024, #F6F6F6.
- Vidéo en premier, avec lecture et pause/reprise sur un dégradé anthracite ; bloc titre/description/CTA arrondi anthracite sous la vidéo.
- Aucun surtitre ni numéro décoratif. Pas de lien secondaire « Le programme » dans la section projet.
- Chiffres : 2026–2028 ; 50 participants visés ; 1,72 M€ prévisionnels ; 65 % FEDER.
- Garder les trois blocs du programme alignés et aucune bordure au-dessus de la note du calendrier.
- Cinq partenaires, sept associés (dont NASERTIC) et un seul logo institutionnel, configurables dans src/config.ts.
- Après une modification fonctionnelle, exécuter npm run check, npm run build et npm test. Vérifier les changements visuels dans le navigateur.

- Vidéo et bloc hero centrés, largeur maximale 1040 px ; titre limité à 760 px et description à 620 px.
