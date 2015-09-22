FROM node:0.12-onbuild

ENV NODE_ENV production

RUN npm install -g npm@latest

EXPOSE 3000
