import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);


    // post
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displatGetCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;