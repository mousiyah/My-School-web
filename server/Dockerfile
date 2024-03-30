FROM node:19-alpine

WORKDIR /home/node/app

COPY . .

RUN chown -R node:node .

USER root

RUN npm install

RUN npm install -g sequelize-cli

EXPOSE 9000

CMD [ "node", "index.js" ]