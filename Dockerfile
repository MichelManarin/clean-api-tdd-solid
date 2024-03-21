FROM node:12
WORKDIR /usr/src/estudos-api
COPY ./package.json .
RUN npm build
EXPOSE 5000
CMD npm start
