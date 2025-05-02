import authRoute from "./authRoute.js";
import newsRoute from "./newsRoute.js";
import showRoute from "./showRoute.js";
import askRoute from "./askRoute.js";
import submitRoute from "./submitRoute.js";
import userRoute from "./userRoute.js"
import { authMiddleware } from "../Middleware/authMiddleware.js";
import express from "express";
import commentRoute from "./commentRoute.js";
import itemRoute from "./itemRoute.js"
import changePasswordRoute from "./changePasswordRoute.js";
const apiRoutes = express.Router();

apiRoutes.use('/news', newsRoute);
apiRoutes.use('/auth', authRoute);
apiRoutes.use('/submit', authMiddleware, submitRoute);
apiRoutes.use('/show', showRoute);
apiRoutes.use('/ask', askRoute);
apiRoutes.use('/comments', commentRoute);
apiRoutes.use('/user', userRoute);
apiRoutes.use('/item', itemRoute);
apiRoutes.use('/change-password', changePasswordRoute);

export default apiRoutes