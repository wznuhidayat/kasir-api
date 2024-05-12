const express = require('express');

const router = express.Router();
const { getUser, Register, Login, Logout } = require('../controller/UserController.js');
const { Categories, createCategory, deleteCategory } = require('../controller/CategoriesController.js');
const { Products, createProduct, deleteProduct }  = require('../controller/ProductsControllers.js');
const { storeSales }  = require('../controller/SalesController.js');
const { HistoryOrder, detailOrder }  = require('../controller/HistoryOrderController.js');
const { isAuthenticated } = require('../middlewares/Authenticate.js');
const { uploadProduct } = require('../storage/FileStorage.js');
const { loginValidator } = require('../validators/UserValidatior.js');
const { CategoryValidate } = require('../validators/CategoryValidator.js');

// router.get('/users', async (req, res) => {
//     // const user = await prisma.user.create({
//     //   data: { 
//     //     name: 'Alice',
//     //     email: 'alice@prisma.io',
        
//     //   },
//     // })
//     res.send('hello');
//   })
// User
router.get("/user", isAuthenticated,getUser);
router.post("/register", Register);
router.post("/login",loginValidator, Login);
router.delete("/logout", Logout);

//Category  
router.get("/categories",isAuthenticated,Categories);
router.post("/categories",isAuthenticated,CategoryValidate,createCategory);
router.delete("/categories/:id",isAuthenticated,deleteCategory);
//PRODUCTS
router.get("/products",isAuthenticated,Products);
router.post("/products",isAuthenticated,uploadProduct, createProduct);
router.delete("/products/:id",isAuthenticated,deleteProduct);
//POS
router.post("/storeSales",isAuthenticated,storeSales);
//HISTORY ODER
router.get('/historyOrder',isAuthenticated,HistoryOrder);
router.post("/detailOrder",detailOrder);

module.exports = router;