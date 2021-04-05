# Project Purple Cow

A simple counting application.

Developed to help draw attention to those who are unable to make it to vaccinatation sites. Inspired by ongoing disparities in access to nearby healthcare and the placement of vaccination sites.

### Run with npm

In the root project directory:
```
npm install
npm start
```
The project will be running at localhost:3000

### Run with docker
This app is set to run on port 3000 by default. To change this, navigate to the project's root folder, open .env, and change ```SITE_PORT``` to your desired port.

In the root project directory:

```
docker-compose build
docker-compose up
```

The project will be running at localhost:3000 or localhost:${SITE_PORT}.


### Future Changes

-Add a map interface to better visualize data
-Show possible routes for mobile vaccine clinics 
-Move all inline styling to a separate CSS file.
-Track city populations,
-Ask for browser location or allow user to enter zipcode when making requests
-TESTS

