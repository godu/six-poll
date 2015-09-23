FROM node:4-onbuild

ENV NODE_ENV production

RUN npm install -g npm@3.3.4

EXPOSE 3000
