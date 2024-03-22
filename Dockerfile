FROM node:12
WORKDIR /usr/src/estudos-api
COPY package*.json ./
RUN npm install
COPY . .
RUN ls -la && echo "Verificando se a pasta 'dist' existe..." && test -d ./dist || echo "A pasta 'dist' não existe."
RUN npm build
RUN ls -la && echo "Verificando se a pasta 'dist' existe..." && test -d ./dist || echo "A pasta 'dist' não existe."
COPY ./dist ./dist
EXPOSE 5000
CMD npm start