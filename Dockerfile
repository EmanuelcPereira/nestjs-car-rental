FROM node:16-alpine

WORKDIR /usr/src/api-seidor

COPY package.json .

RUN yarn install

COPY . .

# inicializando a API
CMD yarn start:docker:dev