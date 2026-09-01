# Les vignettes des icônes

Une image par projet. Format conseillé : **carré, 256 × 256 px**, JPG ou PNG.
Elles sont affichées à 46 px de côté, donc inutile de partir d'un fichier énorme.

## Comment en câbler une

Dans `index.html`, trouve l'icône concernée :

```html
<button class="ic" style="--x:23%; --y:17%; --c:#C9D3E8">
  <span class="ic__tile"></span><span class="ic__label">Odysseus</span></button>
```

Et glisse une `<img>` dans la vignette :

```html
<button class="ic" style="--x:23%; --y:17%">
  <span class="ic__tile"><img src="img/icones/odysseus.jpg" alt=""></span>
  <span class="ic__label">Odysseus</span></button>
```

L'attribut `--c` devient inutile dès qu'il y a une image : il ne sert que de
couleur de secours pour que le bureau ne soit pas vide en attendant.

## Positionner une icône

`--x` et `--y` sont des pourcentages de la largeur et de la hauteur de l'écran.
Le plus simple : lance le site, **déplace les icônes à la souris** jusqu'à ce que
la composition te plaise, puis relève les valeurs dans l'inspecteur du navigateur
et recopie-les dans le HTML. Les déplacements ne sont pas encore sauvegardés.

## Si tu les fais toi-même

Vingt vignettes, c'est long. Deux raccourcis honnêtes :
- une capture d'écran de chaque projet, recadrée en carré ;
- une pastille unie avec une lettre ou un pictogramme, faite dans Illustrator.

Les deux valent mieux que des images empruntées : ici, chaque vignette est censée
montrer **ton** travail.
