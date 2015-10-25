FROM node:5-onbuild

ENV PORT 80
ENV NODE_ENV production
RUN npm run build

EXPOSE 80
