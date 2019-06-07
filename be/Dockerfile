FROM mhart/alpine-node:11

ENV NODE_ENV=production

WORKDIR /usr/src/backend

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY be ./be
COPY prisma ./prisma
COPY packages/utils ./packages/utils
COPY packages/config ./packages/config

RUN npm i lerna prisma graphql graphql-cli babel-cli -g --loglevel notice
RUN yarn install
RUN yarn pkg:cnf build:prod
RUN lerna bootstrap

CMD [ "yarn", "workspace", "be", "run", "prod" ]