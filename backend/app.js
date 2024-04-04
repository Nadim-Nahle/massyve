const fastify = require("fastify")();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;
require("dotenv/config");

const userRoutes = require("./src/routes/userRoutes");

mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser: true,
useUnifiedTopology: true,  
})
.then(() => console.log("connected to db"))
.catch((e) => console.log("error connecting to db", e))

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
