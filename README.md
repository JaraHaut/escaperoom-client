# EscapeRoom

EscapeRoom is an online platform where the tenants can share their experiences about renting or viewing a property. This social-oriented app aims to have an impact in the rental market by adding transparency and bringing accountability to landlords and letting agents. This app constitutes the Capstone Project for the Software Engineering Bootcamp at BrainStation and it is conceived to showcase the key tools, languages and skills acquired during this intensive program.

Renting a property in highly competitive markets such as London has become an extreme sport. Tenants usually are the weakest part of this deal, risking their deposit and their rights to a safe home, while the landlords and agencies speculate with property values with very little accountability. This app brings back some leverage to the tenants so they can rate the experience of renting certain properties with certain landlords and agencies. This will bring transparency and balance to an unregulated and unfair market.

Anyone, tenants, agencies and landlords can use this platform. Tenants can create and publish a property in order to reflect their personal opinions. Also, agencies and landlords can do the same to use it as an advert for their property. They can also give feedback about certain opinions published on their properties. This will attract "ethical" rentals, which will see their value increased by the positive opinions of past/present tenants.

Technologies used in this project:

- React.js
- CSS & Sass
- HTML & JSX
- Firebase for Cloud Storage
- API
- Axios
- Express.js
- Node.js
- MySQL
- Knex

## Screenshots

![screenshots_escaperoom](https://github.com/JaraHaut/escaperoom-client/assets/129460672/73e37857-e39a-44bf-b6fc-fd43f7296807)

## Installation

Follow these steps to run a local instance of EscapeRoom. You'll need node, npm and MySQL already installed.

1. Clone or download this repo:

https://github.com/JaraHaut/escaperoom-client

https://github.com/JaraHaut/escaperoom-server

Set up the backend:

2. Create a new database in MySQL called `escaperoom`.

3. Install server dependencies:

   Run `npm install` from inside the server directory;

   ```
   $ cd escaperoom-server
   $ npm install
   ```

4. Run migrations:

```
$ npm run migrate
```

5. Run seeds:

```
$ npm run seeds
```

6. Set environment variables:

   Rename `.env_example` to `.env` and change the placeholder values with your own:

   ```
   PORT=<PORT_NUMER>
   DB_USER=<YOUR DB USERNAME>
   DB_PASSWORD=<YOUR DB PASSWORD>
   DB_HOST=<HOST ADDRESS>
   DB_NAME=<DB NAME>
   ```

7. Start the server:

```
$ node server.js
$ npm start
```

Set up the frontend

8.  Install client dependencies:
    Run `npm install` from inside the client directory:

    ```
    $ cd escaperoom-client
    $ npm install
    ```

9.  Set environment variables:
    Rename `.env.example` to `.env` and change the placeholder value to the port you set for the server.

        ```
        REACT_APP_API_URL=http://localhost:<PORT SET IN /server/.env>
        ```

10. Start the React app:

    ```
    $ npm start
    ```

## Next Steps

Further development of this project will incorporate the following features:

- Sign up / login functionality (Authentication/Authorisation)
- Rating average formulas applied to the backend so that these can be displayed in multiple pages in the frontend
- Additional buttons: edit & delete properties and reviews
- Implement an external API to show the properties on a map
- Sort lists
- Animations for a better user experience/accessibility
- Add another table to the data base for the users

## Authors

- Jara Haut-Vacas - https://github.com/JaraHaut

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jarahaut/)

## Acknowledgements

- To my incredible teachers and classmates of the BrainStation Bootcamp Cohort June 2023 London.
- To my partner, Luigi, for the huge support during this challenging period of my life.
- To my cats, especially Sombra :-)
