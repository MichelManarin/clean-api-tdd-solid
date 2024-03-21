FROM node:12
WORKDIR /usr/src/estudos-api
COPY ./package.json .
RUN npm build
COPY ./usr ./dist 
EXPOSE 5000
CMD npm start
