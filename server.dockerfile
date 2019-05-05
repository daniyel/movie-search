FROM node:11.11-alpine

RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

COPY . .

RUN yarn install && \
    rm -rf src public

EXPOSE 4000

CMD [ "yarn", "start:api" ]
