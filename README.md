# Web Crafter

<p align="center">
  <img src="./frontend/src/assets/logo.svg" width="350" />
  <h1>An extensible lowcode website builder</h1>
</p>

## What is Web Crafter?
Web Crafter is a low-code desktop website building platform aimed to help people who don't know website programming to build their website by drag and drop.


## Tech stacks
The main Tech stacks we are using in this project are listed below:
  - craft.js: An opensource framework for building web builder application
  - material UI: Styling library used for both styling the application and widget in the application
  - Vite: light-weighted frontend react CLI
  - .net: backend framework
  - MongoDB: database used for saving user's website
  - JWT: token based authentication
  - Axios: HTTP client for making API calls
  - Jest: testing framework designed to ensure the correctness of any JavaScript codebase
  - Swagger: Dashboard for managing / testing backend APIs

## Basic & advanced features for this project
project features:
  - [x] Login with Google authentication
  - [x] Provide basic widgets for users to build the website
  - [x] Provide a flexible drag-and-drop feature for people to add and modify the widget for their webpage in canvas
  - [x] Styles and properties of widgets can be modified easily from the settings panel
  - [x] Modifiable and customizable switch/button/chip for multiple usage.
  - [x] support event for some of the widgets (e.g: support on click event on Button)

basic features:
  - Frontend:
    - [x] React using TypeScript
    - [x] Use MaterialUI as the major styling library
    - [x] react-router for routing
    - [x] responsive UI for desktop (NOTE: since Web Crafter is designed for users to design their websites for desktop usage, it is not recommended and not reasonable to make the website responsive for mobile devices, as the screen of the mobile will be too small for users to design their website)  
  - Backend
    - [x] .net as backend
    - [x] EFCore for handling database queries
    - [x] uses NOSQL as the database
    - [x] basic CURD for the user's website

Advanced features:
  - [x] Redux toolkit for state management
  - [x] Containerize the project using Docker
  - [x] Unit testing components
  - [ ] E2E testing with cypress

## structure of Project
Frontend:
```
├── Dockerfile                       # for building up docker image of frontent
├── compose.yaml                     # compose file for starting up a container of frontent
├── package.json                    # for managing dependencies
├── vite.config.ts                  # vite configuration file
├── src/                            # contains source code
│   ├── main.tsx                    # entry of the frontend website
│   ├── assets/                     # contains static assets
│   ├── api/                       # contains HTTP requests for CRUD of user's website
│   ├── models/                    # contains Typescript models of frontend
│   ├── store/                      # for redux state management files
│   └── pages/                      # contains pages
|       └── CraftPage/             # contain pages for website crafting page
|       └── Homepage/             # contain pages for homepage of website
└──
```
Backend:
```
├── Program.cs                       # Main entry point for the application
├── appsettings.json                 # Configuration settings for the application
├── Dockerfile                       # for building up docker image of backend
├── compose.yaml                     # compose file for starting up a container of backend
├── Controllers/                     # handle incoming HTTP requests and return responses
│   └── [Controller files]           # e.g., HomeController.cs, AccountController.cs
├── Context/                         # Database context files
│   └── [DB context files]           # e.g., ApplicationDbContext.cs
├── Models/                          # Data models
│   └── [Model files]                # e.g., User.cs, Product.cs
├── Services/                        # Services for API logic
│   └── [Service files]              # e.g., UserService.cs, EmailService.cs
└──
```


## Running Project

Running Locally:

  1. Set up the .net environment, and make sure MongoDB is installed on the computer.

  2. run the project:
    - cd to `frontend` folder. Run the command below to start the frontend
    ```bash
    npm install 
    npm run dev
    ```

    - then cd to `backend` folder, run the command below to start the backend
    ```bash
    dotnet build
    dotnet run
    ```
  
  3. open `localhost:5173` in the browser (preferably google chrome)

Running through docker:

Please refer to `README.Docker.md` in both `backend` and `frontend` folder for more details.

## Tests

Run `npm test` in the project root to execute the unit tests via [Jest](https://jestjs.io).
