FROM node:0.12

RUN npm install -g npm@latest

COPY . /src

WORKDIR /src
RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
