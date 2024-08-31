FROM node:16.15.0

WORKDIR /usr/app

COPY ./package*.json ./

COPY ./ ./

RUN npm install -g npm@8.19.1
RUN npm cache clean -f
RUN npm install
RUN npm run build

EXPOSE 8002

USER node

ENV NODE_ENV=${NODE_ENV}

CMD [ "npm", "start" ]