# Tracker de disponibilité de chaussures Nike :runner:

Ce script JS permet de vérifier la disponibilité d'une paire de chaussures sur le site Nike. (Web scrapping)

Il existe, sur certains sites ecommerces, des boutons qui permettent de notifier un utilisateur lorsque l'article sera de nouveau disponible. Or, il n'existe pas sur le site Nike. C'est donc pour cela que j'ai créé cet outil.

J'utilise la bibliothèque [Puppeteer](https://github.com/puppeteer/puppeteer) qui permet de lancer un navigateur sans affichage (headless) et d'effectuer des actions à l'intérieur.

Lorsque les chaussures sont disponibles, je reçois un message d'un bot qui utilise l'[API de Telegram](https://core.telegram.org/bots/api). Le script prend en capture d'écran l'affichage de la page et fait un appel à l'API pour envoyer l'image.
![Screenshot](https://github.com/mathiz11/nike-shoes-bot/blob/main/images/screenshot_result.jpg?raw=true)

Vous pouvez également programmer le script pour qu'il se lance régulièrement. (Crontab sur un VPS) :wink:

## Technologies utilisées

- JavaScript
- Puppeteer
- Telegram API

## Prérequis

- NodeJS

## Installation

```bash
npm i
```

## Fonctionnement

- Compléter le fichier `.env` avec vos informations

```bash
npm start
```
