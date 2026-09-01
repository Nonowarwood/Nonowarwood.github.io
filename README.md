# Portfolio — Noah Guerbois

Construit **écran par écran**. Site statique, aucune dépendance, aucun build.

| Écran | État |
|---|---|
| 01 — Le bureau | en place |
| 02 — La fenêtre d'un projet | à venir |

## Lancer en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Écran 01 — Le bureau

Fond d'écran délavé, icônes éparpillées avec leur libellé, dock en bas.
Les icônes se **sélectionnent** au clic et se **déplacent** à la souris ou au doigt.

Tout ce qui reste à fournir est du visuel, et c'est documenté sur place :

- `img/fond/LISEZMOI.md` — le fond d'écran
- `img/icones/LISEZMOI.md` — les vignettes des projets

En attendant, chaque icône affiche une pastille de couleur (`--c`) et le fond
une silhouette floue. Le site est présentable en l'état, il n'attend que tes images.

## Structure

```
index.html        les 20 icônes et le dock
css/style.css     tout le style, commenté
js/main.js        sélection et déplacement
img/fond/         le fond d'écran
img/icones/       les vignettes
inspiration/      les références (hors dépôt, voir .gitignore)
```

## Note sur les images

Le dossier `inspiration/` est exclu du dépôt : ce sont les travaux d'autres
graphistes, ils servent de référence et n'ont pas à être publiés.
Tout ce qui est en ligne ici est soit dessiné en CSS, soit à toi.

## Historique

Les versions précédentes (accueil à la tomate, tiroir à dossiers, classeur)
sont dans l'historique git. `git log` pour les retrouver, elles ne sont pas perdues.
