const fastify = require("fastify");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;
require("dotenv/config");

const userRoutes = require("./routes/userRoutes");

fastify.register(userRoutes, { prefix: "/api/v1/users" });

const start = async () => {
  try {
    await fastify.listen(port || 5000);
    fastify.log.info(`server started on port ${fastify.server.address().port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
