const userController = require("../controllers/userController");

async function routes(fastify, options){
    fastify.get("/", userController.getUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.post("/", userController.createUSer);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);
}

module.exports = routes;