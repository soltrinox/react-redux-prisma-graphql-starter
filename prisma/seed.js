const prisma = require("./client");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const faker = require("faker");

(async () => {
  console.log("Seeding settings...");
  try {
    await prisma.mutation.createSetting({
      data: {
        key: "invitationsOnly",
        value: "true",
        type: "Boolean"
      }
    });
    await prisma.mutation.createSetting({
      data: {
        key: "registrationsEnabled",
        value: "true",
        type: "Boolean"
      }
    });

    console.log("Creating users");
    const password = await bcrypt.hash("12345", 10);

    await prisma.mutation.createUser({
      data: {
        name: "admin",
        username: "admin",
        email: "admin@test.com",
        invitation: "0",
        password,
        status: "ACTIVE",
        permissions: { set: ["ADMIN"] }
      }
    });
    await prisma.mutation.createUser({
      data: {
        name: "user1",
        username: "user1",
        email: "user1@ctfp.io",
        invitation: "1",
        password,
        status: "ACTIVE",
        permissions: { set: ["USER"] }
      }
    });
  } catch (e) {
    console.log(e);
  }
})();
