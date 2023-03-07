import { Router} from 'express'

import { CreateUserController } from'./controllers/user/CreateUserController'
import { AuthUserController } from'./controllers/user/AuthUserController'
import {  DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'

const router= Router();
//-- ROTAS USER --

//Cadastrar novo usuário.
router.post('/users', new CreateUserController().handle)
//Rota de login.
router.post('/session', new AuthUserController().handle)
//Middleware para verificar se o usuário está autenticado através do token JWT.
router.get('/me', isAuthenticated, new DetailUserController().handle)


export { router }