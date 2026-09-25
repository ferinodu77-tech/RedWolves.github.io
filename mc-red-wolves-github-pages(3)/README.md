# MC Red Wolves — site officiel

Maquette statique prête pour GitHub Pages.

## Structure

- `index.html` — contenu et structure
- `style.css` — design responsive
- `script.js` — navigation, modales et formulaire
- `.nojekyll` — publication directe des fichiers statiques
- `.github/workflows/deploy.yml` — déploiement automatique via GitHub Pages

## Installation sur GitHub

1. Crée un nouveau dépôt, par exemple `mc-red-wolves`.
2. Envoie tous les fichiers de ce dossier dans la branche `main`.
3. Dans **Settings → Pages**, choisis **GitHub Actions** comme source si tu utilises le workflow fourni.
4. Le workflow publiera automatiquement le site après un push sur `main`.

Le site ne nécessite aucun serveur PHP ou base de données.

## Personnalisation

### Email
Dans `script.js`, remplace :
`contact@mc-red-wolves.fr`
par l'adresse réelle du club.

### Sorties
Les sorties sont dans `index.html`, dans la section `#sorties`.

### Photos
Tu peux remplacer les tuiles de la galerie par des `<img>` pointant vers tes photos, idéalement dans un dossier `assets/`.

### Logo
Le cercle `RW` est un logo provisoire en HTML/CSS. Tu peux le remplacer par le vrai logo du MC quand tu l'auras.

## Important

Ne publie pas de données personnelles sensibles dans un dépôt public.
