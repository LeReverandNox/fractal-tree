FROM node:10.5

RUN mkdir /src
RUN chown -R node:node /src
WORKDIR /src

ADD --chown=node:node src/package.json /src

USER node
RUN npm install

ADD --chown=node:node src /src

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
