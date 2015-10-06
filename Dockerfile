FROM node:4-onbuild

ENV NODE_ENV production
ENV PORT 80

RUN npm install -g npm@latest

EXPOSE 80
