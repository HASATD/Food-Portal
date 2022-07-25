FROM node:16.14.0-buster

ENV NODE_ENV=production

WORKDIR /backend

COPY package.json /backend/package.json
COPY package-lock.json /backend/package-lock.json

RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm","start"]