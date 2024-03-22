FROM node:12
WORKDIR /usr/src/estudos-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build
COPY ./dist ./dist
EXPOSE 5000
CMD npm start