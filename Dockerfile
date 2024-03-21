FROM node:12
WORKDIR /usr/src/estudos-api
COPY ./package.json .
RUN npm build
COPY ./dist usr
EXPOSE 5000
CMD npm start
