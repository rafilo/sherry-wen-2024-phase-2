# Web Crafter

<p align="center">
  <img src="./frontend/src/assets/logo.svg" width="350" />
  <h1>An extensible lowcode website builder</h1>
</p>

## What is Web Crafter?
Web Crafter is a low-code desktop website building platform aimed to help people who don't know website programming to build their website by drag and drop.

---

## ✨ One thing that I'm proud of the project
  - it takes the advantage of using already existing website building library for react `craft.js`!

---

## Tech stacks
The main Tech stacks we are using in this project are listed below:
  - craft.js: An opensource framework for building web builder application
  - material UI: Styling library used for both styling the application and widget in the application
  - Vite: light-weighted frontend react CLI
  - .net: backend framework
  - MongoDB Cloud: database used for saving user's website
  - JWT: token based authentication
  - Vitest: testing framework designed to ensure the correctness of any JavaScript codebase for vite
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
  - Backend:
    - [x] .net as backend
    - [x] EFCore for handling database queries
    - [x] uses NOSQL as the database
    - [x] basic CURD for the user's website

Advanced features:
  - [x] Redux toolkit for state management
  - [x] Containerize the project using Docker
  - [x] Unit testing components
  - [x] E2E testing with cypress

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
├── Program.cs                       # Main entry point for .net backend
├── appsettings.json                 # Configuration settings for .net backend
├── Dockerfile                       # for building up docker image of backend
├── compose.yaml                     # compose file for starting up a container of backend
├── Controllers/                     # handle incoming HTTP requests and return responses
│   └── [Controller files]           # e.g., UserInfoController.cs
├── Models/                          # Data models and Database context files
│   └── [Model files]                # e.g., UserInfo.cs, UserInfoContext.cs
├── Services/                        # Services for API logic
│   └── [Service files]              # e.g., UserService.cs
├── Properties/                      # settings for .net backend
│   └── launchSettings.json
└──
```


## Running Project

- Running Locally:

  1. Set up the .net environment, and make sure MongoDB is installed on the computer.

  2. run the project:
     
    cd to `frontend` folder. open a terminal, run the command below to start the frontend
    ```
    npm install 
    npm run dev
    ```
    
    then cd to `backend` folder, open another terminal, run the command below to start the backend
    
    ```
    dotnet build
    dotnet run
    ```
  
  4. open `localhost:5173` in the browser (preferably Google Chrome)

- Running through docker:

  1. Please refer to `README.Docker.md` in both `backend` and `frontend` folder for more details to setup the image and the containers.
  2. after setup, visit `localhost:5173` in the browser (preferably Google Chrome)

## Tests

Run `npm run test` in the project root to execute the unit tests via [vitest](https://vitest.dev).

Run `npx cypress open` to open cypress for E2E test
