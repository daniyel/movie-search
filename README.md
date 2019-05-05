# moviespa

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How does it work

It uses open source omdb api, to fetch movies. Search starts after 3 or more letters, are typed into the search bar. Search is executed after user stops typing for 300 milliseconds. Requests are being cached on client side for 30 seconds (`Cache-Control`) and in Redis.

## Prerequisites

- docker
- docker compose
- nodejs

## Installing dependencies

### `yarn install`

## Development

Before you can run project in development mode, you need to start redis locally with `docker run --name dev-redis -p 61379:6379 -d redis:alpine redis-server --appendonly yes`. Also insert you own omdb api key in the `config/default.json` configuration file.

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

Tests are running in the watch mode and will be re-run as soon as changes are saved.

### `yarn test`

## Production

To build for production run:

### `docker-compose up`

If you need to rebuild the project run previous command with `--build` flag. If you want to destroy docker containers run `docker-compose down`.

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


