const userController = require("../controllers/userController");
const auth = require("../middlewares/AuthMiddleware");

async function routes(fastify, options){
    fastify.get("/", userController.getUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.post("/", userController.createUser);
    fastify.put("/:id", { preHandler: auth }, userController.updateUser);
    fastify.delete("/:id",{ preHandler: auth }, userController.deleteUser);
    fastify.post("/login", userController.login);
}

module.exports = routes;