FROM node:4-onbuild

ENV PORT 80
ENV NODE_ENV production
RUN npm install -g npm@latest
RUN npm run build

EXPOSE 80
