FROM mhart/alpine-node:11 AS builder

# ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
# RUN npm config set unsafe-perm true
RUN npm i lerna -g --loglevel notice
RUN npm i webpack-cli -g --loglevel notice
RUN npm i webpack -g --loglevel notice
RUN yarn install

COPY lerna.json .
COPY ui ./ui
COPY version.js ./version.js
COPY packages/config ./packages/config
COPY packages/utils ./packages/utils
COPY packages/redux-storage-encrypt ./packages/redux-storage-encrypt

RUN lerna bootstrap
RUN yarn ui build
RUN yarn pkg:cnf build:prod

# production environment
FROM nginx:1.15-alpine
COPY --from=builder /usr/src/app/ui/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 