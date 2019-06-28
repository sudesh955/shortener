### Heroku

https://urlsml.herokuapp.com/

### RUN on local machine

```bash
npm install;
npm run build;
npm run start;
```

Then visit http://localhost:3000

### Technologies

- Used webpack to bundle and compile files.
- `/server` contains code for server side.

##### Server Side

Used express.js for routing the required apis

- POST `/api/link` to create a new link
- DELETE `/api/link/:id` to delete a link
- GET `/api/link/:id/clicks` to get all the data collected from clicks.
- used `sequelize` for accessing database.

##### Client Side

Used React.js for creating UI.

- First View has a form for creating links and list of links created in that browser.
- Second View shows details of on particular link.
- `/web/links.ts` implements all the data related functions.
