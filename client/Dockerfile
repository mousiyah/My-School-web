FROM node:19-alpine

WORKDIR /app

COPY . .

RUN chown -R node:node .

USER root

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]