FROM node:11.11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn install && \
    yarn build && \
    rm -rf api config node_modules && \
    yarn add serve

EXPOSE 5000

CMD [ "yarn", "serve" ]
