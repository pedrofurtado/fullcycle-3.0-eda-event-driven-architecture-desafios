FROM node:19.7-alpine3.17

WORKDIR /srv/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

RUN npm run build

CMD ["node", "dist/main.js"]
