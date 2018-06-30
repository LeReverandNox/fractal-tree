FROM node:10.5

RUN mkdir /src
RUN chown -R node:node /src
WORKDIR /src

USER node

ADD src/package.json /src

RUN npm install

ADD src /src
ADD files /

EXPOSE 80

ENTRYPOINT ["npm", "start"]
