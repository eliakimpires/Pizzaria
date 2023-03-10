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
import { ListByCategoryController } from './controllers/product/ListByCategoryController'
//Import Order
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
//Import Item
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'


import  uploadConfig  from './config/multer'
import { SendOrderController } from './controllers/order/SendOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'


const router= Router();

const upload = multer(uploadConfig.upload("./tmp"))

//-- ROTAS USER ------------------
//Cadastrar novo usuário.
router.post('/users', new CreateUserController().handle )
//Rota de login.
router.post('/session', new AuthUserController().handle )

//-- MIDDLEWARES ------------------
//Middleware para verificar se o usuário está autenticado através do token JWT.
router.get('/me', isAuthenticated, new DetailUserController().handle )

//-- ROTAS CATEGORY --------------
//Rota de criar categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
//Rota de listar todas as categorias
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//-- ROTAS PRODUTOS --------------
//Cadastrar produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
//Listar produto a partir de uma categoria
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle )

//-- ROTAS ORDER -----------------
//Criar order
router.post('/order', isAuthenticated, new CreateOrderController().handle )
//Deletar order
router.delete('/order', isAuthenticated, new RemoveOrderController().handle )
//Adicionar item a order
router.post('/order/add', isAuthenticated, new AddItemController().handle )
//Deletar item de uma order
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle )
//Fazer a order deixar de ser rascunho
router.put('/order/send', isAuthenticated, new SendOrderController().handle )
//Listar todas as orders que não são rascunho
router.get('/orders', isAuthenticated, new ListOrdersController().handle )
//Exibir os detalhes de uma order
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
//Finalizar a order de uma mesa
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle )
export { router }