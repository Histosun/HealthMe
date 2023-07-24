import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import { UserController } from './src/controller/user.controller';
import koaJwt  from  'koa-jwt';
import { secretKey } from './src/utils/AuthUtils';
import { authMiddleware } from './src/middleware/auth.middleware';
import { MedicationController } from './src/controller/medication.controller';

const app = new Koa();
const router = new Router();

// Middleware
app.use(bodyParser());
app.use(cors());

app.use(authMiddleware);

// JWT
app.use(koaJwt({
    secret: secretKey
}).unless({
    path: [/\/user\/login/, /\/user\/signup/]
}))


// Routes
// User Signup
router.post('/user/signup', UserController.signUp);
router.post('/user/login', UserController.login);
router.get('/user/medications', MedicationController.getMedicationByUser);
router.post('/user/removeMedication', MedicationController.removeMedicationByUser);

// User login

// Register routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});