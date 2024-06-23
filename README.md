# Web Crafter

<p align="center">
  <img src="./assets/logo.svg" width="350" />
  <h1>An extensible lowcode website builder</h1>
</p>

## What is Web Crafter?
Web Crafter is a low-code desktop website building platform aimed to help people who don't know website programing to buildup their own website by drag and drop.


## Tech stacks
The main Tech stacks we are using in this project are listed below:
  - craft.js: An opensource framework for building web builder application
  - material UI: Styling library used for both styling the application and widget in the application
  - vite: light-weighted frontend react CLI
  - .net: backend framework
  - MongoDB: database used for saving user's website
  - JWT: token based authentication
  - Axios: HTTP client for making API calls
  - Jest: testing framework designed to ensure correctness of any JavaScript codebase
  - Swagger: Dashbord for managing / testing backend APIs

## basic & advanced feature for this project
project features:
    - [x] Login with Google authentication
    - [x] dashboard for showing user's website
    - [x] Provide basic widgets for user to buildup the website
    - [x] Provide flexible drag-and-drop feature for people to add and modify the widget for their webpage in canvas
    - [x] Styles and properfies of widget can be modified easily from setting panel
    - [x] Modifiable and customizable switch/button/chip for multiple usage.
    - [x] support event for some of the widget (e.g: support onclick event on button)

basic features:
    - Frontend:
      - [x] React using TypeScript
      - [x] Use MaterialUI as the major styling library, tailwindcss for customizing the styling
      - [x] react router for routing
      - [ ] responsive UI for desktop (NOTE: since Web Crafter is designed for user to design their own websites for desktop usage, it is not recommended and not reasonable to make the website responsive for mobile devices, as the screen of the mobile will be too small for user to design their own website)  
    - Backend
      - [x] .net as backend
      - [x] EFCore for handling database queries
      - [x] uses NOSQL as the database
      - [ ] basic CURD for user's website

Advanced features:
    - [x] Redux toolkit for state management
    - [ ] containerize the project using docker
    - [ ] Unit testing components
    - [ ] E2E testing with cypress


## Running Project

1. Setup .net environment, make sure MongoDB is installed on the computer.

2. run the project:
    - cd to `frontend` folder. Run the command below to start frontend
    ```bash
    npm install 
    npm run dev
    ```

    - then cd to `backend` folder, run the command below to start backend
    ```bash
    dotnet build
    dotnet run
    ```

## Tests

Run `npm test` in the project root to execute the unit tests via [Jest](https://jestjs.io).