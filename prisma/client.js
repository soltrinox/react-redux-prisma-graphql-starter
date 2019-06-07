// this file connects to remote prisma DB and give us thet ability to query it using JS
require("dotenv").config({
  path: `../packages/config/${process.env.NODE_ENV}`
});
const { Prisma } = require("prisma-binding");
const config = require("@packages/config");

const db = new Prisma({
  typeDefs: `${__dirname}/generated/prisma.graphql`,
  endpoint: module.parent
    ? config.prisma.endpoint
    : process.env.PRISMA_ENDPOINT,
  secret: module.parent ? config.prisma.secret : process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;
