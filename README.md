# Kart Change Manager

Kart Change Manager est une application web qui permet de gérer l'état des karts dans différentes files d'attente et de course.

## Prérequis

* Docker et Docker Compose installés sur votre machine.

## Installation et Démarrage

1.  **Clonez le dépôt :**

    ```bash
    git clone <URL_DU_DEPOT>
    cd Kart-Change-Manager
    ```

2.  **Lancez les conteneurs avec Docker Compose :**

    ```bash
    docker-compose up --build
    ```

    Cette commande va construire les images Docker et démarrer les conteneurs pour le backend et le frontend.

3.  **Accédez à l'application :**

    Ouvrez votre navigateur web et accédez à `http://localhost:3000`.

## Utilisation

1.  **Connexion :**

    * Entrez le mot de passe par défaut `HXM` pour vous connecter.

2.  **Écran principal :**

    * Vous verrez quatre files de course (`Lane 1`, `Lane 2`, `Lane 3`, `Lane 4`) et une file d'attente (`Waiting`).
    * Les karts sont affichés avec leur numéro et leur couleur de performance.
    * Cliquez sur un kart dans une file de course pour le supprimer.
    * Cliquez sur un kart dans la file d'attente pour le déplacer vers une file de course.
    * Cliquez sur le bouton + à droite de chaque file pour ajouter un kart à celle-ci
    * Une table en dessous donne les etat de chaque kart, ainsi qu'un point d'exclamation si le kart est dans une file

3.  **Écran de paramètres :**

    * Cliquez sur le bouton `Settings` pour accéder aux paramètres.
    * Modifiez le mot de passe, le nombre de karts et les couleurs des files.
    * Cliquez sur `Save` pour enregistrer les modifications.

4.  **Gestion des karts :**

    * Dans la table des karts, cliquez sur un kart pour modifier sa performance.
    * Cliquez sur IN pour ajouter le kart dans la file Waiting

## Manuel Utilisateur

* **Ajouter un kart :** Cliquez sur le bouton `+` à droite de chaque file de course pour ajouter un kart. Un popup apparaîtra pour choisir la performance du kart.
* **Déplacer un kart :** Cliquez sur un kart dans la file d'attente pour le déplacer vers une file de course. Un popup apparaîtra avec les options de files de course.
* **Modifier la performance d'un kart :** Cliquez sur un kart dans la table des karts pour modifier sa performance. Un popup apparaîtra pour choisir la nouvelle performance.
* **Supprimer un kart :** Cliquez sur un kart dans une file de course pour le supprimer.

## Configuration de l'environnement

* Le backend écoute sur le port 5089.
* Le frontend est accessible sur le port 3000.
* Le mot de passe par défaut est `HXM` et peut être modifié dans les paramètres de l'application.

## Technologies utilisées

* **Frontend :** React, Socket.io-client, Axios, Styled-components
* **Backend :** Node.js, Express, Socket.io, Cors, Dotenv
* **Conteneurisation :** Docker, Docker Compose
