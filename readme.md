This package is usable with [express](https://expressjs.com/) application to configure and manage endpoints for a configurable gateway. It also autogenerate a [Swagger](https://swagger.io/) documentation.
## Install
```
npm i @adedayomatthews/proxy-manager
```
# Usage
The package uses [Sequelize](https://sequelize.org/) [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping). Create a `sequelize.js` in your root folder of your project and configure the database connection there as:
```
module.export = {
    "username": "root",
    "password": "root",
    "database": "database_name",
    "host": "127.0.0.1",
    "dialect": "mysql"
 }
```
Setup an express application
```
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```
Initialize the proxy manager with the express app
```
const { ProxyManager} = require("@adedayomatthews/proxy-manager");
const proxyManager = new ProxyManager(app)
```
Add the router for managing endpoints
```
app.use('/', proxyManager.getManagementRouter())
```
Include Swagger documentation
```
proxyManager.addDocumentation()
```
Include script in package.json
```
    "proxy-sync": "cd ./node_modules/@adedayomatthews/proxy-manager && npm run sequelize-sync"
```
You can now run `npm run proxy-sync` to sync the sequelize models.
You can also hook into [Pre & Post Scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts) to ensure the proxy is always synced. If you have a start script, you can add a prestart script, for example:
```
    "start": "node app.js",
    "prestart": "npm run proxy-sync",
    "proxy-sync": "cd ./node_modules/@adedayomatthews/proxy-manager && npm run sequelize-sync"
```