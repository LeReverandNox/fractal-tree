FROM node:10.5

RUN mkdir /src
RUN chown -R node:node /src
WORKDIR /src

ADD src/package.json /src

USER node
RUN npm install

ADD src /src

USER root
RUN find /src ! -name node_modules -exec chown -R node:node {} \;

USER node

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
