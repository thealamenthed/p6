# FishEye - Plateforme pour Photographes Indépendants

Bienvenue sur le dépôt du prototype **FishEye**, un site web accessible conçu pour les photographes indépendants afin de présenter leurs meilleurs travaux. Ce projet vise à fournir une solution dynamique et conforme aux normes d'accessibilité, tout en respectant les exigences techniques et les maquettes fournies.

## 🎯 Objectif du Projet

Créer un prototype fonctionnel d'un site web pour **FishEye** :

- Une **page principale** affichant une liste des photographes.
- Une **page dédiée à chaque photographe**, présentant leurs photos et vidéos, générées dynamiquement à partir de données JSON.

Le site doit être entièrement navigable au clavier et accessible aux utilisateurs de lecteurs d'écran.

---

## 🚀 Fonctionnalités

### Pages et Composants

1. **Page principale** :

   - Liste des photographes avec leurs informations de base.
   - Navigation intuitive pour accéder aux pages des photographes.

2. **Page photographe** :

   - Présentation des photos et vidéos du photographe.
   - Gestion dynamique des médias via le **Factory Method Pattern**.
   - Affichage des détails comme le nom, les likes, et autres métadonnées.

3. **Accessibilité** :
   - Compatibilité avec les lecteurs d'écran (par ex. ARIA).
   - Navigation complète via le clavier.
   - Contrôle des erreurs pour une console propre.

### Gestion Dynamique des Données

- Chargement des données JSON pour afficher les informations des photographes et leurs médias.
- Implémentation du **Factory Method** pour différencier les vidéos et les photos.

---

## 📂 Structure du Projet

```plaintext
.
├── index.html               # Page principale listant les photographes
├── photographe.html         # Page individuelle affichant un photographe
├── css/
│   ├── styles.css           # Fichier CSS principal
├── js/
│   ├── api/                 # Gestion des appels aux données (JSON ou API)
│   ├── factories/           # Factory Method pour créer des objets média dynamiques
│   ├── pages/               # Gestion des interactions et du rendu des pages
│   ├── templates/           # Gestion de l'affichage
│   ├── utils/               # Fonctions utilitaires globales
├── data/
│   ├── photographers.json   # Fichier JSON contenant les données des photographes
├── assets/
│   ├── images/              # Photos des photographes
│   ├── icons/               # Icônes et éléments graphiques

```

## 🛠️ Prérequis et Installation

### Prérequis

- Navigateur moderne compatible avec **HTML5**, **CSS3** et **JavaScript ES6+**.
- Visual Studio Code ou un éditeur de texte similaire.
- Serveur local pour tester les fonctionnalités dynamiques (par ex. **Live Server**).

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/thealamenthed/p6.git fisheye
   cd fisheye
   ```
2. Ouvrez le projet dans un éditeur de texte.
3. Lancez un serveur local pour voir le projet en action :

```bash
live-server
```

## 📋 Exigences Techniques

### Conformité aux maquettes

- Le prototype suit strictement les maquettes fournies par l'équipe de design.

### Accessibilité

- Respect des normes **WCAG**.
- Tests avec lecteurs d'écran et navigation au clavier.

### Qualité de code

- Aucune erreur dans la console.
- Utilisation d’un pattern **Factory Method** pour les médias.

---

## 🖼️ Aperçu des Maquettes

https://www.figma.com/design/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?t=a3ny78iD2ipce0Rm-0

### Page principale

- Une page listant les photographes avec navigation vers leurs profils individuels.

### Page photographe

- Une page dédiée pour afficher les travaux de chaque photographe, incluant des photos et vidéos.

---
