FROM node:latest

RUN npm install -g npm@v3.0-next

COPY . /src

WORKDIR /src
RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
