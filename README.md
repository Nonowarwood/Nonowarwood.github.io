# Portfolio v2 — Noah Guerbois

Site statique. Pas de build, pas de dépendances : tu ouvres `index.html` et ça marche.

## Structure

```
index.html          contenu et structure
css/style.css       tout le style (commenté par sections)
js/main.js          horloge, sélecteur de vue, apparitions
img/projets/        ← tes visuels de projets
img/cutouts/        ← objets détourés en PNG transparent
inspiration/        les 22 références Pinterest (ne pas publier)
```

## Le concept

La page traverse quatre pièces qui changent de température, au lieu de défiler d'un bloc :

1. **Hero** — fond crème, nom en très grand, annotations en marge.
2. **Rafraîchissant** — plein écran cobalt, d'après la référence 09 (l'affiche à la tomate).
   Section collante : la tomate grossit et pivote, le mot dérive, les encadrés entrent
   par les côtés au fil du défilement.
3. **Le tiroir** — fond sable, dossiers cartonnés d'après la référence 14. Cliquer sur
   un dossier filtre les travaux par catégorie.
4. **Travaux / Outils / À propos** — retour au crème, puis pied noir avec le ticket de caisse.

Le reste vient des références 01, 16 et 21 : barre de menu façon macOS, poignées de
sélection bleues au survol, dock de logiciels, contact en ticket.

### Aucune image dans tout ça

La tomate est un SVG dessiné à la main, les dossiers et l'étoile sont en CSS, la texture
papier est un filtre de bruit SVG en ligne. Le rendu tramé vient d'un masque en grille de
points (classe `.halftone`) — applique-le à **n'importe quelle photo** et elle prend le même
traitement d'impression.

### La mise en scène

`js/main.js` écrit une variable `--p` (de 0 à 1) sur chaque section marquée `data-stage`,
selon sa progression dans l'écran. Le CSS s'en sert pour animer. Pour ajouter un effet :

```css
.mon-element{ transform: translateY(calc(var(--p) * -80px)); }
```

## Pour lancer en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

(Ouvrir le fichier directement marche aussi, mais un serveur évite les surprises.)

## Ce qu'il reste à remplir

- [ ] `[À REMPLIR]` dans la section À propos — le texte sur toi
- [ ] Les liens du ticket de contact : YouTube, Instagram, GitHub
- [ ] Les 6 projets : titres, années, et surtout les visuels
- [ ] Le portrait
- [ ] Ajuster les pourcentages de compétences (ils sont inventés)

## Remplacer une vignette par une vraie image

Chaque projet contient ce bloc :

```html
<div class="thumb r-4x5"><span>IMG</span></div>
```

Remplace-le par :

```html
<div class="thumb r-4x5"><img src="img/projets/showreel.jpg" alt="Showreel 2025"></div>
```

Les classes de ratio disponibles : `r-1x1`, `r-4x5`, `r-16x9`.
En vue Grille tout est ramené au 4:5 pour que la grille reste nette.

## Ajouter un projet

Copie un bloc `<article class="card">`, change le numéro `idx`, le titre, la légende.
L'attribut `data-cat` doit valoir `Motion`, `Montage`, `Graphisme` ou `Web` —
c'est lui qui relie le projet à son dossier.

## Ajouter des objets détourés

C'est le cœur de l'esthétique des références (04, 05, 22) : des objets photographiés,
détourés, posés sur le fond crème. Mets tes PNG dans `img/cutouts/`.

Le plus juste ici, c'est de **photographier tes propres objets** — c'est littéralement le
sujet de la référence 22 (« les choses qui s'accumulent au fond des tiroirs »). Fond uni,
lumière de fenêtre, détourage, et tu as des assets qui n'appartiennent qu'à toi.
Les images du dossier `inspiration/` sont le travail d'autres graphistes : elles restent
en local, elles sont exclues du dépôt par `.gitignore`, et elles n'ont rien à faire en ligne.
