# movie-search (Single Page Application)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How does it work

It uses open source [omdbapi](http://www.omdbapi.com/), to fetch movies. Search starts after 3 or more letters, are typed into the search bar. Search is executed after user stops typing for 300 milliseconds. Requests are being cached on client side for 30 seconds (`Cache-Control`) and in [Redis](https://redis.io/).

## Prerequisites

- docker
- docker compose
- nodejs

## Installing dependencies

`yarn install`

## Development

1. Before you can run project in development mode, you need to start redis locally with `docker run --name dev-redis -p 61379:6379 -d redis:alpine redis-server --appendonly yes`.
2. You need to set environment variable `OMDB_APIKEY` to the omdb api key, that you can request it [here](http://www.omdbapi.com/apikey.aspx). Do not forget to activate your api key, by link sent to you in the email. For linux/unix based computer you can set environment variable by executing `export OMDB_APIKEY=<REPLACE_ME>` or you can just provide the environment variable in front of the command such as for example `OMDB_APIKEY=<REPLACE_ME> yarn dev` or `OMDB_APIKEY=<REPLACE_ME> docker-compose up --build`.

In the project directory, you can run:

`yarn dev` or `npm run dev`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Another option to run in development mode is to run with docker compose such as `NODE_ENV=development docker-compose up`

## Testing

Tests are running in the watch mode and will be re-run as soon as changes are saved.

`yarn test` or `npm run test`

## Production

To build for production run:

`docker-compose up`

If you need to rebuild the project run previous command with `--build` flag. If you want to destroy docker containers run `docker-compose down`. If you want to run in detached mode add `-d` flag. If rebuilding the containers for some reason did not work you can force recreate with `--force-recreate` flag.

- First time: `docker-compose up --build`
- Detached mode: `docker-compose up -d --build`
- With force recreate: `docker-compose up -d --build --force-recreate`

Client is running on: [http://localhost:5000](http://localhost:5000)
API server is running on: [http://localhost:4000](http://localhost:4000)

## Miscellaneous

### Improvements, if I had more time?

- First API and frontend need to be separated
- service worker needs to be enabled and offline mode should be treated accordingly
- using lint for backend
- developing library for SCSS for future reuse
- trying to minimize dependencies in frontend bundle.js
- test for better above the fold rendering
- optimize for SEO
- implement SSR on frontend
- add content placeholder before the real content is being loaded from backend, improves user experience
- add internationalization and localization to support different users
- rtl and ltr support
- testing on different devices
- maybe I would use Varnish for request caching, so requests would not go to the backend at all
