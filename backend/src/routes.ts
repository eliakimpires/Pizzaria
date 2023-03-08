import { Router} from 'express'
import multer from 'multer'

//Imports User
import { CreateUserController } from'./controllers/user/CreateUserController'
import { AuthUserController } from'./controllers/user/AuthUserController'
import {  DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
//Import Category
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
//Import Product
import { CreateProductController } from './controllers/product/CreateProductController'

import  uploadConfig  from './config/multer'
const router= Router();

const upload = multer(uploadConfig.upload("./tmp"))
//-- ROTAS USER --

//Cadastrar novo usuário.
router.post('/users', new CreateUserController().handle )
//Rota de login.
router.post('/session', new AuthUserController().handle )

//-- MIDDLEWARES --

//Middleware para verificar se o usuário está autenticado através do token JWT.
router.get('/me', isAuthenticated, new DetailUserController().handle )

//-- ROTAS CATEGORY --
//Rota de criar categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
//Rota de listar todas as categorias
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//-- ROTAS PRODUTOS --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

export { router }