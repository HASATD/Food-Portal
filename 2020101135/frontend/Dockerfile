FROM node:16.14.0-buster AS build

ENV NODE_ENV = production

WORKDIR /frontend

COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm","start"]

