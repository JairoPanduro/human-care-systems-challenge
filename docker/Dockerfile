FROM node:10.9

RUN mkdir /app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install nodemon -g

CMD ["npm", "start"]