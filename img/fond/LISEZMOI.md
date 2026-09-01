# Le fond d'écran

Une seule image, nommée `fond.jpg`, posée dans ce dossier.

Puis dans `index.html`, décommente la ligne :

```html
<div class="wall" aria-hidden="true">
  <img src="img/fond/fond.jpg" alt="">
</div>
```

Le CSS s'occupe du reste : l'image est désaturée, éclaircie et fondue dans le gris
par un masque ovale, pour qu'elle transparaisse sans écraser les icônes.
Tu peux régler l'intensité dans `css/style.css`, règle `.wall img` :
`opacity` (actuellement `.42`) et le `filter`.

## Quelle image

Dans la référence, le fond d'écran est **le visage du designer**. C'est ce qui fait
tenir l'idée : on regarde son bureau à lui. Un portrait de toi, cadré large,
sur fond clair, fonctionne mieux que n'importe quelle image trouvée.
