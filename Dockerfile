FROM node:12
WORKDIR /usr/src/estudos-api
COPY ./package.json .
RUN npm install -g sucrase-node
RUN npm install --only=prod
EXPOSE 5000
CMD npm start
