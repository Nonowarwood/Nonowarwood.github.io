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

La métaphore du **bureau / système d'exploitation**, tirée des références 01, 16, 14 et 21 :
barre de menu façon macOS, poignées de sélection bleues au survol des projets,
dock de logiciels, et un contact en forme de ticket de caisse.
Trois façons de regarder les mêmes travaux — **Grille**, **Bureau** (éparpillé), **Liste** —
motif repris des références 02 et 08.

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
En vue Grille tout est ramené au 4:5 pour que la grille reste nette ;
les ratios ne se voient qu'en vue Bureau.

## Ajouter un projet

Copie un bloc `<article class="card">`, change le numéro `idx`, le titre, la légende.
Pour la vue Bureau, donne-lui une position dans l'attribut `style` :
`--x` et `--y` (position en %), `--w` (largeur en %), `--r` (rotation).
Pense à mettre à jour le compteur `(06)` du titre et le `01 — 06` en bas.

## Ajouter des objets détourés

C'est le cœur de l'esthétique des références (04, 05, 22) : des objets photographiés,
détourés, posés sur le fond crème. Mets tes PNG dans `img/cutouts/` et pose-les
en absolu dans le hero. Un objet bien détouré vaut dix effets CSS.
