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

La page traverse cinq pièces qui changent de température :

1. **Accueil** — plein écran cobalt, la tomate tramée, le mot en script qui dérive
   au défilement. C'est la landing page.
2. **Le tiroir** — fond sable, dossiers cartonnés. Cliquer un dossier filtre le classeur.
3. **Le classeur** — sommaire numéroté, lignes fantômes et ligne active en bleu plein.
4. **La fenêtre** — le projet ouvert : visuel encadré, description, fiche technique.
5. **Outils / À propos**, puis le pied noir avec le ticket de caisse.

Le tiroir trie, le classeur liste, la fenêtre montre. Cliquer une ligne du classeur
change la fenêtre sans recharger la page.

### Aucune image tierce

La tomate est un SVG dessiné à la main, les dossiers et l'étoile sont en CSS, la
texture papier est un filtre de bruit SVG en ligne. Le rendu tramé vient d'un masque
en grille de points (classe `.halftone`) : applique-le à **n'importe quelle photo**
et elle prend le même traitement d'impression.

Pour mettre ta propre tomate, dans `index.html`, remplace le bloc `<svg>` de
`.landing__object` par `<img src="img/cutouts/tomate.png" alt="">`. La classe
`.halftone` fait le reste.

### La mise en scène

`js/main.js` écrit une variable `--p` (de 0 à 1) sur chaque section marquée
`data-stage`, selon sa progression dans l'écran. Le CSS s'en sert pour animer :

```css
.mon-element{ transform: translateY(calc(var(--p) * -80px)); }
```

## Ajouter un projet

Copie un `<li>` du `#catalog`. Tout tient dans les attributs `data-` du bouton :

```html
<button class="row" data-cat="Web"
        data-title="Mon projet" data-type="Site web" data-tool="HTML, CSS"
        data-year="2026" data-link="https://..." data-img="img/projets/truc.jpg"
        data-desc="Une ou deux phrases.">
  <span class="row__n">07</span><span class="row__t">Mon projet</span><span class="row__c">Web</span>
</button>
```

`data-cat` doit valoir `Motion`, `Montage`, `Graphisme` ou `Web` — c'est ce qui relie
le projet à son dossier. `data-img` et `data-link` sont facultatifs : sans eux, la
fenêtre affiche un cadre vide et masque le bouton.

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

## Ajouter des objets détourés

C'est le cœur de l'esthétique des références (04, 05, 22) : des objets photographiés,
détourés, posés sur le fond crème. Mets tes PNG dans `img/cutouts/`.

Le plus juste ici, c'est de **photographier tes propres objets** — c'est littéralement le
sujet de la référence 22 (« les choses qui s'accumulent au fond des tiroirs »). Fond uni,
lumière de fenêtre, détourage, et tu as des assets qui n'appartiennent qu'à toi.
Les images du dossier `inspiration/` sont le travail d'autres graphistes : elles restent
en local, elles sont exclues du dépôt par `.gitignore`, et elles n'ont rien à faire en ligne.
